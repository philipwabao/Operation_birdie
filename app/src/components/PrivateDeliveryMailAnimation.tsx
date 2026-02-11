export function PrivateDeliveryMailAnimation() {
  const steps = ['Prepare', 'Validate', 'Approve', 'Deliver'] as const;

  return (
    <div className="aux-release-wrap mt-3 rounded-xl border border-white/10 bg-gradient-to-b from-[#0F1117] to-[#0B0C10] p-4 text-white/80 shadow-[0_18px_46px_rgba(2,6,23,0.42)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(620px 220px at 16% 24%, rgba(59,130,246,0.2), transparent 62%), radial-gradient(420px 220px at 86% 78%, rgba(16,185,129,0.12), transparent 60%)',
        }}
      />

      <div className="aux-release-stage">
        <div className="aux-release-flow" aria-hidden="true">
          {steps.map((step, index) => (
            <div key={step} className="aux-release-step-wrap">
              <div className="aux-release-step">
                <span className="aux-release-index">{index + 1}</span>
                <span className="aux-release-label">{step}</span>
              </div>
              {index < steps.length - 1 && <span className="aux-release-link" />}
            </div>
          ))}
        </div>

        <div className="aux-release-console" aria-hidden="true">
          <div className="aux-release-row">
            <span className="aux-release-key">artifact</span>
            <span className="aux-release-value">delivery bundle</span>
          </div>
          <div className="aux-release-row">
            <span className="aux-release-key">integrity</span>
            <span className="aux-release-value aux-release-pass">verified</span>
          </div>
          <div className="aux-release-row">
            <span className="aux-release-key">compliance</span>
            <span className="aux-release-value aux-release-pass">validated</span>
          </div>
          <div className="aux-release-row">
            <span className="aux-release-key">status</span>
            <span className="aux-release-value aux-release-pass">ready for delivery</span>
          </div>
        </div>
      </div>

      <div className="aux-release-caption">
        Delivery package finalized.
      </div>

      <style>{`
        .aux-release-wrap { position: relative; }
        .aux-release-stage {
          position: relative;
          width: 100%;
          min-height: 220px;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(148,163,184,0.12);
          background:
            radial-gradient(90% 100% at 50% 20%, rgba(148,163,184,0.07), transparent 66%),
            linear-gradient(180deg, rgba(15,23,42,0.42), rgba(2,6,23,0.46));
        }
        .aux-release-flow {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 14px;
          min-width: 0;
        }
        .aux-release-step-wrap {
          display: flex;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
          gap: 6px;
        }
        .aux-release-step {
          position: relative;
          display: flex;
          align-items: center;
          gap: 7px;
          width: 100%;
          min-width: 0;
          padding: 6px 8px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.22);
          background:
            linear-gradient(180deg, rgba(30,41,59,0.62), rgba(15,23,42,0.72));
          opacity: 0.82;
          transform: translateY(2px);
          animation: aux-step-on 420ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .aux-release-step-wrap:nth-child(1) .aux-release-step { animation-delay: 120ms; }
        .aux-release-step-wrap:nth-child(2) .aux-release-step { animation-delay: 380ms; }
        .aux-release-step-wrap:nth-child(3) .aux-release-step { animation-delay: 640ms; }
        .aux-release-step-wrap:nth-child(4) .aux-release-step { animation-delay: 900ms; }
        .aux-release-index {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.03em;
          color: rgba(203,213,225,0.88);
          background: rgba(30,41,59,0.78);
          border: 1px solid rgba(148,163,184,0.3);
          flex-shrink: 0;
        }
        .aux-release-label {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(226,232,240,0.86);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }
        .aux-release-link {
          position: relative;
          display: block;
          flex: 0 0 20px;
          height: 1px;
          margin-right: 2px;
          background: rgba(148,163,184,0.2);
          overflow: hidden;
        }
        .aux-release-link::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: scaleX(0);
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(56,189,248,0.78), rgba(34,197,94,0.72));
          animation: aux-link-on 320ms ease-out forwards;
        }
        .aux-release-step-wrap:nth-child(1) .aux-release-link::after { animation-delay: 290ms; }
        .aux-release-step-wrap:nth-child(2) .aux-release-link::after { animation-delay: 550ms; }
        .aux-release-step-wrap:nth-child(3) .aux-release-link::after { animation-delay: 810ms; }
        .aux-release-console {
          border-radius: 10px;
          border: 1px solid rgba(148,163,184,0.16);
          background: rgba(2,6,23,0.46);
          padding: 10px;
          display: grid;
          gap: 7px;
        }
        .aux-release-row {
          display: grid;
          grid-template-columns: 98px 1fr;
          gap: 8px;
          align-items: baseline;
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 10px;
          line-height: 1.4;
        }
        .aux-release-key {
          color: rgba(148,163,184,0.8);
          text-transform: lowercase;
        }
        .aux-release-value {
          color: rgba(191,219,254,0.94);
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
          overflow-wrap: anywhere;
        }
        .aux-release-pass { color: rgba(134,239,172,0.9); }
        .aux-release-caption {
          margin-top: 10px;
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.82);
        }
        @keyframes aux-step-on {
          from { opacity: 0.62; transform: translateY(2px); border-color: rgba(148,163,184,0.2); }
          to {
            opacity: 1;
            transform: translateY(0);
            border-color: rgba(56,189,248,0.34);
            box-shadow: 0 0 0 1px rgba(56,189,248,0.12) inset;
          }
        }
        @keyframes aux-link-on {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aux-release-step,
          .aux-release-link::after {
            animation: none !important;
          }
        }
        @media (max-width: 520px) {
          .aux-release-stage {
            padding: 10px;
            min-height: 0;
          }
          .aux-release-flow {
            display: grid;
            grid-template-columns: 1fr;
            gap: 6px;
            margin-bottom: 10px;
          }
          .aux-release-step-wrap {
            min-height: 22px;
            gap: 0;
          }
          .aux-release-link {
            display: none;
          }
          .aux-release-row {
            grid-template-columns: 78px 1fr;
            font-size: 9px;
          }
        }
        @media (max-width: 400px) {
          .aux-release-stage {
            padding: 8px;
          }
          .aux-release-step {
            padding: 5px 7px;
            gap: 6px;
          }
          .aux-release-index {
            width: 14px;
            height: 14px;
            font-size: 8px;
          }
          .aux-release-label {
            font-size: 9px;
          }
          .aux-release-console {
            padding: 8px;
            gap: 6px;
          }
          .aux-release-row {
            grid-template-columns: 70px 1fr;
            gap: 6px;
            font-size: 8.5px;
          }
          .aux-release-caption {
            font-size: 9px;
            letter-spacing: 0.14em;
          }
        }
        @media (max-width: 980px) and (min-width: 521px) {
          .aux-release-flow {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
          .aux-release-step-wrap { gap: 0; }
          .aux-release-link { display: none; }
        }
      `}</style>
    </div>
  );
}
