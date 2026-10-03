import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber, formatNumber } from "../../utils/number";
import { GRADE_SCALE, gradeForPercentage } from "../../data/gradeScale";

const tool = getToolBySlug("grade-calculator");

export default function GradeCalculator() {
  const [marks, setMarks] = useState("");
  const [total, setTotal] = useState("");

  const marksN = toFiniteNumber(marks);
  const totalN = toFiniteNumber(total);
  const error = total !== "" && totalN === 0 ? "Total marks can't be zero." : null;
  const percentage = !error && marksN !== null && totalN !== null ? (marksN / totalN) * 100 : null;
  const gradeInfo = percentage !== null ? gradeForPercentage(percentage) : null;

  function reset() {
    setMarks(""); setTotal("");
  }

  return (
    <ToolLayout
      tool={tool}
      description="Turn marks into a percentage and a letter grade, using a clearly stated grading scale. Free grade calculator for students."
      intro={[
        "This calculator converts a raw mark into a percentage, then looks up the corresponding letter grade against a fixed scale shown below the tool. Grading scales differ from school to school, so treat the letter grade as a reference point and confirm against your own institution's scale for anything official.",
      ]}
      howTo={[
        "Enter the marks you obtained.",
        "Enter the total marks the assessment was out of.",
        "Your percentage and letter grade appear immediately below.",
      ]}
      formula={{
        title: "Grading scale used",
        body: (
          <div className="table-wrap" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr><th>Percentage</th><th>Grade</th><th>Description</th></tr>
              </thead>
              <tbody>
                {GRADE_SCALE.map((row) => (
                  <tr key={row.grade}>
                    <td>{row.min}% and above</td>
                    <td>{row.grade}</td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      }}
      example={{
        body: <p>52 marks out of 60: <code>(52 ÷ 60) × 100 ≈ 86.7%</code>, which falls in the B+ range on the scale above.</p>,
      }}
      faq={[
        { q: "Can I change the grading scale?", a: "This page uses a fixed reference scale so results are consistent for everyone. If your school uses a different scale, use the percentage result and compare it against your own school's chart." },
        { q: "What if marks are greater than total?", a: "The calculator will still compute a percentage above 100%, which the scale will show as the top grade." },
      ]}
      relatedSlugs={["percentage-calculator", "marks-calculator", "gpa-calculator"]}
    >
      <div className="card">
        <div className="grid-2">
          <div className="field">
            <label htmlFor="marks">Marks obtained</label>
            <input id="marks" className="input" type="number" inputMode="decimal" value={marks} onChange={(e) => setMarks(e.target.value)} placeholder="e.g. 52" />
          </div>
          <div className="field">
            <label htmlFor="total-marks">Total marks</label>
            <input id="total-marks" className="input" type="number" inputMode="decimal" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g. 60" aria-invalid={!!error} />
            {error && <span className="error-text">{error}</span>}
          </div>
        </div>

        {gradeInfo && percentage !== null && (
          <div className="result">
            <div className="result-grid">
              <div>
                <div className="result-label">Percentage</div>
                <div className="result-value">{formatNumber(percentage)}%</div>
              </div>
              <div>
                <div className="result-label">Grade</div>
                <div className="result-value">{gradeInfo.grade}</div>
                <div className="result-sub">{gradeInfo.description}</div>
              </div>
            </div>
          </div>
        )}

        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={reset}>Clear</button>
        </div>
      </div>
    </ToolLayout>
  );
}
