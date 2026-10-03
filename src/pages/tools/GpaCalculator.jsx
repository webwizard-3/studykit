import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber, formatNumber, uid } from "../../utils/number";

const tool = getToolBySlug("gpa-calculator");

const GRADE_POINTS = [
  { grade: "A+", points: 4.0 },
  { grade: "A", points: 4.0 },
  { grade: "A-", points: 3.7 },
  { grade: "B+", points: 3.3 },
  { grade: "B", points: 3.0 },
  { grade: "B-", points: 2.7 },
  { grade: "C+", points: 2.3 },
  { grade: "C", points: 2.0 },
  { grade: "C-", points: 1.7 },
  { grade: "D", points: 1.0 },
  { grade: "F", points: 0.0 },
];

function newSubject() {
  return { id: uid("subj"), name: "", credits: "3", grade: "A" };
}

export default function GpaCalculator() {
  const [subjects, setSubjects] = useState([newSubject(), newSubject(), newSubject()]);

  function update(id, field, value) {
    setSubjects((rows) => rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }
  function addSubject() {
    setSubjects((rows) => [...rows, newSubject()]);
  }
  function removeSubject(id) {
    setSubjects((rows) => rows.filter((r) => r.id !== id));
  }
  function reset() {
    setSubjects([newSubject(), newSubject(), newSubject()]);
  }

  const { gpa, totalCredits, valid } = useMemo(() => {
    let weighted = 0;
    let credits = 0;
    let anyValid = false;
    for (const row of subjects) {
      const c = toFiniteNumber(row.credits);
      const gradeInfo = GRADE_POINTS.find((g) => g.grade === row.grade);
      if (c !== null && c > 0 && gradeInfo) {
        weighted += c * gradeInfo.points;
        credits += c;
        anyValid = true;
      }
    }
    return {
      gpa: credits > 0 ? weighted / credits : null,
      totalCredits: credits,
      valid: anyValid,
    };
  }, [subjects]);

  return (
    <ToolLayout
      tool={tool}
      description="Calculate your GPA from subjects, credit hours and letter grades. Add or remove subjects freely — free GPA calculator, no sign-up."
      intro={[
        "GPA (Grade Point Average) is a credit-weighted average of your grades. Courses worth more credit hours count more toward the final number, which is why a 4-credit course affects your GPA more than a 1-credit one.",
        "The grade-to-points scale below is the common 4.0 scale used by many US institutions. If your school uses a different scale, treat this as an estimate and check your registrar's official conversion.",
      ]}
      howTo={[
        "Enter each subject's name (optional, for your own reference), credit hours, and letter grade.",
        "Add rows with 'Add subject' for as many courses as you're taking.",
        "Remove a row with the trash icon if you added one by mistake.",
        "Your GPA updates automatically as you fill in valid rows.",
      ]}
      formula={{
        body: (
          <p>
            <code>GPA = Σ(credit hours × grade points) ÷ Σ(credit hours)</code>
          </p>
        ),
      }}
      example={{
        body: (
          <p>
            Two courses: a 4-credit A (4.0 points) and a 2-credit B (3.0 points).{" "}
            <code>((4 × 4.0) + (2 × 3.0)) ÷ (4 + 2) = 22 ÷ 6 ≈ 3.67</code>.
          </p>
        ),
      }}
      faq={[
        { q: "Which grading scale does this use?", a: "A standard 4.0 scale with plus/minus increments. Check your own institution's scale if it differs — some schools don't use plus/minus, or weight an A+ above 4.0." },
        { q: "What happens if I leave credit hours blank?", a: "That row is simply skipped in the calculation until you fill it in, so it won't throw off your GPA." },
        { q: "Can credit hours be decimals?", a: "Yes — some schools use half-credit courses, and the calculator accepts decimal values." },
      ]}
      relatedSlugs={["grade-calculator", "marks-calculator", "percentage-calculator"]}
    >
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Subject</th>
                <th>Credit hours</th>
                <th>Grade</th>
                <th aria-label="Remove" />
              </tr>
            </thead>
            <tbody>
              {subjects.map((row, i) => (
                <tr key={row.id}>
                  <td>
                    <input className="input" placeholder={`Subject ${i + 1}`} value={row.name} onChange={(e) => update(row.id, "name", e.target.value)} />
                  </td>
                  <td>
                    <input className="input" type="number" min="0" step="0.5" inputMode="decimal" value={row.credits} onChange={(e) => update(row.id, "credits", e.target.value)} />
                  </td>
                  <td>
                    <select className="select" value={row.grade} onChange={(e) => update(row.id, "grade", e.target.value)}>
                      {GRADE_POINTS.map((g) => (
                        <option key={g.grade} value={g.grade}>{g.grade}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" className="icon-btn" onClick={() => removeSubject(row.id)} aria-label={`Remove subject ${i + 1}`}>
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={addSubject}>Add subject</button>
          <button type="button" className="btn btn-secondary" onClick={reset}>Clear all</button>
        </div>

        {valid && (
          <div className="result">
            <div className="result-label">Your GPA</div>
            <div className="result-value">{formatNumber(gpa, 2)}</div>
            <div className="result-sub">Across {formatNumber(totalCredits, 1)} credit hours</div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
