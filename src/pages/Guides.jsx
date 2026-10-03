import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import "./StaticPage.css";
import "./Guides.css";

const GUIDES = [
  {
    title: "How GPA is actually calculated",
    body: [
      "A GPA is a weighted average, not a plain average. Each grade is converted to a point value (an A might be worth 4.0, a B 3.0, and so on, depending on your school's scale), then multiplied by the credit hours for that course. Add up all those weighted points, divide by the total credit hours, and you have your GPA.",
      "This is exactly why a 3-credit A and a 1-credit A don't count the same: the 3-credit course pulls your average further. If your school uses plus/minus grades (A-, B+), it usually has a slightly different point value for each, so check your institution's official scale rather than assuming a flat 4.0/3.0/2.0 system.",
    ],
    tools: ["gpa-calculator", "grade-calculator"],
  },
  {
    title: "Working out what you need on a final exam",
    body: [
      "If you know your current grade and how much the final is worth, you can work backwards to find the minimum score you need. The general idea: figure out how many percentage points your final exam needs to contribute, then divide by the weight of the final to get the score you'd need to earn on it specifically.",
      "This only works if you know the exact weighting scheme your course uses (for example, 'the final is 30% of the grade'). If your syllabus doesn't state this clearly, ask your instructor — guessing the weighting will give you a confident-looking but wrong number.",
    ],
    tools: ["required-marks-calculator", "percentage-calculator"],
  },
  {
    title: "Why the Pomodoro Technique works (and when it doesn't)",
    body: [
      "The Pomodoro Technique breaks work into short, timed sessions (traditionally 25 minutes) followed by a short break, with a longer break after every four sessions. The timer creates a deadline for a small, achievable chunk of work, which tends to reduce the urge to check your phone 'just for a second.'",
      "It works best for tasks you can break into discrete chunks — problem sets, reading a set number of pages, writing a section of an essay. It works less well for deep, uninterruptible work where a 25-minute break in concentration costs you more than it saves; for that kind of work, a longer, single block from the Study Timer may suit you better.",
    ],
    tools: ["pomodoro-timer", "study-timer"],
  },
  {
    title: "Building a study plan you'll actually follow",
    body: [
      "A plan with fifteen subjects and no priority order rarely survives contact with a real week. Start by listing what's actually due soonest, then assign each item a priority rather than treating everything as equally urgent — a planner that can't tell you what to do first isn't doing its job.",
      "Review it briefly at the same time each day rather than building the perfect plan once and never touching it again; study plans are a running document, not a one-time exercise.",
    ],
    tools: ["study-planner", "exam-countdown", "to-do-list"],
  },
];

export default function Guides() {
  return (
    <div className="static-page">
      <Seo
        title="Study guides"
        description="Short, practical guides on GPA, grading, exam prep and study techniques to go with StudyKit's calculators."
        path="/guides"
      />
      <div className="container static-page__inner">
        <h1>Study guides</h1>
        <p className="static-page__lede">
          Short explanations behind the tools — how the numbers work, and
          when a technique is actually the right one to reach for.
        </p>

        <div className="guides-list">
          {GUIDES.map((guide) => (
            <article className="guide-item" key={guide.title}>
              <h2>{guide.title}</h2>
              {guide.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="guide-item__tools">
                {guide.tools.map((slug) => (
                  <Link key={slug} to={`/tools/${slug}`}>
                    Open tool
                  </Link>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
