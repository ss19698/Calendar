import { toKey } from "../data/calendarData.js";

export function WeekView({ 
  weekDays, 
  todayKey, 
  accent, 
  rgb, 
  dark, 
  notes, 
  events, 
  onDayClick, 
  onEventClick, 
  onPrev, 
  onNext 
}) {
  const START_HOUR = 8;
  const END_HOUR = 18; 
  const ROW_HEIGHT = 45; 
  const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => i + START_HOUR);

  const getEventStyle = (startTime, endTime, color) => {
    const [sH, sM] = startTime.split(":").map(Number);
    const [eH, eM] = endTime.split(":").map(Number);
    const startInMinutes = (sH - START_HOUR) * 60 + sM;
    const endInMinutes = (eH - START_HOUR) * 60 + eM;
    const duration = endInMinutes - startInMinutes;

    return {
      top: `${(startInMinutes / 60) * ROW_HEIGHT}px`,
      height: `${(duration / 60) * ROW_HEIGHT}px`,
      backgroundColor: color || "#818CF8",
    };
  };

  return (
    <div className="flex flex-col gap-2 cal-anim">
      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={{ color: accent, background: `rgba(${rgb},.08)` }}
        >← Prev</button>
        <span className="text-xs font-semibold" style={{ color: dark ? "#555" : "#bbb" }}>
          {weekDays[0].toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          {" – "}
          {weekDays[6].toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        <button
          onClick={onNext}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={{ color: accent, background: `rgba(${rgb},.08)` }}
        >Next →</button>
      </div>

      {/* Day header columns */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((d, i) => {
          const k      = toKey(d.getFullYear(), d.getMonth(), d.getDate());
          const isToday  = k === todayKey;
          const isWE     = d.getDay() === 0 || d.getDay() === 6;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-xs font-bold" style={{ color: isWE ? accent : (dark ? "#444" : "#bbb"), letterSpacing: "1px" }}>
                {["M","T","W","T","F","S","S"][i]}
              </div>
              <button
                onClick={() => onDayClick(d)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all hover:scale-110"
                style={{
                  background: isToday ? accent : "transparent",
                  color: isToday ? "#fff" : isWE ? accent : (dark ? "#ccc" : "#333"),
                  border: isToday ? "none" : `1.5px solid ${dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"}`,
                }}
              >{d.getDate()}</button>
            </div>
          );
        })}
      </div>

      {/* Time Grid Area */}
      <div className="rounded-xl overflow-y-auto mt-1 custom-scrollbar relative" style={{
        maxHeight: 250,
        background: dark ? "rgba(255,255,255,.015)" : "rgba(0,0,0,.018)",
        border: `1px solid ${dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.06)"}`,
      }}>
        
        {HOURS.map(h => (
          <div key={h} className="flex" style={{ height: `${ROW_HEIGHT}px`, borderBottom: `1px solid ${dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.04)"}` }}>
            <div className="text-[10px] py-2 px-2 flex-shrink-0 font-mono text-right" style={{ width: 42, color: dark ? "#3a3a50" : "#ccc" }}>
              {h}:00
            </div>
            {weekDays.map((d, i) => (
              <div 
                key={i} 
                onClick={() => onEventClick(d, h)} 
                className="flex-1 border-l hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-text"
                style={{ borderColor: dark ? "rgba(255,255,255,.025)" : "rgba(0,0,0,.03)" }}
              />
            ))}
          </div>
        ))}

        {/* Absolute Events Overlay */}
        <div className="absolute top-0 left-[42px] right-0 bottom-0 pointer-events-none">
          <div className="grid grid-cols-7 h-full">
            {weekDays.map((d, i) => {
              const k = toKey(d.getFullYear(), d.getMonth(), d.getDate());
              const dayEvts = events[k] || [];
              return (
                <div key={i} className="relative h-full">
                  {dayEvts.map((ev, ei) => (
                    <div
                      key={ei}
                      className="absolute left-0.5 right-0.5 rounded px-1.5 py-1 text-white shadow-sm pointer-events-auto cursor-pointer overflow-hidden z-10"
                      style={getEventStyle(ev.startTime, ev.endTime, ev.color)}
                    >
                      <div className="text-[9px] font-bold leading-tight truncate">{ev.title}</div>
                      <div className="text-[8px] opacity-80">{ev.startTime}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}