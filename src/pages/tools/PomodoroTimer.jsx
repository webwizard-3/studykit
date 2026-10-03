import { useCallback, useEffect, useRef, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { useLocalStorage } from "../../utils/useLocalStorage";
import "./PomodoroTimer.css";

const tool = getToolBySlug("pomodoro-timer");

const PHASES = { focus: "Focus", short: "Short break", long: "Long break" };

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch {
    // Audio not available — silently skip the chime.
  }
}

export default function PomodoroTimer() {
  const [settings, setSettings] = useLocalStorage("studykit:pomodoro-settings", {
    focus: 25, short: 5, long: 15, cyclesUntilLong: 4, soundOn: false,
  });

  const [phase, setPhase] = useState("focus");
  const [cycleCount, setCycleCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(settings.focus * 60);
  const [running, setRunning] = useState(false);
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const durationFor = useCallback((p) => (p === "focus" ? settings.focus : p === "short" ? settings.short : settings.long) * 60, [settings]);

  useEffect(() => {
    if (!running) setSecondsLeft(durationFor(phase));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.focus, settings.short, settings.long]);

  useEffect(() => {
    if (!running) return;
    endTimeRef.current = Date.now() + secondsLeft * 1000;
    intervalRef.current = setInterval(() => {
      const remainingMs = endTimeRef.current - Date.now();
      const remaining = Math.max(0, Math.round(remainingMs / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setRunning(false);
        if (settings.soundOn) playChime();
        advancePhase();
      }
    }, 250);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function advancePhase() {
    if (phase === "focus") {
      const nextCount = cycleCount + 1;
      setCycleCount(nextCount);
      const goLong = nextCount % settings.cyclesUntilLong === 0;
      const nextPhase = goLong ? "long" : "short";
      setPhase(nextPhase);
      setSecondsLeft(durationFor(nextPhase));
    } else {
      setPhase("focus");
      setSecondsLeft(durationFor("focus"));
    }
  }

  function start() { setRunning(true); }
  function pause() { setRunning(false); clearInterval(intervalRef.current); }
  function reset() {
    setRunning(false);
    clearInterval(intervalRef.current);
    setPhase("focus");
    setSecondsLeft(durationFor("focus"));
  }
  function skip() {
    setRunning(false);
    clearInterval(intervalRef.current);
    advancePhase();
  }

  function updateSetting(field, value) {
    setSettings((s) => ({ ...s, [field]: value }));
  }

  return (
    <ToolLayout
      tool={tool}
      description="A Pomodoro timer with 25-minute focus sessions, short breaks and a long break every four cycles. Free, customizable, works offline."
      intro={[
        "The Pomodoro Technique alternates focused work with short breaks: work for a set stretch, rest briefly, and take a longer break after a few cycles. This timer defaults to the classic 25/5/15 split, but every duration is adjustable in the settings below.",
      ]}
      howTo={[
        "Press Start to begin a focus session.",
        "The timer switches automatically to a short break when a focus session ends, and to a long break after the number of cycles you set.",
        "Use Pause to stop the clock, or Reset to return to the start of the current phase.",
        "Turn on sound if you want a short chime when a phase ends — it stays off until you turn it on, and only ever plays after you've interacted with the page.",
      ]}
      faq={[
        { q: "Does the timer keep running if I switch tabs?", a: "Yes — it's based on the actual clock time rather than counting down while the tab is focused, so it stays accurate even if the tab is in the background." },
        { q: "Will sound play automatically?", a: "No. Sound is off by default and only plays once you've turned it on and started a session yourself." },
      ]}
      relatedSlugs={["study-timer", "exam-countdown", "to-do-list"]}
    >
      <div className="card pomodoro">
        <div className="pomodoro__phase">{PHASES[phase]}</div>
        <div className="pomodoro__time">{formatTime(secondsLeft)}</div>
        <div className="pomodoro__cycle">Completed focus sessions: {cycleCount}</div>
        <div className="pomodoro__controls">
          {!running ? (
            <button type="button" className="btn btn-primary" onClick={start}>Start</button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={pause}>Pause</button>
          )}
          <button type="button" className="btn btn-secondary" onClick={reset}>Reset</button>
          <button type="button" className="btn btn-secondary" onClick={skip}>Skip phase</button>
        </div>

        <div style={{ textAlign: "left" }}>
          <div className="checkbox-row" style={{ marginBottom: 14 }}>
            <input type="checkbox" id="pomodoro-sound" checked={settings.soundOn} onChange={(e) => updateSetting("soundOn", e.target.checked)} />
            <label htmlFor="pomodoro-sound">Play a sound when a phase ends</label>
          </div>
          <div className="pomodoro__settings">
            <div className="field">
              <label htmlFor="focus-mins">Focus (minutes)</label>
              <input id="focus-mins" className="input" type="number" min="1" value={settings.focus} onChange={(e) => updateSetting("focus", Math.max(1, Number(e.target.value) || 1))} />
            </div>
            <div className="field">
              <label htmlFor="short-mins">Short break (minutes)</label>
              <input id="short-mins" className="input" type="number" min="1" value={settings.short} onChange={(e) => updateSetting("short", Math.max(1, Number(e.target.value) || 1))} />
            </div>
            <div className="field">
              <label htmlFor="long-mins">Long break (minutes)</label>
              <input id="long-mins" className="input" type="number" min="1" value={settings.long} onChange={(e) => updateSetting("long", Math.max(1, Number(e.target.value) || 1))} />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
