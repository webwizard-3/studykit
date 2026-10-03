import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "80px 20px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <Seo title="Page not found" description="This page doesn't exist on StudyKit." path="/404" noindex />
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist, or may have moved.</p>
      <Link to="/tools" className="btn btn-primary">Browse all tools</Link>
    </div>
  );
}
