import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { uid } from "../../utils/number";
import "./ToDoList.css";

const tool = getToolBySlug("to-do-list");

export default function ToDoList() {
  const [tasks, setTasks] = useLocalStorage("studykit:todos", []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks((list) => [...list, { id: uid("task"), text: text.trim(), done: false }]);
    setText("");
  }

  function toggle(id) {
    setTasks((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function remove(id) {
    setTasks((list) => list.filter((t) => t.id !== id));
  }
  function startEdit(task) {
    setEditingId(task.id);
    setEditingText(task.text);
  }
  function saveEdit(id) {
    setTasks((list) => list.map((t) => (t.id === id ? { ...t, text: editingText.trim() || t.text } : t)));
    setEditingId(null);
  }

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "completed") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  const activeCount = tasks.filter((t) => !t.done).length;

  return (
    <ToolLayout
      tool={tool}
      description="A simple to-do list with add, edit, delete and active/completed filters. Saves automatically in your browser."
      intro={[
        "A plain task list: add what you need to do, check items off, and filter to see what's left. Everything saves automatically to your browser, so your list is still here next time you visit.",
      ]}
      howTo={[
        "Type a task and press Add, or hit Enter.",
        "Click the checkbox to mark a task done.",
        "Click a task's text to edit it, or use the × to delete it.",
        "Use the filter tabs to show all, active, or completed tasks.",
      ]}
      faq={[
        { q: "Is my list private?", a: "Yes — it's stored only in your browser's local storage on this device, and never sent anywhere." },
        { q: "Will my list sync to my phone?", a: "No, local storage doesn't sync across devices or browsers. Each browser keeps its own list." },
      ]}
      relatedSlugs={["study-planner", "notes", "pomodoro-timer"]}
    >
      <div className="card">
        <form onSubmit={addTask} className="btn-row" style={{ marginBottom: 20 }}>
          <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task…" aria-label="New task" style={{ flex: 1 }} />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>

        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={filter === "all"} className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>All ({tasks.length})</button>
          <button role="tab" aria-selected={filter === "active"} className={filter === "active" ? "is-active" : ""} onClick={() => setFilter("active")}>Active ({activeCount})</button>
          <button role="tab" aria-selected={filter === "completed"} className={filter === "completed" ? "is-active" : ""} onClick={() => setFilter("completed")}>Completed ({tasks.length - activeCount})</button>
        </div>

        {filtered.length === 0 ? (
          <p className="empty-state">{tasks.length === 0 ? "No tasks yet — add one above." : "Nothing here for this filter."}</p>
        ) : (
          filtered.map((task) => (
            <div className="row-item todo-item" key={task.id}>
              <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} aria-label={`Mark "${task.text}" ${task.done ? "active" : "done"}`} />
              {editingId === task.id ? (
                <input
                  className="input todo-item__text"
                  value={editingText}
                  autoFocus
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => saveEdit(task.id)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                />
              ) : (
                <button
                  type="button"
                  className={`todo-item__text ${task.done ? "is-done" : ""}`}
                  style={{ background: "none", border: "none", textAlign: "left", cursor: "text", padding: 0, color: "var(--ink)" }}
                  onClick={() => startEdit(task)}
                >
                  {task.text}
                </button>
              )}
              <button type="button" className="icon-btn" onClick={() => remove(task.id)} aria-label={`Delete "${task.text}"`}>×</button>
            </div>
          ))
        )}
      </div>
    </ToolLayout>
  );
}
