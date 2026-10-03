const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
];
const SCALES = ["", "thousand", "million", "billion", "trillion"];

export const MAX_SUPPORTED = 999999999999999; // just under a quadrillion

function threeDigitsToWords(n) {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  const parts = [];
  if (hundreds > 0) parts.push(`${ONES[hundreds]} hundred`);
  if (rest > 0) {
    if (rest < 20) parts.push(ONES[rest]);
    else {
      const tens = Math.floor(rest / 10);
      const ones = rest % 10;
      parts.push(ones > 0 ? `${TENS[tens]}-${ONES[ones]}` : TENS[tens]);
    }
  }
  return parts.join(" ");
}

export function integerToWords(n) {
  if (n === 0) return "zero";
  const groups = [];
  let remaining = n;
  while (remaining > 0) {
    groups.push(remaining % 1000);
    remaining = Math.floor(remaining / 1000);
  }
  const words = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;
    const groupWords = threeDigitsToWords(groups[i]);
    words.push(SCALES[i] ? `${groupWords} ${SCALES[i]}` : groupWords);
  }
  return words.join(" ");
}

/** Converts a number (possibly negative, possibly decimal) to English words. */
export function numberToWords(value) {
  if (!Number.isFinite(value)) return null;
  const negative = value < 0;
  const abs = Math.abs(value);

  const integerPart = Math.floor(abs);
  if (integerPart > MAX_SUPPORTED) return { tooLarge: true };

  // Capture up to 2 decimal digits without floating point drift.
  const decimalPart = Math.round((abs - integerPart) * 100);

  let words = integerToWords(integerPart);
  if (decimalPart > 0) {
    const decWords =
      decimalPart < 10 ? `zero ${ONES[decimalPart]}` : threeDigitsToWords(decimalPart);
    words += ` point ${decWords}`;
  }
  if (negative) words = `negative ${words}`;
  return { words };
}
