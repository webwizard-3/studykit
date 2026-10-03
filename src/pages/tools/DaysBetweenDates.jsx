import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";

const tool = getToolBySlug("days-between-dates");

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function DaysBetweenDates() {
  const [start, setStart] = useState(todayISO());
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const a = new Date(start + "T00:00:00");
    const b = new Date(end + "T00:00:00");
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return { error: "Please enter valid dates." };

    const diffMs = b - a;
    const totalDays = Math.round(diffMs / 86400000);
    const abs = Math.abs(totalDays);
    return {
      totalDays,
      weeks: Math.floor(abs / 7),
      remDays: abs % 7,
      months: Math.abs(
        (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
      ),
    };
  }, [start, end]);

  function reset() {
    setStart(todayISO()); setEnd("");
  }

  return (
    <ToolLayout
      tool={tool}
      description="Calculate the number of days, weeks and months between any two dates. Free days-between-dates calculator."
      intro={[
        "This tool counts the calendar days between two dates — useful for deadlines, planning revision time, or just working out how long is left until something.",
      ]}
      howTo={[
        "Enter the start date and the end date.",
        "The number of days between them appears immediately, along with an approximate weeks/months breakdown.",
        "If the end date is before the start date, the result is shown as a negative number of days.",
      ]}
      example={{
        body: <p>From 1 January to 31 January (same year): 30 days apart, or about 4 weeks and 2 days.</p>,
      }}
      faq={[
        { q: "Does it count the start or end day?", a: "It counts full days between the two calendar dates — from midnight to midnight — not the number of individual days that appear in a range." },
        { q: "Can the end date be before the start date?", a: "Yes, the result will simply be negative, showing how many days earlier the end date falls." },
      ]}
      relatedSlugs={["age-calculator", "exam-countdown"]}
    >
      <div className="card">
        <div className="grid-2">
          <div className="field">
            <label htmlFor="start-date">Start date</label>
            <input id="start-date" className="input" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="end-date">End date</label>
            <input id="end-date" className="input" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>

        {result?.error && <p className="error-text">{result.error}</p>}

        {result && !result.error && (
          <div className="result">
            <div className="result-label">Days between</div>
            <div className="result-value">{result.totalDays.toLocaleString()}</div>
            <div className="result-sub">
              ≈ {result.weeks} week{result.weeks === 1 ? "" : "s"} and {result.remDays} day{result.remDays === 1 ? "" : "s"} · ≈ {result.months} month{result.months === 1 ? "" : "s"}
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
