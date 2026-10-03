// Central registry of every tool on StudyKit.
// Adding a tool here automatically wires up: routing, search, the /tools
// index, the category pages, and the homepage "popular tools" list.
// `Component` is loaded lazily by src/App.jsx via React.lazy().

export const CATEGORIES = {
  calculators: {
    slug: "calculators",
    label: "Calculators",
    description:
      "Work out percentages, grades and GPA without reaching for a spreadsheet.",
  },
  productivity: {
    slug: "productivity",
    label: "Productivity",
    description:
      "Timers, countdowns and planners to help you actually get the studying done.",
  },
  text: {
    slug: "text",
    label: "Text & utility",
    description:
      "Word counts, case conversion and other small jobs you run a dozen times a week.",
  },
};

export const TOOLS = [
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    short: "Find what percentage one number is of another, or a percentage of a value.",
    category: "calculators",
    keywords: ["percent", "percentage", "marks", "score"],
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    short: "Work out your grade point average across weighted subjects.",
    category: "calculators",
    keywords: ["gpa", "grade point average", "credit hours"],
  },
  {
    slug: "grade-calculator",
    name: "Grade Calculator",
    short: "Turn marks into a percentage and a letter grade against your own scale.",
    category: "calculators",
    keywords: ["grade", "letter grade", "marks", "scale"],
  },
  {
    slug: "marks-calculator",
    name: "Marks Calculator",
    short: "Add up obtained and total marks across several subjects at once.",
    category: "calculators",
    keywords: ["marks", "total marks", "subjects", "exam"],
  },
  {
    slug: "required-marks-calculator",
    name: "Required Marks Calculator",
    short: "Find the score you need on what's left to hit a target percentage.",
    category: "calculators",
    keywords: ["required marks", "target percentage", "final exam"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    short: "Calculate an exact age in years, months and days from a birth date.",
    category: "calculators",
    keywords: ["age", "birthday", "date of birth"],
  },
  {
    slug: "days-between-dates",
    name: "Days Between Dates",
    short: "Count the days, weeks or months between any two dates.",
    category: "calculators",
    keywords: ["days between", "date difference", "duration"],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    short: "Convert length, weight and volume between metric and imperial units.",
    category: "calculators",
    keywords: ["unit converter", "length", "weight", "volume", "metric", "imperial"],
  },
  {
    slug: "temperature-converter",
    name: "Temperature Converter",
    short: "Convert between Celsius, Fahrenheit and Kelvin.",
    category: "calculators",
    keywords: ["temperature", "celsius", "fahrenheit", "kelvin"],
  },
  {
    slug: "number-to-words",
    name: "Number to Words",
    short: "Spell out any number in words — handy for cheques and long-form writing.",
    category: "calculators",
    keywords: ["number to words", "spell number", "words"],
  },
  {
    slug: "exam-countdown",
    name: "Exam Countdown",
    short: "A live countdown to your next exam, saved right in your browser.",
    category: "productivity",
    keywords: ["exam countdown", "timer", "days left"],
  },
  {
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    short: "25-minute focus sessions with short and long breaks built in.",
    category: "productivity",
    keywords: ["pomodoro", "focus timer", "study timer"],
  },
  {
    slug: "study-timer",
    name: "Study Timer",
    short: "A plain countdown timer for any custom study session length.",
    category: "productivity",
    keywords: ["study timer", "countdown", "stopwatch"],
  },
  {
    slug: "to-do-list",
    name: "To-Do List",
    short: "A no-frills task list with due status, saved locally on your device.",
    category: "productivity",
    keywords: ["to-do", "todo", "tasks", "checklist"],
  },
  {
    slug: "study-planner",
    name: "Study Planner",
    short: "Plan subjects and tasks by date and priority across the week.",
    category: "productivity",
    keywords: ["study planner", "schedule", "revision plan"],
  },
  {
    slug: "notes",
    name: "Simple Notes",
    short: "Quick notes that save automatically in your browser — nothing to sign into.",
    category: "productivity",
    keywords: ["notes", "notepad", "scratchpad"],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    short: "Count words, characters, sentences and paragraphs as you type.",
    category: "text",
    keywords: ["word count", "essay length", "sentences", "paragraphs"],
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    short: "A live character count, with and without spaces.",
    category: "text",
    keywords: ["character count", "letter count", "limit"],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    short: "Switch text between UPPERCASE, lowercase, Title Case and Sentence case.",
    category: "text",
    keywords: ["case converter", "uppercase", "lowercase", "title case"],
  },
  {
    slug: "password-generator",
    name: "Random Password Generator",
    short: "Generate a strong password locally in your browser — nothing leaves your device.",
    category: "text",
    keywords: ["password generator", "random password", "secure password"],
  },
];

export const POPULAR_SLUGS = [
  "percentage-calculator",
  "gpa-calculator",
  "pomodoro-timer",
  "age-calculator",
  "word-counter",
  "to-do-list",
  "grade-calculator",
  "exam-countdown",
];

export function getToolBySlug(slug) {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug) {
  return TOOLS.filter((t) => t.category === categorySlug);
}

export function searchTools(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return TOOLS.filter((t) => {
    const haystack = [t.name, t.short, ...(t.keywords || [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
