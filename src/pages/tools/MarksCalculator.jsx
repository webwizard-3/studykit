import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber, formatNumber, uid } from "../../utils/number";

const tool = getToolBySlug("marks-calculator");

function newRow(n) {
  return { id: uid("row"), name: `Subject ${n}`, obtained: "", total: "" };
}

export default function MarksCalculator() {
  const [rows, setRows] = useState([newRow(1), newRow(2), newRow(3)]);

  function update(id, field, value) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }
  function addRow() {
    setRows((r) => [...r, newRow(r.length + 1)]);
  }
  function removeRow(id) {
    setRows((r) => r.filter((row) => row.id !== id));
  }
  function reset() {
    setRows([newRow(1), newRow(2), newRow(3)]);
  }

  const { totalObtained, totalPossible, percentage, hasValid } = useMemo(() => {
    let obtained = 0, possible = 0, any = false;
    for (const row of rows) {
      const o = toFiniteNumber(row.obtained);
      const t = toFiniteNumber(row.total);
      if (o !== null && t !== null && t > 0) {
        obtained += o; possible += t; any = true;
      }
    }
    return {
      totalObtained: obtained,
      totalPossible: possible,
      percentage: possible > 0 ? (obtained / possible) * 100 : null,
      hasValid: any,
    };
  }, [rows]);

  return (
    <ToolLayout
      tool={tool}
      description="Add up obtained and total marks across multiple subjects to get your combined total and overall percentage."
      intro={[
        "When marks are split across several subjects or papers, adding them up by hand is error-prone. This tool totals your obtained and total marks across as many rows as you need, and works out the combined percentage in one step.",
      ]}
      howTo={[
        "Rename each row to match your subjects if you like — it's just a label.",
        "Enter obtained and total marks for each subject.",
        "Add more rows for more subjects, or remove ones you don't need.",
        "Totals and the overall percentage update automatically.",
      ]}
      formula={{
        body: <p><code>overall % = (Σ obtained ÷ Σ total) × 100</code></p>,
      }}
      example={{
        body: <p>Maths 42/50, Science 38/50, English 45/50 → obtained 125, total 150 → <code>(125 ÷ 150) × 100 ≈ 83.3%</code>.</p>,
      }}
      faq={[
        { q: "Do subjects need equal totals?", a: "No — each subject can be out of a different total; the calculator sums the raw obtained and total marks across every row." },
        { q: "What if I leave a row blank?", a: "Blank rows are ignored in the total, so you can add extra rows for later without them affecting your current result." },
      ]}
      relatedSlugs={["percentage-calculator", "grade-calculator", "required-marks-calculator"]}
    >
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th style={{ width: "40%" }}>Subject</th><th>Obtained</th><th>Total</th><th aria-label="Remove" /></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td><input className="input" value={row.name} onChange={(e) => update(row.id, "name", e.target.value)} /></td>
                  <td><input className="input" type="number" inputMode="decimal" value={row.obtained} onChange={(e) => update(row.id, "obtained", e.target.value)} /></td>
                  <td><input className="input" type="number" inputMode="decimal" value={row.total} onChange={(e) => update(row.id, "total", e.target.value)} /></td>
                  <td><button type="button" className="icon-btn" onClick={() => removeRow(row.id)} aria-label={`Remove ${row.name}`}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={addRow}>Add subject</button>
          <button type="button" className="btn btn-secondary" onClick={reset}>Clear all</button>
        </div>

        {hasValid && (
          <div className="result">
            <div className="result-grid">
              <div><div className="result-label">Total obtained</div><div className="result-value">{formatNumber(totalObtained)}</div></div>
              <div><div className="result-label">Total marks</div><div className="result-value">{formatNumber(totalPossible)}</div></div>
              <div><div className="result-label">Percentage</div><div className="result-value">{formatNumber(percentage)}%</div></div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
