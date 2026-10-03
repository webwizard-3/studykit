import { Link } from "react-router-dom";
import { CATEGORIES, POPULAR_SLUGS, getToolBySlug } from "../data/tools";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <Link to="/" className="site-footer__logo">
            <span className="site-header__mark" aria-hidden="true">SK</span>
            <span>StudyKit</span>
          </Link>
          <p>
            Free, fast calculators and study tools that run entirely in your
            browser. No sign-up, no tracking beyond what's disclosed in our
            privacy page.
          </p>
        </div>

        <div>
          <h3>Categories</h3>
          <ul>
            {Object.values(CATEGORIES).map((c) => (
              <li key={c.slug}>
                <Link to={`/${c.slug}`}>{c.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/tools">All tools</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Popular tools</h3>
          <ul>
            {POPULAR_SLUGS.slice(0, 6).map((slug) => {
              const tool = getToolBySlug(slug);
              if (!tool) return null;
              return (
                <li key={slug}>
                  <Link to={`/tools/${slug}`}>{tool.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3>Site</h3>
          <ul>
            <li><Link to="/guides">Study guides</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>&copy; {year} StudyKit. All calculations happen locally in your browser.</p>
      </div>
    </footer>
  );
}
