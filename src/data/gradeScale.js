// Single source of truth for the percentage -> letter grade scale used by
// the Grade Calculator. Edit the thresholds here to match your own school's
// scale — everything else updates automatically.
//
// `min` is inclusive: a percentage qualifies for the first entry (reading
// top to bottom) where percentage >= min.
export const GRADE_SCALE = [
  { min: 97, grade: "A+", description: "Outstanding" },
  { min: 93, grade: "A", description: "Excellent" },
  { min: 90, grade: "A-", description: "Excellent" },
  { min: 87, grade: "B+", description: "Good" },
  { min: 83, grade: "B", description: "Good" },
  { min: 80, grade: "B-", description: "Good" },
  { min: 77, grade: "C+", description: "Satisfactory" },
  { min: 73, grade: "C", description: "Satisfactory" },
  { min: 70, grade: "C-", description: "Satisfactory" },
  { min: 67, grade: "D+", description: "Passing" },
  { min: 60, grade: "D", description: "Passing" },
  { min: 0, grade: "F", description: "Not passing" },
];

export function gradeForPercentage(percentage) {
  if (!Number.isFinite(percentage)) return null;
  const clamped = Math.max(0, percentage);
  return GRADE_SCALE.find((row) => clamped >= row.min) || GRADE_SCALE[GRADE_SCALE.length - 1];
}
