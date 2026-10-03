import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import "./StaticPage.css";

export default function Privacy() {
  return (
    <div className="static-page">
      <Seo
        title="Privacy"
        description="How StudyKit handles local storage, cookies, analytics and advertising."
        path="/privacy"
      />
      <div className="container static-page__inner">
        <h1>Privacy</h1>
        <p className="static-page__lede">
          This page explains, plainly, what data StudyKit's tools store and
          where it goes. It's written for a general audience, not as a
          substitute for legal advice.
        </p>

        <div className="callout">
          <strong>Placeholder notice:</strong> the analytics and advertising
          sections below describe what StudyKit would disclose <em>if</em>{" "}
          those services are added. Update this page with the specific
          services actually in use (and their own privacy policies) before
          this site goes live in production.
        </div>

        <section>
          <h2>Local storage</h2>
          <p>
            Several tools — the To-Do List, Study Planner, Simple Notes, and
            Exam Countdown — save what you enter using your browser's
            <code> localStorage</code>. This data:
          </p>
          <ul>
            <li>Stays on your device; it is never sent to a StudyKit server, because StudyKit doesn't run one that collects it.</li>
            <li>Persists between visits until you clear it yourself, or clear your browser's site data.</li>
            <li>Is not encrypted, so avoid storing sensitive personal information in it.</li>
            <li>Is not synced across devices or browsers — data saved on your phone won't appear on your laptop.</li>
          </ul>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            StudyKit's tools themselves do not set cookies. If cookies are
            introduced later (for example, by an analytics or advertising
            provider), this section will be updated to name the provider and
            explain what each cookie does.
          </p>
        </section>

        <section>
          <h2>Analytics (placeholder)</h2>
          <p>
            StudyKit does not currently run analytics. If privacy-conscious,
            aggregate analytics are added in future to understand which tools
            are useful, this section will name the provider, state what is
            collected, and explain how to opt out.
          </p>
        </section>

        <section>
          <h2>Advertising (placeholder)</h2>
          <p>
            StudyKit does not currently show ads. The empty ad placeholders
            you may see reserve space for future, clearly labeled
            advertising. If ads are added, this section will name the ad
            network, describe what data it may collect (such as approximate
            location or ad interaction data), and link to that network's own
            privacy policy and opt-out tools.
          </p>
        </section>

        <section>
          <h2>Clearing your data</h2>
          <p>
            You can remove everything StudyKit has stored in your browser at
            any time through your browser's site settings (usually under
            "Site settings" or "Clear browsing data," scoped to this site),
            or by clearing local storage from your browser's developer
            tools.
          </p>
        </section>

        <section>
          <h2>Questions</h2>
          <p>
            If anything here is unclear, reach out via the{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
