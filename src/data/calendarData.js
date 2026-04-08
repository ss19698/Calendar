export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
export const DAYS_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
export const DAYS_LONG  = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export const MONTH_DATA = [
  { img:"https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=900&q=80", accent:"#3B82F6", season:"Winter" },
  { img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80", accent:"#818CF8", season:"Winter" },
  { img:"https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80", accent:"#EC4899", season:"Spring" },
  { img:"https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=900&q=80", accent:"#10B981", season:"Spring" },
  { img:"https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80", accent:"#84CC16", season:"Spring" },
  { img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80", accent:"#F59E0B", season:"Summer" },
  { img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80", accent:"#EF4444", season:"Summer" },
  { img:"https://images.unsplash.com/photo-1593558628703-535b2556320b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN1bW1lcnxlbnwwfHwwfHx8MA%3D%3D", accent:"#F97316", season:"Summer" },
  { img:"https://plus.unsplash.com/premium_photo-1667126444822-94fb21279436?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXV0dW1ufGVufDB8fDB8fHww", accent:"#D97706", season:"Autumn" },
  { img:"https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=900&q=80", accent:"#B45309", season:"Autumn" },
  { img:"https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=900&q=80", accent:"#64748B", season:"Autumn" },
  { img:"https://images.unsplash.com/photo-1431036101494-66a36de47def?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdpbnRlcnxlbnwwfHwwfHx8MA%3D%3D", accent:"#0EA5E9", season:"Winter" },
];

export const HOLIDAYS_MAP = {
  // January
  "01-01": "New Year's Day",
  "01-14": "Makar Sankranti / Pongal",
  "01-23": "Netaji Subhash Chandra Bose Jayanti",
  "01-26": "Republic Day",

  // February
  "02-14": "Valentine's Day",

  // March & April
  "03-08": "International Women's Day",
  "04-14": "Dr. Ambedkar Jayanti / Baisakhi",

  // May & June
  "05-01": "May Day / Maharashtra Day / Gujarat Day",
  "06-05": "World Environment Day",
  "06-21": "International Yoga Day",

  // August
  "08-15": "Independence Day",

  // September
  "09-05": "Teachers' Day",

  // October
  "10-02": "Gandhi Jayanti",
  "10-31": "National Unity Day (Sardar Patel Jayanti)",

  // November
  "11-01": "Karnataka Rajyotsava / Haryana Day",
  "11-14": "Children's Day",

  // December
  "12-04": "Indian Navy Day",
  "12-25": "Christmas",
  "12-26": "Boxing Day"
};

export const NOTE_EMOJIS  = ["📌","⭐","🔥","💡","🎯","📅","🏖️","✈️","🎉","💼","❤️","🌿","🎂","⚡","🌅"];
export const NOTE_COLORS  = ["#EF4444","#F97316","#F59E0B","#10B981","#3B82F6","#8B5CF6","#EC4899","#14B8A6"];

export function toKey(y, m, d)  { return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }
export function parseKey(k)     { const [y,m,d]=k.split("-").map(Number); return new Date(y,m-1,d); }
export function daysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }
export function getFirstDow(y,m){ const d=new Date(y,m,1).getDay(); return d===0?6:d-1; }
export function hexRgb(hex)     { return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`; }
export function daysBetween(a,b){ return Math.round(Math.abs(parseKey(b)-parseKey(a))/86400000)+1; }
export function fmtDate(k) {
  return parseKey(k).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
}
export function getHoliday(month, day) {
  return HOLIDAYS_MAP[`${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`] || null;
}