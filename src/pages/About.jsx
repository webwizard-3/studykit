import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import "./StaticPage.css";

export default function About() {
  return (
    <div className="static-page">
      <Seo
        title="About"
        description="Why StudyKit exists, how the tools are built, and what to expect from them."
        path="/about"
      />
      <div className="container static-page__inner">
        <h1>About StudyKit</h1>
        <p className="static-page__lede">
          StudyKit is a small collection of calculators and study tools built
          for one job: get you an answer fast, without an account, a
          download, or a screen full of unrelated content.
        </p>

        <section>
          <h2>What it is</h2>
          <p>
            Every tool on this site — from the GPA calculator to the Pomodoro
            timer — runs entirely in your browser. There's no server doing
            the maths and nothing is uploaded anywhere. If you close the tab,
            the only things that persist are what you explicitly saved (like
            a to-do list or a note), and that's stored on your own device
            using your browser's local storage, not a StudyKit account,
            because there isn't one.
          </p>
        </section>

        <section>
          <h2>Why it exists</h2>
          <p>
            Most calculator sites bury a simple tool under walls of text,
            pop-ups and autoplaying video. StudyKit tries to do the opposite:
            put the tool first, keep the explanation genuinely useful, and
            get out of the way.
          </p>
        </section>

        <section>
          <h2>What it isn't</h2>
          <p>
            StudyKit doesn't replace your school's official grading policy,
            your registrar's GPA calculation, or your teacher's syllabus.
            Grading scales vary by institution, so treat every result here as
            a working estimate and check it against your own school's rules
            before relying on it for anything official.
          </p>
        </section>

        <section>
          <h2>Get in touch</h2>
          <p>
            Found a bug, or a tool you'd like to see added? Visit the{" "}
            <Link to="/contact">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
