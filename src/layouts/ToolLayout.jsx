import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import AdSlot from "../components/AdSlot";
import { CATEGORIES, getToolBySlug } from "../data/tools";
import "./ToolLayout.css";

/**
 * @param {object} props
 * @param {object} props.tool - entry from data/tools.js
 * @param {string} props.description - meta description (~150 chars)
 * @param {React.ReactNode} props.children - the interactive calculator/tool itself
 * @param {string[]} [props.intro] - 1-3 paragraphs introducing the tool
 * @param {string[]} [props.howTo] - ordered steps
 * @param {{title?: string, body: React.ReactNode}} [props.formula] - formula/explanation block
 * @param {{title?: string, body: React.ReactNode}} [props.example] - worked example block
 * @param {{q: string, a: string}[]} [props.faq]
 * @param {string[]} [props.relatedSlugs]
 */
export default function ToolLayout({
  tool,
  description,
  children,
  intro = [],
  howTo = [],
  formula,
  example,
  faq = [],
  relatedSlugs = [],
}) {
  const category = CATEGORIES[tool.category];
  const related = relatedSlugs.map(getToolBySlug).filter(Boolean);

  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <article className="tool-page">
      <Seo title={tool.name} description={description} path={`/tools/${tool.slug}`} />
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}

      <div className="container tool-page__inner">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/${category.slug}`}>{category.label}</Link></li>
            <li aria-current="page">{tool.name}</li>
          </ol>
        </nav>

        <header className="tool-page__header">
          <h1>{tool.name}</h1>
          <p className="tool-page__lede">{tool.short}</p>
        </header>

        <div className="tool-page__widget">{children}</div>

        <AdSlot slot={`tool-${tool.slug}-inline`} variant="banner" />

        {intro.length > 0 && (
          <section className="tool-page__section" aria-labelledby="about-heading">
            <h2 id="about-heading">About this tool</h2>
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        )}

        {howTo.length > 0 && (
          <section className="tool-page__section" aria-labelledby="howto-heading">
            <h2 id="howto-heading">How to use it</h2>
            <ol className="tool-page__steps">
              {howTo.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {formula && (
          <section className="tool-page__section" aria-labelledby="formula-heading">
            <h2 id="formula-heading">{formula.title || "The formula"}</h2>
            <div className="tool-page__formula">{formula.body}</div>
          </section>
        )}

        {example && (
          <section className="tool-page__section" aria-labelledby="example-heading">
            <h2 id="example-heading">{example.title || "Example"}</h2>
            <div className="tool-page__example">{example.body}</div>
          </section>
        )}

        {faq.length > 0 && (
          <section className="tool-page__section" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Frequently asked questions</h2>
            <dl className="tool-page__faq">
              {faq.map((item, i) => (
                <div key={i} className="tool-page__faq-item">
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {related.length > 0 && (
          <section className="tool-page__section" aria-labelledby="related-heading">
            <h2 id="related-heading">Related tools</h2>
            <ul className="tool-page__related">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/tools/${r.slug}`}>{r.name}</Link>
                  <p>{r.short}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
