import { useMemo, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";
import { toFiniteNumber } from "../../utils/number";
import { numberToWords, MAX_SUPPORTED } from "../../utils/numberToWords";

const tool = getToolBySlug("number-to-words");

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function NumberToWords() {
  const [input, setInput] = useState("1245");

  const result = useMemo(() => {
    if (input.trim() === "") return null;
    const n = toFiniteNumber(input);
    if (n === null) return { error: "Enter a valid number." };
    const converted = numberToWords(n);
    if (!converted) return { error: "Enter a valid number." };
    if (converted.tooLarge) return { error: `This converter supports numbers up to ${MAX_SUPPORTED.toLocaleString()}.` };
    return { words: converted.words };
  }, [input]);

  return (
    <ToolLayout
      tool={tool}
      description="Convert any number into English words instantly — handy for cheques, forms and long-form writing. Free number-to-words converter."
      intro={[
        "This tool spells out a number in plain English words, including decimals and negative numbers. It's the kind of thing you need occasionally — writing a cheque, filling in a form, or double-checking a number you've written out longhand — and don't want to do by hand.",
      ]}
      howTo={[
        "Type any number, positive or negative, with or without decimals.",
        "The words appear immediately below.",
      ]}
      example={{
        body: <p><code>1,245</code> → "one thousand two hundred forty-five". <code>-3.5</code> → "negative three point five".</p>,
      }}
      faq={[
        { q: "What's the largest number supported?", a: `Numbers up to ${MAX_SUPPORTED.toLocaleString()} (just under one quadrillion) convert correctly. Beyond that, the tool tells you rather than showing an incorrect result.` },
        { q: "How are decimals handled?", a: "Decimals are read digit by digit after the word 'point' — for example 3.14 becomes 'three point one four'." },
      ]}
      relatedSlugs={["unit-converter", "percentage-calculator"]}
    >
      <div className="card">
        <div className="field">
          <label htmlFor="ntw-input">Number</label>
          <input id="ntw-input" className="input" type="text" inputMode="decimal" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. 1245 or -3.5" />
        </div>

        {result?.error && <p className="error-text">{result.error}</p>}

        {result?.words && (
          <div className="result">
            <div className="result-label">In words</div>
            <div className="result-value" style={{ fontSize: "1.3rem" }}>{capitalize(result.words)}</div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
