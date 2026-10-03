import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

const Home = lazy(() => import("./pages/Home"));
const ToolsIndex = lazy(() => import("./pages/ToolsIndex"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const GuidesPage = lazy(() => import("./pages/Guides"));
const AboutPage = lazy(() => import("./pages/About"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

const PercentageCalculator = lazy(() => import("./pages/tools/PercentageCalculator"));
const GpaCalculator = lazy(() => import("./pages/tools/GpaCalculator"));
const GradeCalculator = lazy(() => import("./pages/tools/GradeCalculator"));
const MarksCalculator = lazy(() => import("./pages/tools/MarksCalculator"));
const RequiredMarksCalculator = lazy(() => import("./pages/tools/RequiredMarksCalculator"));
const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const DaysBetweenDates = lazy(() => import("./pages/tools/DaysBetweenDates"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const TemperatureConverter = lazy(() => import("./pages/tools/TemperatureConverter"));
const NumberToWords = lazy(() => import("./pages/tools/NumberToWords"));
const ExamCountdown = lazy(() => import("./pages/tools/ExamCountdown"));
const PomodoroTimer = lazy(() => import("./pages/tools/PomodoroTimer"));
const StudyTimer = lazy(() => import("./pages/tools/StudyTimer"));
const ToDoList = lazy(() => import("./pages/tools/ToDoList"));
const StudyPlanner = lazy(() => import("./pages/tools/StudyPlanner"));
const Notes = lazy(() => import("./pages/tools/Notes"));
const WordCounter = lazy(() => import("./pages/tools/WordCounter"));
const CharacterCounter = lazy(() => import("./pages/tools/CharacterCounter"));
const CaseConverter = lazy(() => import("./pages/tools/CaseConverter"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));

function PageFallback() {
  return <div className="container" style={{ padding: "80px 20px", color: "var(--ink-faint)" }}>Loading…</div>;
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<ToolsIndex />} />
          <Route path="calculators" element={<CategoryPage categorySlug="calculators" />} />
          <Route path="productivity" element={<CategoryPage categorySlug="productivity" />} />
          <Route path="guides" element={<GuidesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="contact" element={<ContactPage />} />

          <Route path="tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="tools/gpa-calculator" element={<GpaCalculator />} />
          <Route path="tools/grade-calculator" element={<GradeCalculator />} />
          <Route path="tools/marks-calculator" element={<MarksCalculator />} />
          <Route path="tools/required-marks-calculator" element={<RequiredMarksCalculator />} />
          <Route path="tools/age-calculator" element={<AgeCalculator />} />
          <Route path="tools/days-between-dates" element={<DaysBetweenDates />} />
          <Route path="tools/unit-converter" element={<UnitConverter />} />
          <Route path="tools/temperature-converter" element={<TemperatureConverter />} />
          <Route path="tools/number-to-words" element={<NumberToWords />} />
          <Route path="tools/exam-countdown" element={<ExamCountdown />} />
          <Route path="tools/pomodoro-timer" element={<PomodoroTimer />} />
          <Route path="tools/study-timer" element={<StudyTimer />} />
          <Route path="tools/to-do-list" element={<ToDoList />} />
          <Route path="tools/study-planner" element={<StudyPlanner />} />
          <Route path="tools/notes" element={<Notes />} />
          <Route path="tools/word-counter" element={<WordCounter />} />
          <Route path="tools/character-counter" element={<CharacterCounter />} />
          <Route path="tools/case-converter" element={<CaseConverter />} />
          <Route path="tools/password-generator" element={<PasswordGenerator />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
