import { NOTE_EMOJIS, NOTE_COLORS, fmtDate } from "../data/calendarData.js";

export function NoteEventModal({
  modalKey, modalTab, setModalTab,
  dark, accent, rgb,
  noteTxt, setNoteTxt, noteEmoji, setNoteEmoji, noteColor, setNoteColor,
  evtTitle, setEvtTitle, evtStart, setEvtStart, evtEnd, setEvtEnd,
  evtLocation, setEvtLocation, evtColor, setEvtColor,
  isEditNote,
  onSave, onDelete, onClose,
}) {
  const inputStyle = {
    background: dark ? "rgba(255,255,255,.05)" : "#f5f5f5",
    border: `1.5px solid rgba(${rgb},.25)`,
    color: dark ? "#ccc" : "#222",
    outline: "none",
    fontFamily: "'DM Sans',sans-serif",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,.55)", backdropFilter: "blur(8px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-anim w-full rounded-2xl p-6"
        style={{
          maxWidth: 380,
          background: dark ? "#13131f" : "#fff",
          boxShadow: `0 40px 100px rgba(0,0,0,.5), 0 0 0 1px rgba(${rgb},.2)`,
          color: dark ? "#e0e0e0" : "#1a1a1a",
        }}
      >
        {/* Tab selector */}
        <div className="flex rounded-xl overflow-hidden mb-4" style={{ border: `1px solid rgba(${rgb},.2)` }}>
          {["note", "event"].map(tab => (
            <button
              key={tab}
              onClick={() => setModalTab(tab)}
              className="flex-1 py-2 text-xs font-semibold capitalize transition-all"
              style={{
                background: modalTab === tab ? accent : "transparent",
                color: modalTab === tab ? "#fff" : (dark ? "#555" : "#aaa"),
              }}
            >{tab === "note" ? "📌 Note" : "📅 Event"}</button>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: `rgba(${rgb},.15)` }}>
            {modalTab === "note" ? noteEmoji : "📅"}
          </div>
          <div>
            <div className="font-semibold text-sm">{fmtDate(modalKey)}</div>
            <div className="text-xs" style={{ color: dark ? "#555" : "#aaa" }}>
              {isEditNote ? "Editing note" : modalTab === "note" ? "Add a note" : "Add an event"}
            </div>
          </div>
        </div>

        {/* ── Note fields ── */}
        {modalTab === "note" && (
          <>
            <textarea
              autoFocus
              className="w-full text-sm rounded-xl resize-none mb-3"
              rows={3}
              placeholder="What's happening?"
              value={noteTxt}
              onChange={e => setNoteTxt(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.metaKey || e.ctrlKey) && onSave()}
              style={{ ...inputStyle, border: `1.5px solid rgba(${rgb},.35)`, padding: "10px 12px" }}
            />
            {/* Emoji picker */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {NOTE_EMOJIS.map(e2 => (
                <button
                  key={e2}
                  onClick={() => setNoteEmoji(e2)}
                  className="text-base rounded-lg transition-all"
                  style={{
                    width: 32, height: 32,
                    background: noteEmoji === e2 ? `rgba(${rgb},.18)` : "transparent",
                    border: noteEmoji === e2 ? `1px solid rgba(${rgb},.4)` : "1px solid transparent",
                  }}
                >{e2}</button>
              ))}
            </div>
            {/* Color swatches */}
            <div className="flex gap-2 mb-5">
              {NOTE_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setNoteColor(c)}
                  className="rounded-full transition-all"
                  style={{
                    width: 20, height: 20, background: c,
                    boxShadow: noteColor === c ? `0 0 0 2px ${dark ? "#13131f" : "#fff"}, 0 0 0 4px ${c}` : "none",
                    transform: noteColor === c ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* ── Event fields ── */}
        {modalTab === "event" && (
          <div className="flex flex-col gap-2 mb-4">
            {[
              [evtTitle,    setEvtTitle,    "Event title",          "text"],
              [evtLocation, setEvtLocation, "Location (optional)",  "text"],
            ].map(([val, setter, ph], i) => (
              <input
                key={i}
                type="text"
                placeholder={ph}
                value={val}
                onChange={e => setter(e.target.value)}
                className="w-full text-sm rounded-xl px-3 py-2.5"
                style={inputStyle}
              />
            ))}
            <div className="flex gap-2">
              {[["Start", evtStart, setEvtStart], ["End", evtEnd, setEvtEnd]].map(([label, val, setter]) => (
                <div key={label} className="flex-1">
                  <div className="text-xs mb-1" style={{ color: dark ? "#555" : "#aaa" }}>{label}</div>
                  <input
                    type="time"
                    value={val}
                    onChange={e => setter(e.target.value)}
                    className="w-full text-sm rounded-xl px-3 py-2"
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
            {/* Event color */}
            <div className="flex gap-2 mt-1">
              {NOTE_COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setEvtColor(c)}
                  className="rounded-full transition-all"
                  style={{
                    width: 20, height: 20, background: c,
                    boxShadow: evtColor === c ? `0 0 0 2px ${dark ? "#13131f" : "#fff"}, 0 0 0 4px ${c}` : "none",
                    transform: evtColor === c ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: accent, boxShadow: `0 4px 16px rgba(${rgb},.4)` }}
          >Save</button>
          {isEditNote && (
            <button
              onClick={onDelete}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(239,68,68,.1)", color: "#EF4444" }}
            >Delete</button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)", color: dark ? "#777" : "#aaa" }}
          >Cancel</button>
        </div>
        <div className="text-xs text-center mt-3" style={{ color: dark ? "#444" : "#ccc" }}>⌘ Enter to save quickly</div>
      </div>
    </div>
  );
}