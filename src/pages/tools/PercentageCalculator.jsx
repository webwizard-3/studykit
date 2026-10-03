import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber, formatNumber } from "../../utils/number";

const tool = getToolBySlug("percentage-calculator");

export default function PercentageCalculator() {
  const [mode, setMode] = useState("of"); // "of" -> obtained/total, "percentOf" -> X% of Y
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");
  const [percent, setPercent] = useState("");
  const [value, setValue] = useState("");

  const obtainedN = toFiniteNumber(obtained);
  const totalN = toFiniteNumber(total);
  const percentN = toFiniteNumber(percent);
  const valueN = toFiniteNumber(value);

  const errorA = total !== "" && totalN === 0 ? "Total can't be zero." : null;
  const resultA = !errorA && obtainedN !== null && totalN !== null ? (obtainedN / totalN) * 100 : null;

  const resultB = percentN !== null && valueN !== null ? (percentN / 100) * valueN : null;

  function reset() {
    setObtained(""); setTotal(""); setPercent(""); setValue("");
  }

  return (
    <ToolLayout
      tool={tool}
      description="Calculate what percentage one number is of another, or find what a given percentage of a number is. Free, instant, no sign-up."
      intro={[
        "A percentage calculator answers two closely related but different questions: 'what percentage is X of Y?' and 'what is X% of Y?'. Students run into the first constantly when converting marks into a percentage, and the second when working out things like a discount or a portion of a total.",
      ]}
      howTo={[
        "Choose the calculation you need using the two tabs above the form.",
        "For 'obtained out of total', enter the marks or amount you have and the total possible amount.",
        "For 'X% of Y', enter the percentage and the number you want that percentage of.",
        "The result updates as you type — no calculate button needed.",
      ]}
      formula={{
        body: (
          <>
            <p><code>percentage = (obtained ÷ total) × 100</code></p>
            <p style={{ marginTop: 12 }}><code>result = (percent ÷ 100) × value</code></p>
          </>
        ),
      }}
      example={{
        body: (
          <p>
            If you scored 42 out of 50 on a test: <code>(42 ÷ 50) × 100 = 84%</code>.
            If you instead wanted 15% of 200: <code>(15 ÷ 100) × 200 = 30</code>.
          </p>
        ),
      }}
      faq={[
        { q: "Can the total be zero?", a: "No — dividing by zero isn't a valid percentage, so the calculator will flag it instead of showing a broken result." },
        { q: "Does it handle decimals?", a: "Yes, both fields accept decimal numbers, such as 42.5 out of 50." },
        { q: "Can a percentage be over 100%?", a: "Yes — if the obtained value is larger than the total (for example, bonus marks), the result will correctly show over 100%." },
      ]}
      relatedSlugs={["grade-calculator", "marks-calculator", "required-marks-calculator"]}
    >
      <div className="card">
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={mode === "of"} className={mode === "of" ? "is-active" : ""} onClick={() => setMode("of")}>
            Obtained out of total
          </button>
          <button role="tab" aria-selected={mode === "percentOf"} className={mode === "percentOf" ? "is-active" : ""} onClick={() => setMode("percentOf")}>
            X% of Y
          </button>
        </div>

        {mode === "of" ? (
          <>
            <div className="grid-2">
              <div className="field">
                <label htmlFor="obtained">Obtained</label>
                <input id="obtained" className="input" type="number" inputMode="decimal" value={obtained} onChange={(e) => setObtained(e.target.value)} placeholder="e.g. 42" />
              </div>
              <div className="field">
                <label htmlFor="total">Total</label>
                <input id="total" className="input" type="number" inputMode="decimal" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g. 50" aria-invalid={!!errorA} />
                {errorA && <span className="error-text">{errorA}</span>}
              </div>
            </div>
            {resultA !== null && (
              <div className="result">
                <div className="result-label">Percentage</div>
                <div className="result-value">{formatNumber(resultA)}%</div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid-2">
              <div className="field">
                <label htmlFor="percent">Percentage</label>
                <input id="percent" className="input" type="number" inputMode="decimal" value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="e.g. 15" />
              </div>
              <div className="field">
                <label htmlFor="value">Of value</label>
                <input id="value" className="input" type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 200" />
              </div>
            </div>
            {resultB !== null && (
              <div className="result">
                <div className="result-label">Result</div>
                <div className="result-value">{formatNumber(resultB)}</div>
              </div>
            )}
          </>
        )}

        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={reset}>Clear</button>
        </div>
      </div>
    </ToolLayout>
  );
}
