import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { CATEGORIES, getToolsByCategory } from "../data/tools";
import "./ToolsIndex.css";

export default function CategoryPage({ categorySlug }) {
  const category = CATEGORIES[categorySlug];
  const tools = getToolsByCategory(categorySlug);

  return (
    <>
      <Seo
        title={category.label}
        description={`${category.description} Browse all ${tools.length} ${category.label.toLowerCase()} tools on StudyKit.`}
        path={`/${category.slug}`}
      />
      <header className="tools-index__header">
        <div className="container">
          <h1>{category.label}</h1>
          <p>{category.description}</p>
        </div>
      </header>

      <div className="container tools-index__body">
        <div className="tool-grid">
          {tools.map((tool) => (
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
