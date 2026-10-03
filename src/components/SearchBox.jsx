import { useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTools } from "../data/tools";
import "./SearchBox.css";

export default function SearchBox({ autoFocus = false, placeholder = "Search tools…" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const listId = useId();
  const inputRef = useRef(null);

  const results = useMemo(() => searchTools(query).slice(0, 8), [query]);

  function goTo(slug) {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
    navigate(`/tools/${slug}`);
  }

  function handleKeyDown(e) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        goTo(results[activeIndex].slug);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className="search-box">
      <label htmlFor="site-search" className="sr-only">
        Search tools
      </label>
      <input
        id="site-search"
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
      />
      {open && results.length > 0 && (
        <ul id={listId} role="listbox" className="search-box__results">
          {results.map((tool, i) => (
            <li key={tool.slug} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                className={i === activeIndex ? "is-active" : ""}
                onMouseDown={() => goTo(tool.slug)}
              >
                <span className="search-box__name">{tool.name}</span>
                <span className="search-box__short">{tool.short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim() && results.length === 0 && (
        <div className="search-box__empty">No tools match "{query}".</div>
      )}
    </div>
  );
}
