import { MONTHS } from "../data/calendarData.js";
import { IconBtn } from "./ui.jsx";

export function ImagePanel({ imgSrc, imgOk, setImgOk, dark, data, year, month, onPrev, onNext, onUpload }) {
  return (
    <div
        className="img-panel-outer relative flex-shrink-0 overflow-hidden"
        style={{
            minHeight: 240,
        }}
    >
      <div className="img-panel-outer relative w-full h-full" style={{ minHeight: 240 }}>
        <img
            src={imgSrc}
            onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80"; 
            }}
            alt={data.season}
            onLoad={() => setImgOk(true)}
            className={`absolute inset-0 w-full h-full object-cover ${imgOk ? "img-reveal" : ""}`}
            style={{
                filter: dark ? "brightness(.65) saturate(.85)" : "brightness(.88)",
                transition: "filter .5s",
            }}
            />

        {/* Dark gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.6) 100%)",
        }} />

        <div
            className="frame-overlay"
            style={{
                position: "absolute",
                inset: "12px", 
                border: dark 
                ? "1px solid rgba(255, 255, 255, 0.15)" 
                : "1px solid rgba(255, 255, 255, 0.4)",
                pointerEvents: "none", 
                background: "transparent",
                boxShadow: "inset 0 0 100px rgba(0,0,0,0.2)",
            }}
        />

        {/* Season badge */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          fontSize: 10, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase",
          color: "rgba(255,255,255,.85)", background: "rgba(0,0,0,.3)", backdropFilter: "blur(10px)",
          padding: "4px 12px", borderRadius: 20,
        }}>{data.season}</div>

        {/* Year + month name */}
        <div style={{ position: "absolute", bottom: 24, left: 24, zIndex: 2 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "4px",
            color: "rgba(255,255,255,.7)", marginBottom: 4, textTransform: "uppercase",
          }}>{year}</div>
          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(32px,5.5vw,50px)",
            fontWeight: 700, color: "#fff", lineHeight: 1,
            textShadow: "0 6px 24px rgba(0,0,0,.5)",
          }}>{MONTHS[month]}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 6 }}>
            {month + 1} / {year}
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute top-4 right-4 flex gap-2" style={{ zIndex: 10 }}>
          <IconBtn onClick={onPrev} dark={dark}>‹</IconBtn>
          <IconBtn onClick={onNext} dark={dark}>›</IconBtn>
        </div>

        {/* Upload */}
        <label style={{
          position: "absolute", bottom: 16, right: 16, zIndex: 10,
          background: "rgba(0,0,0,.35)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,.2)", color: "#fff",
          borderRadius: 10, padding: "5px 10px", fontSize: 11, fontWeight: 600,
          cursor: "pointer", whiteSpace: "nowrap",
        }}>
          📷 Change
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={onUpload} />
        </label>
      </div>
    </div>
  );
}