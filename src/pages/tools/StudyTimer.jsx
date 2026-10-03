import { useEffect, useRef, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import "./PomodoroTimer.css";

const tool = getToolBySlug("study-timer");

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

export default function StudyTimer() {
  const [minutes, setMinutes] = useState(45);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    endTimeRef.current = Date.now() + secondsLeft * 1000;
    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setRunning(false);
        setFinished(true);
      }
    }, 250);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function start() {
    setFinished(false);
    setRunning(true);
  }
  function pause() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }
  function reset() {
    setRunning(false);
    setFinished(false);
    clearInterval(intervalRef.current);
    setSecondsLeft(Math.max(1, Number(minutes) || 1) * 60);
  }

  function handleMinutesChange(value) {
    const n = Math.max(1, Number(value) || 1);
    setMinutes(n);
    if (!running) setSecondsLeft(n * 60);
  }

  return (
    <ToolLayout
      tool={tool}
      description="A simple countdown timer for any custom study session length. Start, pause and reset — free, no sign-up."
      intro={[
        "Sometimes you just want a plain countdown for a set block of time — no phases, no breaks, just a timer. Set how long you want to study for, and start it.",
      ]}
      howTo={[
        "Set the session length in minutes.",
        "Press Start. Pause any time you need to, and resume — the remaining time is preserved.",
        "Reset returns the timer to the full length you set.",
      ]}
      faq={[
        { q: "What's the difference from the Pomodoro Timer?", a: "This timer is a single, uninterrupted countdown for any length you choose. The Pomodoro Timer automatically cycles between focus sessions and breaks." },
      ]}
      relatedSlugs={["pomodoro-timer", "exam-countdown"]}
    >
      <div className="card pomodoro">
        <div className="pomodoro__time">{formatTime(secondsLeft)}</div>
        {finished && <p style={{ color: "var(--olive)", fontWeight: 600 }}>Session complete.</p>}

        <div className="pomodoro__controls">
          {!running ? (
            <button type="button" className="btn btn-primary" onClick={start}>Start</button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={pause}>Pause</button>
          )}
          <button type="button" className="btn btn-secondary" onClick={reset}>Reset</button>
        </div>

        <div className="field" style={{ maxWidth: 220, margin: "0 auto", textAlign: "left" }}>
          <label htmlFor="study-mins">Session length (minutes)</label>
          <input id="study-mins" className="input" type="number" min="1" value={minutes} disabled={running} onChange={(e) => handleMinutesChange(e.target.value)} />
        </div>
      </div>
    </ToolLayout>
  );
}
