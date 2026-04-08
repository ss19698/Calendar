import { useState, useRef } from "react";
import {
  MONTHS, HOLIDAYS_MAP, toKey, parseKey, hexRgb, daysBetween, fmtDate,
  MONTH_DATA, getFirstDow, daysInMonth,
} from "./data/calendarData.js";
import { IconBtn, SmallBtn, NoteArea } from "./components/ui.jsx";
import { ImagePanel }      from "./components/ImagePanel.jsx";
import { MonthGrid }       from "./components/MonthsGrid.jsx";
import { WeekView }        from "./components/WeekView.jsx";
import { NoteEventModal }  from "./components/NoteEventModal.jsx";

export default function Calendar() {
  const today    = new Date();
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd,   setRangeEnd]   = useState(null);
  const [hovered,    setHovered]    = useState(null);

  const [notes,      setNotes]      = useState({});
  const [events,     setEvents]     = useState({});
  const [monthNotes, setMonthNotes] = useState({});
  const [customImgs, setCustomImgs] = useState({});

  const [dark,       setDark]       = useState(false);
  const [view,       setView]       = useState("month");
  const [animKey,    setAnimKey]    = useState(0);
  const [imgOk,      setImgOk]      = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [search,     setSearch]     = useState("");

  const [modalKey,    setModalKey]    = useState(null);
  const [modalTab,    setModalTab]    = useState("note");
  const [noteTxt,     setNoteTxt]     = useState("");
  const [noteEmoji,   setNoteEmoji]   = useState("📌");
  const [noteColor,   setNoteColor]   = useState("#F59E0B");
  const [evtTitle,    setEvtTitle]    = useState("");
  const [evtStart,    setEvtStart]    = useState("09:00");
  const [evtEnd,      setEvtEnd]      = useState("10:00");
  const [evtLocation, setEvtLocation] = useState("");
  const [evtColor,    setEvtColor]    = useState("#3B82F6");
  const [isEditNote,  setIsEditNote]  = useState(false);

  const mk    = `${year}-${month}`;
  const data    = MONTH_DATA[month];
  const accent  = data.accent;
  const rgb     = hexRgb(accent);
  const imgSrc  = customImgs[`${year}-${month}`] || data.img;

  function navigate(dir) {
    setImgOk(false);
    setAnimKey(k => k + 1);
    setMonth(m => {
      const nm = m + dir;
      if (nm < 0)  { setYear(y => y - 1); return 11; }
      if (nm > 11) { setYear(y => y + 1); return 0; }
      return nm;
    });
    setRangeStart(null); setRangeEnd(null); setHovered(null); setWeekOffset(0);
  }

  function goToday() {
    setImgOk(false);
    setAnimKey(k => k + 1);
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setWeekOffset(0);
  }

  function handleImgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCustomImgs(prev => ({ ...prev, [`${year}-${month}`]: URL.createObjectURL(file) }));
    setImgOk(false);
  }

  function clickDay(day) {
    const k = toKey(year, month, day);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(k); setRangeEnd(null);
    } else {
      const s = parseKey(rangeStart), c = parseKey(k);
      if (c.getTime() === s.getTime()) { 
        // Second click on same day opens modal (Mobile Friendly)
        openNoteFor(k);
        return; 
      }
      if (c < s) { setRangeEnd(rangeStart); setRangeStart(k); }
      else        { setRangeEnd(k); }
    }
  }

  function openNoteFor(k, editExisting = false) {
    setModalKey(k); setModalTab("note"); setIsEditNote(editExisting && !!notes[k]);
    setNoteTxt(notes[k]?.text  || "");
    setNoteEmoji(notes[k]?.emoji || "📌");
    setNoteColor(notes[k]?.color || "#F59E0B");
    setEvtTitle(""); setEvtStart("09:00"); setEvtEnd("10:00"); setEvtLocation(""); setEvtColor("#3B82F6");
  }

  function openEventFor(k) {
    setModalKey(k); setModalTab("event"); setIsEditNote(false);
    setNoteTxt(""); setNoteEmoji("📌"); setNoteColor("#F59E0B");
    setEvtTitle(""); setEvtStart("09:00"); setEvtEnd("10:00"); setEvtLocation(""); setEvtColor("#3B82F6");
  }

  function saveModal() {
    if (modalTab === "note") {
      if (noteTxt.trim())
        setNotes(prev => ({ ...prev, [modalKey]: { text: noteTxt.trim(), emoji: noteEmoji, color: noteColor } }));
    } else {
      if (evtTitle.trim())
        setEvents(prev => {
          const existing = prev[modalKey] || [];
          return { ...prev, [modalKey]: [...existing, { title: evtTitle.trim(), startTime: evtStart, endTime: evtEnd, location: evtLocation.trim(), color: evtColor }] };
        });
    }
    setModalKey(null);
  }

  function deleteNote(k) { setNotes(prev => { const n = { ...prev }; delete n[k]; return n; }); }
  function deleteEvent(k, idx) {
    setEvents(prev => {
      const arr = [...(prev[k] || [])]; arr.splice(idx, 1);
      const next = { ...prev };
      if (arr.length === 0) delete next[k]; else next[k] = arr;
      return next;
    });
  }

  function exportNotes() {
    let out = `Calendar Notes Export — ${new Date().toLocaleDateString("en-IN")}\n${"=".repeat(50)}\n\n`;
    if (monthNotes[mk]) out += `[Month note for ${MONTHS[month]} ${year}]\n${monthNotes[mk]}\n\n`;
    Object.entries(notes).sort(([a],[b])=>a.localeCompare(b)).forEach(([k,n]) => {
      out += `${fmtDate(k)} ${n.emoji} ${n.text}\n`;
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([out],{type:"text/plain"}));
    a.download = `calendar-notes-${year}-${String(month+1).padStart(2,"0")}.txt`;
    a.click();
  }

  function getWeekDays() {
    const fd  = getFirstDow(year, month);
    const ws  = new Date(year, month, 1 - fd);
    ws.setDate(ws.getDate() + weekOffset * 7);
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(ws); d.setDate(d.getDate() + i); return d; });
  }

  const monthHolidays = Object.entries(HOLIDAYS_MAP)
    .filter(([k]) => parseInt(k.split("-")[0]) - 1 === month)
    .map(([k, name]) => ({ day: parseInt(k.split("-")[1]), name }));

  const thisMonthNoteCount = Object.keys(notes)
    .filter(k => k.startsWith(`${year}-${String(month+1).padStart(2,"0")}`)).length;

  const filteredNotes = Object.entries(notes)
    .sort(([a],[b]) => a.localeCompare(b))
    .filter(([, n]) => !search || n.text.toLowerCase().includes(search.toLowerCase()));

  const rangeCount = rangeStart && rangeEnd ? daysBetween(rangeStart, rangeEnd) : null;

  return (
    <div
      className="min-h-screen flex items-start justify-center p-3 sm:p-5 transition-colors duration-500"
      style={{
        fontFamily: "'DM Sans',sans-serif",
        background: dark
          ? "linear-gradient(135deg,#0a0a14 0%,#131326 100%)"
          : "linear-gradient(135deg,#ececec 0%,#e0dff0 100%)",
      }}
    >
      <div
        className="w-full rounded-3xl overflow-hidden m-auto"
        style={{
          maxWidth: 980,
          background: dark ? "#0f0f1a" : "#ffffff",
          boxShadow: dark
            ? `0 40px 100px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.04)`
            : `0 30px 80px rgba(0,0,0,.14), 0 0 0 1px rgba(0,0,0,.04)`,
        }}
      >
        {/* Spiral decoration */}
        <div className="flex justify-center items-center gap-3 py-2.5 pointer-events-none"
          style={{ background: dark ? "#07070f" : "#d9d9d9" }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="rounded-full w-[17px] h-[13px]" style={{
              background: dark ? "#1e1e30" : "#bbb",
              border: `2px solid ${dark ? "#2a2a40" : "#aaa"}`,
              boxShadow: "inset 0 1px 3px rgba(0,0,0,.3)",
            }} />
          ))}
        </div>

        <div className="card-body flex flex-col md:flex-row" style={{ minHeight: 600 }}>
          <ImagePanel
            imgSrc={imgSrc} imgOk={imgOk} setImgOk={setImgOk}
            dark={dark} data={data} year={year} month={month}
            onPrev={() => navigate(-1)} onNext={() => navigate(1)}
            onUpload={handleImgUpload}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-4 md:p-6" style={{ color: dark ? "#e0e0e0" : "#1a1a1a" }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <SmallBtn onClick={goToday} accent={accent} rgb={rgb}>Today</SmallBtn>
                {thisMonthNoteCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `rgba(${rgb},.12)`, color: accent }}>
                    {thisMonthNoteCount} note{thisMonthNoteCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                  {["Month","Week"].map(v => (
                    <button key={v} onClick={() => setView(v.toLowerCase())}
                      className={`text-xs font-semibold px-3 py-1.5 transition-all ${view === v.toLowerCase() ? "text-white" : "text-gray-400"}`}
                      style={{ background: view === v.toLowerCase() ? accent : "transparent" }}
                    >{v}</button>
                  ))}
                </div>
                <button onClick={() => setDark(!dark)} className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-black/5 dark:bg-white/5">
                  {dark ? "☀️" : "🌙"}
                </button>
                <SmallBtn onClick={exportNotes} accent={accent} rgb={rgb}>Export</SmallBtn>
              </div>
            </div>

            {view === "month" ? (
              <MonthGrid
                year={year} month={month} todayKey={todayKey}
                accent={accent} rgb={rgb} dark={dark}
                notes={notes} events={events}
                rangeStart={rangeStart} rangeEnd={rangeEnd}
                hovered={hovered} setHovered={setHovered}
                onDayClick={clickDay}
                onDayDoubleClick={k => openNoteFor(k)}
                animKey={animKey}
              />
            ) : (
              <WeekView
                weekDays={getWeekDays()} todayKey={todayKey}
                accent={accent} rgb={rgb} dark={dark}
                notes={notes} events={events}
                onDayClick={d => openNoteFor(toKey(d.getFullYear(), d.getMonth(), d.getDate()))}
                onEventClick={d => openEventFor(toKey(d.getFullYear(), d.getMonth(), d.getDate()))}
                onPrev={() => setWeekOffset(o => o - 1)}
                onNext={() => setWeekOffset(o => o + 1)}
              />
            )}

            {rangeStart && (
              <div className="mt-4 flex flex-wrap items-center gap-2 animate-in slide-in-from-bottom-2">
                <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" style={{ color: accent }}>
                  📅 {fmtDate(rangeStart)} {rangeEnd && `→ ${fmtDate(rangeEnd)}`}
                </div>
                <button onClick={() => {setRangeStart(null); setRangeEnd(null)}} className="p-1.5 text-xs">✕</button>
                <button onClick={() => openNoteFor(rangeStart)} className="text-xs font-bold px-4 py-1.5 rounded-full text-white" style={{ background: accent }}>
                  {rangeEnd ? "+ Note Range" : "+ Add Note"}
                </button>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex flex-col gap-3 flex-1 overflow-hidden">
              <NoteArea
                value={monthNotes[mk] || ""}
                onChange={v => setMonthNotes(n => ({ ...n, [mk]: v }))}
                placeholder={`General notes for ${MONTHS[month]}…`}
                accent={accent} rgb={rgb} dark={dark}
              />

              <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                {filteredNotes.map(([k, n]) => (
                  <div key={k} className="group flex items-start gap-3 text-xs rounded-xl px-3 py-3 relative bg-black/[0.02] dark:bg-white/[0.03]"
                    style={{ borderLeft: `4px solid ${n.color || accent}` }}>
                    <span className="text-base">{n.emoji}</span>
                    <div className="flex-1 pr-16">
                      <div className="font-bold opacity-60">{fmtDate(k)}</div>
                      <div className="mt-0.5">{n.text}</div>
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openNoteFor(k, true)} className="p-2 bg-black/5 dark:bg-white/10 rounded-lg">✏️</button>
                      <button onClick={() => deleteNote(k)} className="p-2 bg-black/5 dark:bg-white/10 rounded-lg">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalKey && (
        <NoteEventModal
          modalKey={modalKey} modalTab={modalTab} setModalTab={setModalTab}
          dark={dark} accent={accent} rgb={rgb}
          noteTxt={noteTxt} setNoteTxt={setNoteTxt}
          noteEmoji={noteEmoji} setNoteEmoji={setNoteEmoji}
          noteColor={noteColor} setNoteColor={setNoteColor}
          evtTitle={evtTitle} setEvtTitle={setEvtTitle}
          evtStart={evtStart} setEvtStart={setEvtStart}
          evtEnd={evtEnd} setEvtEnd={setEvtEnd}
          evtLocation={evtLocation} setEvtLocation={setEvtLocation}
          evtColor={evtColor} setEvtColor={setEvtColor}
          isEditNote={isEditNote}
          onSave={saveModal}
          onDelete={() => { deleteNote(modalKey); setModalKey(null); }}
          onClose={() => setModalKey(null)}
        />
      )}
    </div>
  );
}