import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber } from "../../utils/number";

const tool = getToolBySlug("unit-converter");

// Each category stores units as a multiplier to convert TO the base unit.
const CATEGORIES = {
  length: {
    label: "Length",
    base: "meter",
    units: {
      millimeter: { label: "Millimeters (mm)", toBase: 0.001 },
      centimeter: { label: "Centimeters (cm)", toBase: 0.01 },
      meter: { label: "Meters (m)", toBase: 1 },
      kilometer: { label: "Kilometers (km)", toBase: 1000 },
      inch: { label: "Inches (in)", toBase: 0.0254 },
      foot: { label: "Feet (ft)", toBase: 0.3048 },
      yard: { label: "Yards (yd)", toBase: 0.9144 },
      mile: { label: "Miles (mi)", toBase: 1609.344 },
    },
  },
  weight: {
    label: "Weight",
    base: "kilogram",
    units: {
      milligram: { label: "Milligrams (mg)", toBase: 0.000001 },
      gram: { label: "Grams (g)", toBase: 0.001 },
      kilogram: { label: "Kilograms (kg)", toBase: 1 },
      tonne: { label: "Tonnes (t)", toBase: 1000 },
      ounce: { label: "Ounces (oz)", toBase: 0.0283495 },
      pound: { label: "Pounds (lb)", toBase: 0.45359237 },
    },
  },
  volume: {
    label: "Volume",
    base: "liter",
    units: {
      milliliter: { label: "Milliliters (mL)", toBase: 0.001 },
      liter: { label: "Liters (L)", toBase: 1 },
      cubicMeter: { label: "Cubic meters (m³)", toBase: 1000 },
      teaspoon: { label: "Teaspoons (tsp)", toBase: 0.00492892 },
      tablespoon: { label: "Tablespoons (tbsp)", toBase: 0.0147868 },
      cup: { label: "Cups (US)", toBase: 0.24 },
      pint: { label: "Pints (US)", toBase: 0.473176 },
      gallon: { label: "Gallons (US)", toBase: 3.78541 },
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");
  const [value, setValue] = useState("1");

  const unitList = CATEGORIES[category].units;

  function handleCategoryChange(next) {
    const keys = Object.keys(CATEGORIES[next].units);
    setCategory(next);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  }

  const result = useMemo(() => {
    const n = toFiniteNumber(value);
    if (n === null) return null;
    const from = unitList[fromUnit];
    const to = unitList[toUnit];
    if (!from || !to) return null;
    const baseValue = n * from.toBase;
    return baseValue / to.toBase;
  }, [value, fromUnit, toUnit, unitList]);

  return (
    <ToolLayout
      tool={tool}
      description="Convert length, weight and volume between metric and imperial units instantly. Free unit converter."
      intro={[
        "A quick converter for the three unit categories students run into most: length, weight and volume. Pick a category, choose the units on each side, and type a number in either field's context to convert.",
      ]}
      howTo={[
        "Choose a category: length, weight or volume.",
        "Pick the unit you're converting from and the unit you're converting to.",
        "Enter a value — the converted result updates instantly.",
      ]}
      example={{
        body: <p>1 meter converted to feet: <code>1 × 3.28084 ≈ 3.28 ft</code>.</p>,
      }}
      faq={[
        { q: "How accurate are the conversions?", a: "Conversions use standard internationally-defined conversion factors (for example, 1 inch = 0.0254 meters exactly), so results are accurate to the decimals shown." },
        { q: "Can I convert in the other direction?", a: "Yes — swap the 'from' and 'to' units and the result recalculates automatically." },
      ]}
      relatedSlugs={["temperature-converter", "number-to-words"]}
    >
      <div className="card">
        <div className="tabs" role="tablist">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button key={key} role="tab" aria-selected={category === key} className={category === key ? "is-active" : ""} onClick={() => handleCategoryChange(key)}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid-2">
          <div className="field">
            <label htmlFor="uc-value">Value</label>
            <input id="uc-value" className="input" type="number" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div />
          <div className="field">
            <label htmlFor="uc-from">From</label>
            <select id="uc-from" className="select" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {Object.entries(unitList).map(([key, u]) => (
                <option key={key} value={key}>{u.label}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="uc-to">To</label>
            <select id="uc-to" className="select" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {Object.entries(unitList).map(([key, u]) => (
                <option key={key} value={key}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>

        {result !== null && (
          <div className="result">
            <div className="result-label">Result</div>
            <div className="result-value">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} <span style={{ fontSize: "1rem", fontWeight: 500 }}>{unitList[toUnit].label}</span>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
