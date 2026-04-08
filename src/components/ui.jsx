// ── IconBtn ───────────────────────────────────────────────────────────────────
export function IconBtn({ onClick, dark, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full text-xl font-light transition-all hover:scale-110 active:scale-95 ${className}`}
      style={{
        width: 34, height: 34,
        background: dark ? "rgba(255,255,255,.06)" : "rgba(58, 56, 56, 0.78)",
        border: dark ? "1px solid rgba(255,255,255,.09)" : "1px solid rgba(0,0,0,.09)",
        color: dark ? "#777" : "#bbb3b3",
      }}
    >{children}</button>
  );
}

// ── SmallBtn ──────────────────────────────────────────────────────────────────
export function SmallBtn({ onClick, accent, rgb, children }) {
  return (
    <button
      onClick={onClick}
      className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
      style={{
        background: `rgba(${rgb},.1)`, color: accent,
        border: `1px solid rgba(${rgb},.2)`,
      }}
    >{children}</button>
  );
}

// ── NoteArea ──────────────────────────────────────────────────────────────────
export function NoteArea({ value, onChange, placeholder, accent, rgb, dark }) {
  return (
    <textarea
      className="w-full text-sm rounded-xl resize-none transition-all"
      rows={2}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        background: dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.02)",
        border: `1px solid ${dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)"}`,
        color: dark ? "#ccc" : "#333",
        padding: "10px 12px", outline: "none",
        fontFamily: "'DM Sans',sans-serif",
      }}
      onFocus={e => (e.target.style.borderColor = `rgba(${rgb},.4)`)}
      onBlur={e => (e.target.style.borderColor = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)")}
    />
  );
}