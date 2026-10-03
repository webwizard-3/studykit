import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber, formatNumber } from "../../utils/number";

const tool = getToolBySlug("required-marks-calculator");

export default function RequiredMarksCalculator() {
  const [currentObtained, setCurrentObtained] = useState("");
  const [currentTotal, setCurrentTotal] = useState("");
  const [remainingTotal, setRemainingTotal] = useState("");
  const [targetPercent, setTargetPercent] = useState("");

  const values = useMemo(() => {
    const co = toFiniteNumber(currentObtained);
    const ct = toFiniteNumber(currentTotal);
    const rt = toFiniteNumber(remainingTotal);
    const tp = toFiniteNumber(targetPercent);

    if (co === null || ct === null || rt === null || tp === null) return null;
    if (ct < 0 || rt < 0) return { error: "Totals can't be negative." };
    const grandTotal = ct + rt;
    if (grandTotal <= 0) return { error: "Total marks (current + remaining) must be greater than zero." };

    const neededTotal = (tp / 100) * grandTotal;
    const neededOnRemaining = neededTotal - co;

    return {
      grandTotal,
      neededOnRemaining,
      possible: rt > 0,
      overMax: rt > 0 ? neededOnRemaining > rt : neededOnRemaining > 0,
      belowZero: neededOnRemaining < 0,
    };
  }, [currentObtained, currentTotal, remainingTotal, targetPercent]);

  function reset() {
    setCurrentObtained(""); setCurrentTotal(""); setRemainingTotal(""); setTargetPercent("");
  }

  return (
    <ToolLayout
      tool={tool}
      description="Find out what score you need on remaining assessments to hit a target overall percentage. Free required-marks calculator."
      intro={[
        "If you already have some marks locked in and know what's left, this tool works backwards from your target percentage to tell you exactly what you need to score on what remains.",
      ]}
      howTo={[
        "Enter the marks you already have, and the total those marks were out of.",
        "Enter the total marks still available in remaining assessments (for example, a final exam worth 40 marks).",
        "Enter the overall percentage you're aiming for.",
        "The tool shows the score you need on the remaining marks to hit that target.",
      ]}
      formula={{
        body: (
          <>
            <p><code>needed total = (target % ÷ 100) × (current total + remaining total)</code></p>
            <p style={{ marginTop: 12 }}><code>needed on remaining = needed total − current obtained</code></p>
          </>
        ),
      }}
      example={{
        body: (
          <p>
            You have 60/100 so far, and a 50-mark final remains. Target: 75% overall.{" "}
            <code>needed total = 0.75 × 150 = 112.5</code>, so{" "}
            <code>112.5 − 60 = 52.5</code> needed on the 50-mark final — which
            means the target isn't reachable here, since it exceeds the marks
            available.
          </p>
        ),
      }}
      faq={[
        { q: "What if the required score is more than the remaining total?", a: "The calculator will tell you the target isn't reachable with the marks left — that's useful information on its own." },
        { q: "What if the required score is negative?", a: "That means you've already secured your target percentage regardless of what you score on what's left." },
      ]}
      relatedSlugs={["percentage-calculator", "marks-calculator", "grade-calculator"]}
    >
      <div className="card">
        <div className="grid-2">
          <div className="field">
            <label htmlFor="cur-obtained">Current marks obtained</label>
            <input id="cur-obtained" className="input" type="number" inputMode="decimal" value={currentObtained} onChange={(e) => setCurrentObtained(e.target.value)} placeholder="e.g. 60" />
          </div>
          <div className="field">
            <label htmlFor="cur-total">Current total (out of)</label>
            <input id="cur-total" className="input" type="number" inputMode="decimal" value={currentTotal} onChange={(e) => setCurrentTotal(e.target.value)} placeholder="e.g. 100" />
          </div>
          <div className="field">
            <label htmlFor="rem-total">Remaining total marks</label>
            <input id="rem-total" className="input" type="number" inputMode="decimal" value={remainingTotal} onChange={(e) => setRemainingTotal(e.target.value)} placeholder="e.g. 50" />
          </div>
          <div className="field">
            <label htmlFor="target">Target overall %</label>
            <input id="target" className="input" type="number" inputMode="decimal" value={targetPercent} onChange={(e) => setTargetPercent(e.target.value)} placeholder="e.g. 75" />
          </div>
        </div>

        {values?.error && <p className="error-text">{values.error}</p>}

        {values && !values.error && (
          <div className="result">
            <div className="result-label">You need on the remaining marks</div>
            <div className="result-value">
              {formatNumber(values.neededOnRemaining)} <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>/ {formatNumber(toFiniteNumber(remainingTotal))}</span>
            </div>
            {values.belowZero && <div className="result-sub">You've already secured this target regardless of the remaining marks.</div>}
            {values.overMax && !values.belowZero && <div className="result-sub">This target isn't reachable — it exceeds the marks still available.</div>}
          </div>
        )}

        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={reset}>Clear</button>
        </div>
      </div>
    </ToolLayout>
  );
}
