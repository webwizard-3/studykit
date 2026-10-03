import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";

const tool = getToolBySlug("word-counter");

function countStats(text) {
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed === "" ? 0 : (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || (trimmed ? 1 : 0);
  const paragraphs = trimmed === "" ? 0 : trimmed.split(/\n\s*\n/).filter((p) => p.trim() !== "").length;
  return { words, characters, charactersNoSpaces, sentences, paragraphs };
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countStats(text), [text]);

  return (
    <ToolLayout
      tool={tool}
      description="Count words, characters, sentences and paragraphs as you type. Free word counter for essays and assignments."
      intro={[
        "Paste or type text to see a live count of words, characters, sentences and paragraphs — useful for hitting an assignment's word count or checking you haven't gone over a limit.",
      ]}
      howTo={[
        "Type or paste your text into the box.",
        "All five counts update as you type — nothing to click.",
      ]}
      faq={[
        { q: "How are words counted?", a: "Words are counted as chunks of text separated by whitespace, which matches how most word processors count words." },
        { q: "How are sentences detected?", a: "Sentences are estimated by counting sentence-ending punctuation (., !, ?). Like any automated method, unusual formatting (abbreviations, ellipses) can occasionally throw the count off by one or two." },
      ]}
      relatedSlugs={["character-counter", "case-converter"]}
    >
      <div className="card">
        <div className="field">
          <label htmlFor="wc-text">Your text</label>
          <textarea id="wc-text" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here…" style={{ minHeight: 220 }} />
        </div>
        <div className="stat-strip">
          <div className="stat-strip__item"><div className="stat-strip__num">{stats.words}</div><div className="stat-strip__label">Words</div></div>
          <div className="stat-strip__item"><div className="stat-strip__num">{stats.characters}</div><div className="stat-strip__label">Characters</div></div>
          <div className="stat-strip__item"><div className="stat-strip__num">{stats.charactersNoSpaces}</div><div className="stat-strip__label">Chars (no spaces)</div></div>
          <div className="stat-strip__item"><div className="stat-strip__num">{stats.sentences}</div><div className="stat-strip__label">Sentences</div></div>
          <div className="stat-strip__item"><div className="stat-strip__num">{stats.paragraphs}</div><div className="stat-strip__label">Paragraphs</div></div>
        </div>
        <div className="btn-row" style={{ marginTop: 18 }}>
          <button type="button" className="btn btn-secondary" onClick={() => setText("")}>Clear</button>
        </div>
      </div>
    </ToolLayout>
  );
}
