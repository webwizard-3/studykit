import "./AdSlot.css";

/**
 * Placeholder for a future ad unit. It renders an empty, clearly-labeled
 * block that reserves space so layout doesn't shift once real ads are
 * added — it never blocks or replaces real content, and the site is fully
 * usable with every <AdSlot /> deleted.
 *
 * To wire up a real provider later: replace the placeholder <div> below
 * with that provider's snippet, keyed by `slot`.
 */
export default function AdSlot({ slot = "default", variant = "banner" }) {
  return (
    <div className={`ad-slot ad-slot--${variant}`} data-ad-slot={slot} aria-hidden="true">
      <span className="ad-slot__label">Advertisement placeholder</span>
    </div>
  );
}
