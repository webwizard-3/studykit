import { useEffect, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { uid } from "../../utils/number";
import "./ExamCountdown.css";

const tool = getToolBySlug("exam-countdown");

function breakdown(msRemaining) {
  const clamped = Math.max(0, msRemaining);
  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isPast: msRemaining <= 0 };
}

export default function ExamCountdown() {
  const [exams, setExams] = useLocalStorage("studykit:exam-countdowns", []);
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  function addExam(e) {
    e.preventDefault();
    if (!name.trim() || !dateTime) return;
    setExams((list) => [...list, { id: uid("exam"), name: name.trim(), dateTime }]);
    setName(""); setDateTime("");
  }

  function removeExam(id) {
    setExams((list) => list.filter((x) => x.id !== id));
  }

  const sorted = [...exams].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  return (
    <ToolLayout
      tool={tool}
      description="Set a live countdown to your exam, saved automatically in your browser. Free exam countdown timer for students."
      intro={[
        "Add an exam name and its date and time, and this tool keeps a live, ticking countdown right on this page. Every countdown you add is saved in your browser, so it's still here the next time you visit — no account needed.",
      ]}
      howTo={[
        "Enter the exam's name and its date and time.",
        "Click 'Add countdown' — it appears in the list below, soonest first.",
        "Remove a countdown once the exam has passed, or leave it — it'll simply show 'Started'.",
      ]}
      faq={[
        { q: "Where is this data stored?", a: "In your browser's local storage, on this device only. It isn't sent anywhere, and clearing your browser data will remove it." },
        { q: "What happens after the exam time passes?", a: "The countdown will show that the exam has started rather than counting into negative numbers." },
      ]}
      relatedSlugs={["days-between-dates", "study-planner", "pomodoro-timer"]}
    >
      <div className="card">
        <form onSubmit={addExam}>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="exam-name">Exam name</label>
              <input id="exam-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Chemistry final" required />
            </div>
            <div className="field">
              <label htmlFor="exam-datetime">Date &amp; time</label>
              <input id="exam-datetime" className="input" type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
            </div>
          </div>
          <div className="btn-row">
            <button type="submit" className="btn btn-primary">Add countdown</button>
          </div>
        </form>

        {sorted.length === 0 ? (
          <p className="empty-state">No countdowns yet — add your first exam above.</p>
        ) : (
          <div style={{ marginTop: 24 }}>
            {sorted.map((exam) => {
              const target = new Date(exam.dateTime).getTime();
              const b = breakdown(target - now);
              return (
                <div className="exam-item" key={exam.id}>
                  <div className="exam-item__head">
                    <span className="exam-item__name">{exam.name}</span>
                    <button type="button" className="icon-btn" onClick={() => removeExam(exam.id)} aria-label={`Remove ${exam.name}`}>×</button>
                  </div>
                  <div className="exam-item__date">{new Date(exam.dateTime).toLocaleString()}</div>
                  {b.isPast ? (
                    <p style={{ marginTop: 10, marginBottom: 0 }}><span className="badge badge-amber">Started</span></p>
                  ) : (
                    <div className="countdown-strip">
                      <div className="countdown-unit"><div className="countdown-unit__num">{b.days}</div><div className="countdown-unit__label">days</div></div>
                      <div className="countdown-unit"><div className="countdown-unit__num">{b.hours}</div><div className="countdown-unit__label">hours</div></div>
                      <div className="countdown-unit"><div className="countdown-unit__num">{b.minutes}</div><div className="countdown-unit__label">minutes</div></div>
                      <div className="countdown-unit"><div className="countdown-unit__num">{b.seconds}</div><div className="countdown-unit__label">seconds</div></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
