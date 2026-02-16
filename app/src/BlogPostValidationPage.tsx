import { ArrowLeft } from 'lucide-react';

const sections = [
  { id: 'provenance', label: '1) Provenance' },
  { id: 'review', label: '2) Review' },
  { id: 'fit-check', label: '3) Fit Check' },
  { id: 'consistency', label: '4) Consistency' },
  { id: 'outcome', label: 'Outcome' },
] as const;

export function BlogPostValidationPage() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-auxerta-text">
      <header className="border-b border-auxerta-text/10 bg-[#f6f4ef]/95">
        <div className="mx-auto max-w-6xl px-4 md:px-[8vw] py-3 flex items-center justify-between">
          <a href="../../" className="font-display font-semibold text-lg tracking-tight text-auxerta-text">
            Auxerta
          </a>
          <a
            href="../../"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-auxerta-text/70 hover:text-auxerta-text transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-10 md:py-14">
        <article className="relative rounded-md border border-[#e7e1d5] bg-white px-6 sm:px-12 py-8 sm:py-11 shadow-[0_12px_34px_rgba(15,23,42,0.10)]">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-auxerta-text/18 to-transparent" />
          <div className="mx-auto max-w-[66ch]">

            <p className="text-sm text-auxerta-muted">January 2026 · 5 min read</p>

            <h1 className="mt-3 text-3xl sm:text-4xl font-display font-semibold tracking-tight text-auxerta-text leading-tight">
              How We Validate Domain Data Before Model Training
            </h1>

            <p className="mt-6 text-xl sm:text-2xl font-display font-medium text-auxerta-text/90 leading-relaxed">
              Training doesn&apos;t fix bad data. It amplifies it.
            </p>

            <p className="mt-5 text-base text-auxerta-muted leading-7">
              Before we start any pretraining, fine-tuning, or evaluation run, we validate each dataset batch for four
              things: provenance, review quality, domain fit, and consistency. The point is simple: reduce avoidable
              deployment errors and keep model behavior stable across release cycles.
            </p>
            <p className="mt-3 text-base text-auxerta-muted leading-7">
              This is the validation pass we run before a batch is allowed into a training corpus.
            </p>

            <div className="mt-7 border-y border-[#ece7de] py-4">
              <div className="micro-text text-auxerta-muted">Contents</div>
              <nav className="mt-3">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm text-auxerta-text/70 hover:text-auxerta-text transition-colors"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <section id="provenance" className="mt-10">
              <h2 className="text-2xl font-display font-semibold text-auxerta-text">1) Provenance</h2>
              <p className="mt-3 text-base text-auxerta-muted leading-7">
                If we can&apos;t trace a batch, we don&apos;t train on it.
              </p>
              <p className="mt-4 micro-text text-auxerta-muted">We Verify</p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>Source origin: where the raw data came from and who provided it.</li>
                <li>Collection method: how it was captured (scrape, export, partner feed, internal logging, etc.).</li>
                <li>Revision trail: what changed, when it changed, and why.</li>
                <li>Access and permissions: who can touch it and under what constraints.</li>
                <li>Duplication risk: whether it overlaps with prior batches or known public sets.</li>
              </ul>
              <p className="mt-4 text-base text-auxerta-muted leading-7">
                <span className="font-medium text-auxerta-text">Why it matters:</span> when something goes wrong (a
                sudden behavior shift, a bad refusal, a subtle bias), provenance lets us isolate the cause quickly
                instead of guessing.
              </p>
            </section>

            <section id="review" className="mt-10 pt-8 border-t border-[#ece7de]">
              <h2 className="text-2xl font-display font-semibold text-auxerta-text">2) Review</h2>
              <p className="mt-3 text-base text-auxerta-muted leading-7">
                &quot;Labeled&quot; doesn&apos;t mean &quot;usable.&quot;
              </p>
              <p className="mt-3 text-base text-auxerta-muted leading-7">
                We validate annotation quality with targeted checks designed for the domain:
              </p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>Spot review on stratified slices (easy / hard / ambiguous cases).</li>
                <li>Disagreement resolution where labelers diverge.</li>
                <li>Instruction adherence checks (did annotators follow the rubric?).</li>
                <li>Rater calibration when a new reviewer or guideline is introduced.</li>
                <li>Edge-case audits for the failures that hurt most in production.</li>
              </ul>
              <p className="mt-4 text-base text-auxerta-muted leading-7">
                We also look for patterns that don&apos;t show up in averages:
              </p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>Reviewers who are consistently out of distribution.</li>
                <li>Label leakage (answers embedded in inputs).</li>
                <li>&quot;Overhelpful&quot; rewriting that changes the task.</li>
                <li>Shortcuts that inflate apparent quality.</li>
              </ul>
              <p className="mt-4 text-base text-auxerta-muted leading-7">
                Only after these checks does a batch move forward.
              </p>
            </section>

            <section id="fit-check" className="mt-10 pt-8 border-t border-[#ece7de]">
              <h2 className="text-2xl font-display font-semibold text-auxerta-text">3) Fit Check</h2>
              <p className="mt-3 text-base text-auxerta-muted leading-7">
                Good labels can still be the wrong data.
              </p>
              <p className="mt-3 text-base text-auxerta-muted leading-7">
                Fit check is where we confirm the batch actually matches:
              </p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>The task scope (what the model is intended to learn).</li>
                <li>The domain objectives (what &quot;good&quot; looks like in deployment).</li>
                <li>Known failure patterns (what we&apos;re trying to reduce).</li>
                <li>The expected input distribution (what users will actually submit).</li>
              </ul>
              <p className="mt-4 text-base text-auxerta-muted leading-7">
                Practically, that means we run fast sanity tests like:
              </p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>Sample-level fit scoring (domain relevance).</li>
                <li>Policy/rubric alignment checks.</li>
                <li>Failure replay prompts (does this batch address errors from the last cycle?).</li>
                <li>Coverage checks across subdomains to avoid overfitting to one slice.</li>
              </ul>
              <p className="mt-4 text-base text-auxerta-muted leading-7">
                If a batch is high quality but off-scope, we don&apos;t force it into training. We either re-scope it or
                hold it for a more appropriate objective.
              </p>
            </section>

            <section id="consistency" className="mt-10 pt-8 border-t border-[#ece7de]">
              <h2 className="text-2xl font-display font-semibold text-auxerta-text">4) Consistency</h2>
              <p className="mt-3 text-base text-auxerta-muted leading-7">
                Even small inconsistencies create drift.
              </p>
              <p className="mt-4 micro-text text-auxerta-muted">We Validate</p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>Label schema (names, allowed values, hierarchy).</li>
                <li>Formatting (structure, fields, JSON validity if applicable).</li>
                <li>Metadata (version, release ID, reviewer IDs, timestamps).</li>
                <li>Cross-batch compatibility (new labels don&apos;t silently break old assumptions).</li>
                <li>Train/eval boundaries (prevent leakage across splits).</li>
              </ul>
              <p className="mt-4 text-base text-auxerta-muted leading-7">
                This step prevents &quot;quiet&quot; problems that show up later as instability:
              </p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>The same label meaning different things across versions.</li>
                <li>Formatting changes that break parsers or training scripts.</li>
                <li>A new guideline introduced mid-batch without clear demarcation.</li>
              </ul>
            </section>

            <section id="outcome" className="mt-10 rounded-xl border border-auxerta-accent/20 bg-auxerta-accent/8 p-4 sm:p-5">
              <h2 className="text-2xl font-display font-semibold text-auxerta-text">Outcome</h2>
              <p className="mt-3 text-base text-auxerta-muted leading-7">
                The output of validation is not just pass/fail. It&apos;s a batch that is:
              </p>
              <ul className="mt-2 list-disc marker:text-auxerta-accent/80 pl-5 space-y-2 text-base text-auxerta-muted leading-7">
                <li>Traceable.</li>
                <li>Reviewed to domain standards.</li>
                <li>Aligned to the task it&apos;s meant to improve.</li>
                <li>Consistent across releases.</li>
              </ul>
              <p className="mt-4 text-base text-auxerta-muted leading-7">
                The result is cleaner training signals and fewer domain-fit issues during deployment, which means less
                time debugging model behavior after release and more predictable improvements from cycle to cycle.
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
