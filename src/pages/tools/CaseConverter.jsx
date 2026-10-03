import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";

const tool = getToolBySlug("case-converter");

function toTitleCase(str) {
  const smallWords = new Set(["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "from", "by", "of", "in"]);
  return str
    .toLowerCase()
    .split(" ")
    .map((word, i) => {
      if (word === "") return word;
      if (i !== 0 && smallWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function toSentenceCase(str) {
  const lower = str.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (m) => m.toUpperCase());
}

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyResult(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — nothing to do; the text is still selectable.
    }
  }

  const results = [
    { label: "UPPERCASE", value: text.toUpperCase() },
    { label: "lowercase", value: text.toLowerCase() },
    { label: "Title Case", value: toTitleCase(text) },
    { label: "Sentence case", value: toSentenceCase(text) },
  ];

  return (
    <ToolLayout
      tool={tool}
      description="Convert text between UPPERCASE, lowercase, Title Case and Sentence case, with one-click copy. Free case converter."
      intro={[
        "Paste text once and get it back in four common cases at the same time, each with its own copy button — handy for headings, titles, and cleaning up text that was typed with caps lock stuck on.",
      ]}
      howTo={[
        "Type or paste your text into the input box.",
        "All four case versions update below it.",
        "Click 'Copy' next to the version you want.",
      ]}
      faq={[
        { q: "How does Title Case handle small words?", a: "Common short words like 'a', 'the', and 'of' stay lowercase unless they're the first word, matching typical title-casing conventions." },
        { q: "Does copy work on all browsers?", a: "It uses your browser's clipboard API, supported in all modern browsers. If it's unavailable, you can still select and copy the text manually." },
      ]}
      relatedSlugs={["word-counter", "character-counter"]}
    >
      <div className="card">
        <div className="field">
          <label htmlFor="cv-text">Your text</label>
          <textarea id="cv-text" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here…" style={{ minHeight: 120 }} />
        </div>

        {results.map((r) => (
          <div className="field" key={r.label}>
            <label>{r.label}</label>
            <div className="btn-row" style={{ alignItems: "stretch" }}>
              <textarea className="input" readOnly value={r.value} style={{ minHeight: 70, flex: 1 }} />
              <button type="button" className="btn btn-secondary" onClick={() => copyResult(r.value)} disabled={!r.value}>Copy</button>
            </div>
          </div>
        ))}
        {copied && <p style={{ color: "var(--olive)", fontSize: "0.85rem" }}>Copied to clipboard.</p>}

        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={() => setText("")}>Clear</button>
        </div>
      </div>
    </ToolLayout>
  );
}
