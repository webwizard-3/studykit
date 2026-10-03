import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { uid } from "../../utils/number";
import "./Notes.css";

const tool = getToolBySlug("notes");

function newNote() {
  return { id: uid("note"), title: "Untitled note", body: "", updatedAt: Date.now() };
}

export default function Notes() {
  const [notes, setNotes] = useLocalStorage("studykit:notes", []);
  const [selectedId, setActiveId] = useState(null);

  // Derive the active note during render rather than syncing it via an
  // effect: fall back to the most recently updated note whenever nothing
  // is explicitly selected (e.g. on first load, or after a delete).
  const activeId = selectedId && notes.some((n) => n.id === selectedId)
    ? selectedId
    : notes[0]?.id ?? null;

  const active = notes.find((n) => n.id === activeId) || null;

  function addNote() {
    const note = newNote();
    setNotes((list) => [note, ...list]);
    setActiveId(note.id);
  }
  function updateActive(field, value) {
    setNotes((list) => list.map((n) => (n.id === activeId ? { ...n, [field]: value, updatedAt: Date.now() } : n)));
  }
  function deleteActive() {
    setNotes((list) => list.filter((n) => n.id !== activeId));
    setActiveId(null);
  }

  return (
    <ToolLayout
      tool={tool}
      description="Quick notes that save automatically in your browser. Create, edit and delete notes — no sign-up, no sync required."
      intro={[
        "A scratchpad for quick notes — lecture reminders, things to look up later, half-formed ideas. Everything saves automatically as you type, right in your browser.",
      ]}
      howTo={[
        "Click 'New note' to start one.",
        "Give it a title and type in the body — it saves as you go, no save button needed.",
        "Switch between notes using the list on the left, and delete one with the delete button when you're done with it.",
      ]}
      faq={[
        { q: "Do notes sync across devices?", a: "No — notes are stored in this browser's local storage on this device only." },
        { q: "Is there a note size limit?", a: "Browsers typically allow several megabytes of local storage in total, which is far more than plain text notes need in normal use." },
      ]}
      relatedSlugs={["to-do-list", "study-planner", "word-counter"]}
    >
      <div className="card">
        <div className="btn-row" style={{ marginBottom: 16 }}>
          <button type="button" className="btn btn-primary" onClick={addNote}>New note</button>
          {active && <button type="button" className="btn btn-danger" onClick={deleteActive}>Delete this note</button>}
        </div>

        {notes.length === 0 ? (
          <p className="empty-state">No notes yet — click "New note" to write your first one.</p>
        ) : (
          <div className="notes-layout">
            <div className="notes-list">
              {notes
                .slice()
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    className={`notes-list__item ${n.id === activeId ? "is-active" : ""}`}
                    onClick={() => setActiveId(n.id)}
                  >
                    <span className="notes-list__title">{n.title || "Untitled note"}</span>
                    <span className="notes-list__preview">{n.body.slice(0, 40) || "Empty"}</span>
                  </button>
                ))}
            </div>

            {active && (
              <div className="notes-editor">
                <input
                  className="notes-editor__title"
                  value={active.title}
                  onChange={(e) => updateActive("title", e.target.value)}
                  placeholder="Note title"
                  aria-label="Note title"
                />
                <textarea
                  className="input"
                  value={active.body}
                  onChange={(e) => updateActive("body", e.target.value)}
                  placeholder="Start typing…"
                  aria-label="Note content"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
