import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";

const tool = getToolBySlug("age-calculator");

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function diffYMD(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(todayISO());

  const result = useMemo(() => {
    if (!dob) return null;
    const from = new Date(dob + "T00:00:00");
    const to = new Date((asOf || todayISO()) + "T00:00:00");
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return { error: "Please enter valid dates." };
    if (from > to) return { error: "Date of birth must be before the 'as of' date." };

    const { years, months, days } = diffYMD(from, to);
    const totalDays = Math.round((to - from) / 86400000);
    return { years, months, days, totalDays };
  }, [dob, asOf]);

  function reset() {
    setDob(""); setAsOf(todayISO());
  }

  return (
    <ToolLayout
      tool={tool}
      description="Calculate an exact age in years, months and days from a date of birth. Free age calculator, works entirely in your browser."
      intro={[
        "This calculator works out the exact age between a date of birth and any other date (today, by default), broken down into full years, remaining months, and remaining days — the same way you'd count it on a calendar, not just as a rounded number of years.",
      ]}
      howTo={[
        "Enter the date of birth.",
        "Leave the 'as of' date as today, or change it to calculate age on a specific date (useful for eligibility cut-offs).",
        "The exact age appears immediately, along with the total number of days lived.",
      ]}
      example={{
        body: <p>Born 14 March 2005, calculated as of 20 September 2026: 21 years, 6 months, 6 days.</p>,
      }}
      faq={[
        { q: "Does it account for leap years?", a: "Yes — the calculation uses real calendar dates, so leap years are handled automatically." },
        { q: "Can I calculate age as of a past or future date?", a: "Yes, change the 'as of' field to any date — it doesn't have to be today." },
      ]}
      relatedSlugs={["days-between-dates", "exam-countdown"]}
    >
      <div className="card">
        <div className="grid-2">
          <div className="field">
            <label htmlFor="dob">Date of birth</label>
            <input id="dob" className="input" type="date" value={dob} max={asOf || undefined} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="asof">Calculate age as of</label>
            <input id="asof" className="input" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
          </div>
        </div>

        {result?.error && <p className="error-text">{result.error}</p>}

        {result && !result.error && (
          <div className="result">
            <div className="result-grid">
              <div><div className="result-label">Years</div><div className="result-value">{result.years}</div></div>
              <div><div className="result-label">Months</div><div className="result-value">{result.months}</div></div>
              <div><div className="result-label">Days</div><div className="result-value">{result.days}</div></div>
            </div>
            <div className="result-sub">{result.totalDays.toLocaleString()} days in total</div>
          </div>
        )}

        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={reset}>Clear</button>
        </div>
      </div>
    </ToolLayout>
  );
}
