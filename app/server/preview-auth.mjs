import { timingSafeEqual } from 'node:crypto';

const MAX_BODY_BYTES = 2048;
const ACCESS_KEY = process.env.PREVIEW_ACCESS_KEY ?? '';
const RATE_WINDOW_MS = Number(process.env.PREVIEW_RATE_WINDOW_MS ?? 60_000);
const RATE_MAX_REQUESTS = Number(process.env.PREVIEW_RATE_MAX_REQUESTS ?? 30);
const DEFAULT_BRIEFING = [
  'Signal: NEOGNATHAE v0.3',
  'Window: 144K, Latency: <200ms',
  'Channel: Closed, Status: Live',
];
const rateLimiter = new Map();

export function isPreviewRoute(req) {
  return req.url?.startsWith('/api/preview/') ?? false;
}

function isValidKey(rawKey = '') {
  if (!ACCESS_KEY) return false;
  const submitted = String(rawKey);
  if (!submitted) return false;
  const submittedBuf = Buffer.from(submitted);
  const accessBuf = Buffer.from(ACCESS_KEY);
  if (submittedBuf.length !== accessBuf.length) return false;
  return timingSafeEqual(submittedBuf, accessBuf);
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let data = '';
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('BODY_TOO_LARGE'));
        req.destroy();
        return;
      }
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return req.socket?.remoteAddress ?? 'unknown';
}

function isRateLimited(req) {
  const now = Date.now();
  const ip = getClientIp(req);
  const pruneExpired = () => {
    if (rateLimiter.size <= 2048) return;
    for (const [key, entry] of rateLimiter) {
      if (now >= entry.resetAt) rateLimiter.delete(key);
    }
  };
  const existing = rateLimiter.get(ip);
  if (!existing || now >= existing.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    pruneExpired();
    return false;
  }

  existing.count += 1;
  if (existing.count > RATE_MAX_REQUESTS) {
    pruneExpired();
    return true;
  }

  pruneExpired();
  return false;
}

function getBriefingLines() {
  if (!process.env.PREVIEW_BRIEFING) return DEFAULT_BRIEFING;
  return process.env.PREVIEW_BRIEFING
    .split('|')
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function handlePreviewValidate(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false });
  }
  if (isRateLimited(req)) {
    return sendJson(res, 429, { ok: false });
  }

  if (!ACCESS_KEY) {
    return sendJson(res, 503, { ok: false });
  }

  try {
    const body = await readJsonBody(req);
    const ok = isValidKey(body?.key);
    return sendJson(res, 200, { ok, briefing: ok ? getBriefingLines() : undefined });
  } catch (error) {
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') {
      return sendJson(res, 413, { ok: false });
    }
    return sendJson(res, 400, { ok: false });
  }
}

export function getAgentTrace({ ok }) {
  if (ok) {
    return [
      { text: 'parrot.agent.boot();', level: 'INFO' },
      { text: 'parrot.decode("briefing.enc");', level: 'INFO' },
      { text: 'decode: success', level: 'INFO' },
      { text: 'handoff.queue.push("owl");', level: 'INFO' },
    ];
  }
  return [
    { text: 'parrot.agent.boot();', level: 'INFO' },
    { text: 'parrot.decode("briefing.enc");', level: 'INFO' },
    { text: 'status: awaiting_key', level: 'WARN' },
    { text: 'decode failed: access_key missing', level: 'ERROR' },
  ];
}

export async function handlePreviewTrace(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false, trace: [] });
  }
  if (isRateLimited(req)) {
    return sendJson(res, 429, { ok: false, trace: [] });
  }

  if (!ACCESS_KEY) {
    return sendJson(res, 503, { ok: false, trace: [] });
  }

  try {
    const body = await readJsonBody(req);
    const ok = isValidKey(body?.key);
    return sendJson(res, 200, { ok, trace: getAgentTrace({ ok }) });
  } catch (error) {
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') {
      return sendJson(res, 413, { ok: false, trace: [] });
    }
    return sendJson(res, 400, { ok: false, trace: [] });
  }
}
