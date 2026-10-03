import Seo from "../components/Seo";
import "./StaticPage.css";

const CONTACT_EMAIL = "hello@studykit.example"; // TODO: replace with your real inbox before launch

export default function Contact() {
  return (
    <div className="static-page">
      <Seo
        title="Contact"
        description="Get in touch with StudyKit about a bug, a suggestion, or a tool you'd like to see added."
        path="/contact"
      />
      <div className="container static-page__inner">
        <h1>Contact</h1>
        <p className="static-page__lede">
          StudyKit doesn't have a support ticketing system — it's a small
          set of tools, not a company. The fastest way to reach out is
          email.
        </p>

        <div className="callout">
          <strong>Placeholder notice:</strong> <code>{CONTACT_EMAIL}</code> is
          a placeholder address. Replace it with a real inbox you check
          before this site goes live.
        </div>

        <section>
          <h2>Report a bug</h2>
          <p>
            If a calculator gives you a result that looks wrong, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the
            tool name and the numbers you entered — that's usually enough to
            reproduce and fix it.
          </p>
        </section>

        <section>
          <h2>Suggest a tool</h2>
          <p>
            Have an idea for a calculator or utility that would fit
            alongside these? Send a short description of what it should do
            to the same address.
          </p>
        </section>
      </div>
    </div>
  );
}
