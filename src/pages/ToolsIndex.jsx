import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { CATEGORIES, TOOLS } from "../data/tools";
import "./ToolsIndex.css";

export default function ToolsIndex() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () => (active === "all" ? TOOLS : TOOLS.filter((t) => t.category === active)),
    [active]
  );

  return (
    <>
      <Seo
        title="All tools"
        description="Browse every StudyKit tool: calculators, converters, timers and planners for students, all free and running in your browser."
        path="/tools"
      />
      <header className="tools-index__header">
        <div className="container">
          <h1>All tools</h1>
          <p>Every calculator and utility on StudyKit, in one place. {TOOLS.length} tools and counting.</p>
        </div>
      </header>

      <div className="container tools-index__body">
        <div className="tabs" role="tablist" aria-label="Filter tools by category">
          <button className={active === "all" ? "is-active" : ""} onClick={() => setActive("all")} role="tab" aria-selected={active === "all"}>
            All ({TOOLS.length})
          </button>
          {Object.values(CATEGORIES).map((c) => {
            const count = TOOLS.filter((t) => t.category === c.slug).length;
            return (
              <button
                key={c.slug}
                className={active === c.slug ? "is-active" : ""}
                onClick={() => setActive(c.slug)}
                role="tab"
                aria-selected={active === c.slug}
              >
                {c.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="tool-grid">
          {filtered.map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.slug}`} className="tool-card">
              <span className="tool-card__name">{tool.name}</span>
              <p className="tool-card__desc">{tool.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
