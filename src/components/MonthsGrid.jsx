import { DAYS_SHORT, DAYS_LONG, MONTHS, parseKey, toKey, daysInMonth, getFirstDow, getHoliday } from "../data/calendarData.js";

export function MonthGrid({
  year, month, todayKey, accent, rgb, dark,
  notes, events,
  rangeStart, rangeEnd, hovered, setHovered,
  onDayClick, onDayDoubleClick,
  animKey,
}) {
  const dim   = daysInMonth(year, month);
  const fd    = getFirstDow(year, month);
  const cells = [...Array(fd).fill(null), ...Array.from({ length: dim }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  function stateOf(day) {
    const k    = toKey(year, month, day);
    const date = parseKey(k);
    const dow  = new Date(year, month, day).getDay();
    const isStart   = rangeStart === k;
    const isEnd     = rangeEnd   === k;
    const isToday   = k === todayKey;
    const isWeekend = dow === 0 || dow === 6;
    const holiday   = getHoliday(month, day);
    const hasNote   = !!notes[k];
    const hasEvent  = !!(events[k]?.length);

    let inRange = false, hoverEdge = false;
    if (rangeStart && rangeEnd) {
      const s = parseKey(rangeStart), e = parseKey(rangeEnd);
      inRange = date > s && date < e;
    } else if (rangeStart && !rangeEnd && hovered) {
      const hk    = toKey(year, month, hovered);
      const hDate = parseKey(hk);
      const s     = parseKey(rangeStart);
      if (hDate > s) inRange = date > s && date < hDate;
      else           inRange = date < s && date > hDate;
      if (hk === k) hoverEdge = true;
    }
    return { k, isStart, isEnd, isToday, isWeekend, holiday, hasNote, hasEvent, inRange, hoverEdge };
  }

  return (
    <div key={animKey} className="cal-anim">
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d, i) => (
          <div key={d} className="text-center text-xs font-bold py-1" style={{
            letterSpacing: "1px",
            color: i >= 5 ? accent : (dark ? "#444" : "#bbb"),
          }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e${idx}`} />;
          const { k, isStart, isEnd, isToday, isWeekend, holiday, hasNote, hasEvent, inRange, hoverEdge } = stateOf(day);
          const isEdge     = isStart || isEnd || hoverEdge;
          const col        = idx % 7;
          const firstInRow = col === 0;
          const lastInRow  = col === 6;

          return (
            <div
              key={day}
              className="relative flex flex-col items-center"
              onMouseEnter={() => !rangeEnd && rangeStart && setHovered(day)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Range fill strip */}
              {inRange && !isEdge && (
                <div className="absolute" style={{
                  top: 3, bottom: 3,
                  left: firstInRow ? "50%" : 0,
                  right: lastInRow  ? "50%" : 0,
                  background: `rgba(${rgb},.14)`,
                  borderRadius: firstInRow ? "8px 0 0 8px" : lastInRow ? "0 8px 8px 0" : 0,
                }} />
              )}
              {isStart && (rangeEnd || hovered) && !lastInRow && (
                <div className="absolute" style={{ top: 3, bottom: 3, left: "50%", right: 0, background: `rgba(${rgb},.14)` }} />
              )}
              {(isEnd || hoverEdge) && rangeStart && rangeStart !== k && !firstInRow && (
                <div className="absolute" style={{ top: 3, bottom: 3, left: 0, right: "50%", background: `rgba(${rgb},.14)` }} />
              )}

              {/* Day circle */}
              <button
                className="day-btn relative z-10 flex items-center justify-center rounded-full text-sm"
                style={{
                  width: 34, height: 34,
                  background: isEdge ? accent : isToday ? `rgba(${rgb},.15)` : "transparent",
                  border: isToday && !isEdge ? `2px solid ${accent}` : isEdge ? "none" : "2px solid transparent",
                  color: isEdge  ? "#fff"
                       : isToday ? accent
                       : holiday ? accent
                       : isWeekend ? (dark ? `rgba(${rgb},.95)` : accent)
                       : (dark ? "#d4d4d4" : "#1a1a1a"),
                  fontWeight: isEdge || isToday ? 700 : isWeekend ? 600 : 400,
                  boxShadow: isEdge ? `0 4px 16px rgba(${rgb},.45)` : "none",
                }}
                onClick={() => onDayClick(day)}
                onDoubleClick={() => onDayDoubleClick(k)}
                title={holiday
                  ? `🎉 ${holiday}`
                  : `${DAYS_LONG[(new Date(year, month, day).getDay() + 6) % 7]}, ${day} ${MONTHS[month]}`}
              >{day}</button>

              {/* Indicator dots */}
              <div className="flex items-center gap-0.5 mt-0.5" style={{ height: 5 }}>
                {hasNote  && <div className="rounded-full notedot" style={{ width: 4, height: 4, background: notes[k]?.color || accent }} />}
                {hasEvent && <div className="rounded-full notedot" style={{ width: 4, height: 4, background: "#818CF8" }} />}
                {holiday  && <div className="rounded-full" style={{ width: 4, height: 4, background: `rgba(${rgb},.45)` }} title={holiday} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}