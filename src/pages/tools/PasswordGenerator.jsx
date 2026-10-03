import { useEffect, useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import { getToolBySlug } from "../../data/tools";

const tool = getToolBySlug("password-generator");

const SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function getRandomInt(max) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword(length, options) {
  const pools = Object.entries(options)
    .filter(([, on]) => on)
    .map(([key]) => SETS[key]);
  if (pools.length === 0) return "";

  const allChars = pools.join("");
  // Guarantee at least one character from each selected set, then fill the rest randomly.
  const required = pools.map((pool) => pool[getRandomInt(pool.length)]);
  const rest = Array.from({ length: Math.max(0, length - required.length) }, () => allChars[getRandomInt(allChars.length)]);
  const combined = [...required, ...rest];

  // Shuffle (Fisher–Yates) so the guaranteed characters aren't always first.
  for (let i = combined.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined.slice(0, length).join("");
}

function strengthLabel(length, poolCount) {
  const score = length * Math.log2(Math.max(1, poolCount * 10));
  if (score < 40) return { label: "Weak", className: "badge-red" };
  if (score < 70) return { label: "Okay", className: "badge-amber" };
  return { label: "Strong", className: "badge" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ lowercase: true, uppercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function regenerate() {
    setPassword(generatePassword(length, options));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleOption(key) {
    setOptions((o) => {
      const next = { ...o, [key]: !o[key] };
      if (!Object.values(next).some(Boolean)) return o; // keep at least one set active
      return next;
    });
  }

  async function copyPassword() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — the field is still selectable for manual copy.
    }
  }

  const activeSets = Object.values(options).filter(Boolean).length;
  const strength = strengthLabel(length, activeSets);

  return (
    <ToolLayout
      tool={tool}
      description="Generate a strong random password with adjustable length and character sets — generated locally in your browser, never sent anywhere."
      intro={[
        "This generator creates passwords using your browser's cryptographically secure random number generator. Nothing is transmitted anywhere — the password is created and shown entirely on your device.",
      ]}
      howTo={[
        "Choose a length and which character sets to include.",
        "A password is generated automatically — click 'Generate new' for another.",
        "Click 'Copy' to copy it to your clipboard.",
      ]}
      faq={[
        { q: "Is this password sent to a server?", a: "No. It's generated using your browser's built-in Web Crypto API, entirely on your device, and is never transmitted anywhere." },
        { q: "How long should a password be?", a: "Longer is generally stronger. 16 characters with mixed character sets is a reasonable default for most accounts; use longer where a service allows it." },
        { q: "Should I reuse a generated password?", a: "No — use a unique password per account, ideally kept in a password manager rather than memorized or reused." },
      ]}
      relatedSlugs={["word-counter", "case-converter"]}
    >
      <div className="card">
        <div className="field">
          <label htmlFor="pw-output">Generated password</label>
          <div className="btn-row" style={{ alignItems: "stretch" }}>
            <input id="pw-output" className="input" readOnly value={password} style={{ fontFamily: "var(--font-mono)", flex: 1, fontSize: "1.05rem" }} />
            <button type="button" className="btn btn-secondary" onClick={copyPassword} disabled={!password}>Copy</button>
          </div>
          {copied && <span className="field-hint" style={{ color: "var(--olive)" }}>Copied to clipboard.</span>}
        </div>

        <div className="field">
          <label htmlFor="pw-length">Length: {length}</label>
          <input
            id="pw-length"
            type="range"
            min="6"
            max="48"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent)" }}
          />
        </div>

        <div className="grid-2">
          {Object.keys(SETS).map((key) => (
            <div className="checkbox-row" key={key}>
              <input type="checkbox" id={`pw-${key}`} checked={options[key]} onChange={() => toggleOption(key)} />
              <label htmlFor={`pw-${key}`} style={{ textTransform: "capitalize" }}>{key}</label>
            </div>
          ))}
        </div>

        <div className="btn-row" style={{ marginTop: 18, alignItems: "center" }}>
          <button type="button" className="btn btn-primary" onClick={regenerate}>Generate new</button>
          <span className={`badge ${strength.className}`}>{strength.label}</span>
        </div>

        <p className="field-hint" style={{ marginTop: 14 }}>
          Generated locally in your browser using the Web Crypto API — nothing is sent to a server.
        </p>
      </div>
    </ToolLayout>
  );
}
