import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";

const tool = getToolBySlug("character-counter");

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [limit, setLimit] = useState("");

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const limitN = Number(limit);
  const overLimit = limit !== "" && Number.isFinite(limitN) && limitN > 0 && characters > limitN;

  return (
    <ToolLayout
      tool={tool}
      description="A live character counter, with and without spaces, and an optional limit warning. Free, no sign-up."
      intro={[
        "A focused character counter for places with a strict limit — a bio, a tweet, a form field. Set an optional limit and it'll flag you the moment you go over.",
      ]}
      howTo={[
        "Type or paste your text.",
        "Optionally set a character limit to see how much room you have left.",
      ]}
      faq={[
        { q: "Do spaces count as characters?", a: "The counter shows both totals — with spaces and without — so you can use whichever a given platform counts." },
      ]}
      relatedSlugs={["word-counter", "case-converter"]}
    >
      <div className="card">
        <div className="field">
          <label htmlFor="cc-text">Your text</label>
          <textarea id="cc-text" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here…" style={{ minHeight: 180 }} />
        </div>
        <div className="field" style={{ maxWidth: 220 }}>
          <label htmlFor="cc-limit">Character limit (optional)</label>
          <input id="cc-limit" className="input" type="number" min="0" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="e.g. 280" />
        </div>

        <div className="stat-strip">
          <div className="stat-strip__item"><div className="stat-strip__num">{characters}</div><div className="stat-strip__label">Characters</div></div>
          <div className="stat-strip__item"><div className="stat-strip__num">{charactersNoSpaces}</div><div className="stat-strip__label">Without spaces</div></div>
          {limit !== "" && Number.isFinite(limitN) && limitN > 0 && (
            <div className="stat-strip__item">
              <div className="stat-strip__num" style={{ color: overLimit ? "var(--red)" : "var(--olive)" }}>{limitN - characters}</div>
              <div className="stat-strip__label">Remaining</div>
            </div>
          )}
        </div>
        {overLimit && <p className="error-text" style={{ marginTop: 12 }}>You're {characters - limitN} characters over the limit.</p>}

        <div className="btn-row" style={{ marginTop: 18 }}>
          <button type="button" className="btn btn-secondary" onClick={() => setText("")}>Clear</button>
        </div>
      </div>
    </ToolLayout>
  );
}
