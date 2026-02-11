import { useEffect, useRef, useState } from 'react';

type TrainRow = {
  id: number;
  step: number;
  vertical: string;
  loss: number;
  lr: number;
};

const VERTICALS = [
  'risk',
  'fraud',
  'trading',
  'defense',
  'robots',
  'drones',
  'education',
  'travel',
  'agriculture',
] as const;
const START_STEP = 1200;
const FINAL_STEP = START_STEP + VERTICALS.length - 1;

function formatRow(row: TrainRow) {
  return `step = ${row.vertical} | total_loss = ${row.loss.toFixed(4)} | lr = ${row.lr.toExponential(2)}`;
}

function computeLoss(seconds: number, step: number) {
  const base = 0.26 * Math.exp(-seconds / 28);
  const oscillation = 0.012 * Math.sin(seconds * 1.3 + step * 0.02);
  return Math.max(0.045, base + 0.08 + oscillation);
}

function computeLr(seconds: number) {
  return Math.max(1.0e-5, 3.0e-4 * Math.exp(-seconds / 140));
}

export function VerticalsNodeGraph() {
  const [rows, setRows] = useState<TrainRow[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const stepRef = useRef(START_STEP);
  const idRef = useRef(1);

  useEffect(() => {
    const start = performance.now();
    stepRef.current = START_STEP;
    idRef.current = 1;

    const nextRow = (): TrainRow | null => {
      const now = performance.now();
      const seconds = (now - start) / 1000;
      const step = stepRef.current;
      if (step > FINAL_STEP) return null;
      const verticalIndex = step - START_STEP;
      const vertical = VERTICALS[verticalIndex];
      const row: TrainRow = {
        id: idRef.current++,
        step,
        vertical,
        loss: computeLoss(seconds, step),
        lr: computeLr(seconds),
      };
      stepRef.current += 1;
      return row;
    };

    const timer = window.setInterval(() => {
      const row = nextRow();
      if (!row) {
        setIsComplete(true);
        window.clearInterval(timer);
        return;
      }
      setRows((prev) => [...prev, row]);
    }, 900);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="sv-term-wrap rounded-xl border border-white/10 bg-gradient-to-b from-[#0F1117] to-[#0B0C10] p-3 text-white/80 shadow-[0_18px_46px_rgba(2,6,23,0.42)]">
      <div className="sv-term-head">
        <span className="sv-term-title">training.log</span>
      </div>

      <div className="sv-term-body" role="log" aria-live="polite" aria-label="Training output">
        {rows.map((row) => (
          <div key={row.id} className="sv-term-line">
            <span className="sv-term-step">[{row.step}]</span>
            <span className="sv-term-text">{formatRow(row)}</span>
          </div>
        ))}
        {isComplete ? (
          <div className="sv-term-done">training complete</div>
        ) : (
          <div className="sv-term-cursor-row">
            <span className="sv-term-cursor" />
          </div>
        )}
      </div>

      <style>{`
        .sv-term-wrap {
          position: relative;
          overflow: hidden;
        }
        .sv-term-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 2px 2px 8px;
          border-bottom: 1px solid rgba(148,163,184,0.18);
        }
        .sv-term-title {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.9);
        }
        .sv-term-body {
          margin-top: 8px;
          min-height: 212px;
          max-height: 212px;
          overflow: hidden;
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 11px;
          line-height: 1.55;
        }
        .sv-term-line {
          display: grid;
          grid-template-columns: 58px 1fr;
          align-items: start;
          gap: 10px;
          color: rgba(226,232,240,0.86);
          white-space: nowrap;
        }
        .sv-term-step {
          color: rgba(148,163,184,0.75);
        }
        .sv-term-text {
          color: rgba(186,230,253,0.92);
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sv-term-cursor-row {
          margin-top: 4px;
          height: 14px;
        }
        .sv-term-done {
          margin-top: 4px;
          font-size: 11px;
          color: rgba(134, 239, 172, 0.82);
          text-transform: lowercase;
        }
        .sv-term-cursor {
          display: inline-block;
          width: 8px;
          height: 12px;
          border-radius: 2px;
          background: rgba(56,189,248,0.9);
          animation: sv-cursor 1s steps(2, end) infinite;
        }
        @keyframes sv-cursor {
          0%, 70% { opacity: 1; }
          100% { opacity: 0; }
        }
        @media (max-width: 640px) {
          .sv-term-body {
            min-height: 196px;
            max-height: 196px;
            font-size: 10px;
          }
          .sv-term-line {
            grid-template-columns: 52px 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
