import { timingSafeEqual } from 'node:crypto';

const MAX_BODY_BYTES = 2048;
const ACCESS_KEY = process.env.PREVIEW_ACCESS_KEY ?? '';
const DEFAULT_BRIEFING = [
  'Signal: NEOGNATHAE v0.3',
  'Window: 144K, Latency: <200ms',
  'Channel: Closed, Status: Live',
];

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
  res.end(JSON.stringify(payload));
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
