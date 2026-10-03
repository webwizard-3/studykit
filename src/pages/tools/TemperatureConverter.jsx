import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber, formatNumber } from "../../utils/number";

const tool = getToolBySlug("temperature-converter");

function fromCelsius(c, unit) {
  if (unit === "C") return c;
  if (unit === "F") return (c * 9) / 5 + 32;
  return c + 273.15; // K
}
function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return ((value - 32) * 5) / 9;
  return value - 273.15; // K
}

export default function TemperatureConverter() {
  const [value, setValue] = useState("0");
  const [unit, setUnit] = useState("C");

  const n = toFiniteNumber(value);
  const celsius = n !== null ? toCelsius(n, unit) : null;

  const results = useMemo(() => {
    if (celsius === null) return null;
    return {
      C: fromCelsius(celsius, "C"),
      F: fromCelsius(celsius, "F"),
      K: fromCelsius(celsius, "K"),
    };
  }, [celsius]);

  const belowAbsoluteZero = results !== null && results.K < 0;

  return (
    <ToolLayout
      tool={tool}
      description="Convert temperatures between Celsius, Fahrenheit and Kelvin instantly. Free temperature converter."
      intro={[
        "Enter a temperature in any of the three common scales, and see the equivalent in the other two at the same time — no need to remember the formulas.",
      ]}
      howTo={[
        "Choose the unit you're entering a value in.",
        "Type the temperature.",
        "The equivalent values in Celsius, Fahrenheit and Kelvin all appear at once.",
      ]}
      formula={{
        body: (
          <>
            <p><code>°F = (°C × 9/5) + 32</code></p>
            <p style={{ marginTop: 12 }}><code>K = °C + 273.15</code></p>
          </>
        ),
      }}
      example={{
        body: <p>25°C converts to <code>(25 × 9/5) + 32 = 77°F</code> and <code>25 + 273.15 = 298.15 K</code>.</p>,
      }}
      faq={[
        { q: "Can I enter a negative temperature?", a: "Yes — negative values are valid in Celsius and Fahrenheit. Kelvin can't go below zero, since that's absolute zero." },
        { q: "What happens below absolute zero?", a: "If a conversion would put the Kelvin value below zero, the calculator flags it as physically impossible rather than showing a negative Kelvin figure." },
      ]}
      relatedSlugs={["unit-converter", "number-to-words"]}
    >
      <div className="card">
        <div className="grid-2">
          <div className="field">
            <label htmlFor="temp-value">Temperature</label>
            <input id="temp-value" className="input" type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="temp-unit">Unit</label>
            <select id="temp-unit" className="select" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>
        </div>

        {belowAbsoluteZero && <p className="error-text">That value is below absolute zero and isn't physically possible.</p>}

        {results && !belowAbsoluteZero && (
          <div className="result">
            <div className="result-grid">
              <div><div className="result-label">Celsius</div><div className="result-value">{formatNumber(results.C, 2)}°C</div></div>
              <div><div className="result-label">Fahrenheit</div><div className="result-value">{formatNumber(results.F, 2)}°F</div></div>
              <div><div className="result-label">Kelvin</div><div className="result-value">{formatNumber(results.K, 2)} K</div></div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
