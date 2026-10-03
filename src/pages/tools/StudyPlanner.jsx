import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { uid } from "../../utils/number";
import "./StudyPlanner.css";

const tool = getToolBySlug("study-planner");

const PRIORITIES = { high: "High", medium: "Medium", low: "Low" };
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function StudyPlanner() {
  const [items, setItems] = useLocalStorage("studykit:study-plan", []);
  const [subject, setSubject] = useState("");
  const [task, setTask] = useState("");
  const [date, setDate] = useState(todayISO());
  const [priority, setPriority] = useState("medium");
  const [sortBy, setSortBy] = useState("date");

  function addItem(e) {
    e.preventDefault();
    if (!task.trim()) return;
    setItems((list) => [...list, { id: uid("plan"), subject: subject.trim(), task: task.trim(), date, priority, done: false }]);
    setTask("");
  }
  function toggle(id) {
    setItems((list) => list.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  }
  function remove(id) {
    setItems((list) => list.filter((i) => i.id !== id));
  }

  const sorted = useMemo(() => {
    const copy = [...items];
    if (sortBy === "date") copy.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    else copy.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    return copy;
  }, [items, sortBy]);

  const badgeClass = { high: "badge-red", medium: "badge-amber", low: "badge" };

  return (
    <ToolLayout
      tool={tool}
      description="Plan subjects and tasks by date and priority. A simple study planner that saves automatically in your browser."
      intro={[
        "A lightweight planner for spreading study tasks across subjects, dates and priority levels — useful for exam revision or just keeping a running list of what's due when.",
      ]}
      howTo={[
        "Add a subject (optional), the task itself, a planned date, and a priority.",
        "Mark items complete as you finish them, or delete ones you no longer need.",
        "Sort the list by date or by priority using the control above the list.",
      ]}
      faq={[
        { q: "Can I plan without a subject?", a: "Yes, the subject field is optional — useful for general tasks that aren't tied to one course." },
        { q: "Does this sync between my devices?", a: "No — it's saved in this browser's local storage only, on this device." },
      ]}
      relatedSlugs={["exam-countdown", "to-do-list", "notes"]}
    >
      <div className="card">
        <form onSubmit={addItem}>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="plan-subject">Subject (optional)</label>
              <input id="plan-subject" className="input" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Biology" />
            </div>
            <div className="field">
              <label htmlFor="plan-task">Task</label>
              <input id="plan-task" className="input" value={task} onChange={(e) => setTask(e.target.value)} placeholder="e.g. Review chapter 4" required />
            </div>
            <div className="field">
              <label htmlFor="plan-date">Planned date</label>
              <input id="plan-date" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="plan-priority">Priority</label>
              <select id="plan-priority" className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {Object.entries(PRIORITIES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="btn-row">
            <button type="submit" className="btn btn-primary">Add to plan</button>
          </div>
        </form>

        <div className="btn-row" style={{ margin: "20px 0 6px", alignItems: "center" }}>
          <label htmlFor="sort-by" style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>Sort by</label>
          <select id="sort-by" className="select" style={{ width: 160 }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {sorted.length === 0 ? (
          <p className="empty-state">Nothing planned yet — add your first task above.</p>
        ) : (
          sorted.map((item) => (
            <div className="row-item plan-item" key={item.id}>
              <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} aria-label={`Mark "${item.task}" ${item.done ? "not done" : "done"}`} style={{ marginTop: 3 }} />
              <div className="plan-item__main">
                <div className={`plan-item__title ${item.done ? "is-done" : ""}`}>{item.task}</div>
                <div className="plan-item__meta">
                  {item.subject && <span>{item.subject}</span>}
                  {item.date && <span>{new Date(item.date + "T00:00:00").toLocaleDateString()}</span>}
                  <span className={`badge ${badgeClass[item.priority]}`}>{PRIORITIES[item.priority]}</span>
                </div>
              </div>
              <button type="button" className="icon-btn" onClick={() => remove(item.id)} aria-label={`Delete "${item.task}"`}>×</button>
            </div>
          ))
        )}
      </div>
    </ToolLayout>
  );
}
