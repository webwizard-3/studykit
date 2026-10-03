import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import SearchBox from "../components/SearchBox";
import AdSlot from "../components/AdSlot";
import { CATEGORIES, POPULAR_SLUGS, TOOLS, getToolBySlug } from "../data/tools";
import "./Home.css";

const WHY = [
  {
    mark: "A",
    title: "Nothing to sign up for",
    body: "Open a tool and use it. There's no account, no email gate, and no paywall on any calculator.",
  },
  {
    mark: "B",
    title: "Runs in your browser",
    body: "Calculations happen on your device. Anything you save — notes, to-dos, countdowns — stays in your browser's storage, not on a server.",
  },
  {
    mark: "C",
    title: "Built for small screens",
    body: "Every tool is designed mobile-first, so it works the same whether you're on a laptop between classes or a phone on the bus.",
  },
];

export default function Home() {
  const popular = POPULAR_SLUGS.map(getToolBySlug).filter(Boolean);

  return (
    <>
      <Seo
        title={null}
        description="StudyKit is a free collection of 20 fast, browser-based calculators and study tools for students — GPA, grades, percentages, timers, planners and more. No sign-up."
        path="/"
      />

      <section className="hero">
        <div className="container hero__inner">
          <p className="hero__eyebrow">Free tools for students</p>
          <h1>Calculators and study tools that just work.</h1>
          <p className="hero__sub">
            StudyKit is a set of {TOOLS.length} small, fast tools — grade and GPA
            calculators, timers, planners, converters and more — that run
            entirely in your browser. No account, no clutter, no ads that get
            in the way of the tool.
          </p>
          <div className="hero__search">
            <SearchBox placeholder="Try “GPA” or “pomodoro”…" />
          </div>
          <p className="hero__meta">{TOOLS.length} tools across {Object.keys(CATEGORIES).length} categories — all free.</p>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Popular tools</h2>
          <Link to="/tools">View all tools</Link>
        </div>
        <div className="tool-grid">
          {popular.map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.slug}`} className="tool-card">
              <span className="tool-card__name">{tool.name}</span>
              <p className="tool-card__desc">{tool.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Browse by category</h2>
        </div>
        <div className="category-grid">
          {Object.values(CATEGORIES).map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.slug).length;
            return (
              <Link key={cat.slug} to={`/${cat.slug}`} className="category-card">
                <h3>{cat.label}</h3>
                <p>{cat.description}</p>
                <span className="category-card__count">{count} tools</span>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot slot="home-mid" variant="banner" />

      <section className="section container">
        <div className="section-head">
          <h2>Featured this week</h2>
        </div>
        <div className="tool-grid">
          {[getToolBySlug("study-planner"), getToolBySlug("required-marks-calculator"), getToolBySlug("word-counter"), getToolBySlug("unit-converter")]
            .filter(Boolean)
            .map((tool) => (
              <Link key={tool.slug} to={`/tools/${tool.slug}`} className="tool-card">
                <span className="tool-card__name">{tool.name}</span>
                <p className="tool-card__desc">{tool.short}</p>
              </Link>
            ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Why StudyKit</h2>
        </div>
        <div className="why-grid">
          {WHY.map((item) => (
            <div className="why-item" key={item.title}>
              <div className="why-item__mark" aria-hidden="true">{item.mark}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="guide-teaser">
          <div>
            <h2 style={{ marginBottom: 0 }}>Study guides</h2>
            <p>Short, practical explainers on grading, GPA scales and study techniques — written to accompany the calculators, not replace your teacher.</p>
          </div>
          <Link to="/guides" className="btn btn-primary">Browse guides</Link>
        </div>
      </section>
    </>
  );
}
