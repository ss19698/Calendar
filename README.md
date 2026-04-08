# Calendar

A sleek, **React-based calendar application** featuring seasonal themes, dual-view scheduling, and full note-management capabilities.

## Live Demo 🚀
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://calendar-indol-xi.vercel.app/)

## ✨ Key Features
### 🎨 Visuals & Customization
- Seasonal Themes: Automatically updates accent colors and default imagery based on the current month.
- Image Upload: Supports custom background images for each month via a local file picker.
- Dark/Light Mode: A fully integrated theme system with persistent state and smooth transitions.
- Responsive Design: Mobile-friendly layouts with custom scrollbars and touch-optimized interactions.

### 📝 Note & Event Tracking
- Dual Modal System: Create either a Note (with emoji and color selection) or an Event (with time and location).
- General Monthly Notes: A dedicated text area for high-level monthly goals or scratchpad info.
- Search Functionality: Real-time filtering of pinned notes to quickly find past or future entries.
- Range Selection: Visual date-range selection with a duration counter (e.g., "5d").

### 🛠️ Advanced Tools
- Week View: Switch to a time-blocked week view for granular hourly scheduling.
- Holiday Integration: Automatic detection and display of fixed holidays.
- Data Export: Generate and download a .txt report of all notes, events, and monthly summaries.

## 🛠️ Tech Stack
- React
- Vite
- CSS

## 🚀 Installation

```bash
# Clone the repo
git clone [https://github.com/user/conceptly-calendar.git](https://github.com/user/conceptly-calendar.git)

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🛠 Project Structure
```
src/
├── data/
│   └── calendarData.js      # Core logic, constants, and holiday maps
├── components/
│   ├── ui.jsx               # Reusable buttons and input components
│   ├── ImagePanel.jsx       # Side panel for seasonal images & navigation
│   ├── MonthsGrid.jsx       # Main 7-column calendar grid
│   ├── WeekView.jsx         # Hourly time-blocking view
│   └── NoteEventModal.jsx   # Create/Edit form for notes and events
└── Calendar.jsx             # Main state controller and layout
```
## ⌨️ Shortcuts & Interaction

| Action | Result |
| :--- | :--- |
| **Double Click Day** | Quickly open Note modal |
| **Single Click x2** | Select a range of dates |
| **Ctrl + Enter** | Save Note/Event inside modal |
| **Today Button** | Snap back to current month/week |

## Keyboard Shortcuts
- Ctrl/Cmd + Enter: Quickly save a note or event while the modal is open.
- Esc: Close any open modal or clear current selection.
- Double Click: Double-click any date in the month grid to instantly open the "Add Note" modal.

## 📖 Usage Tips
- Today Button: Use the "Today" button to instantly snap back to the current date and reset navigation offsets.
- Search: Use the search bar in the toolbar to filter your list of pinned notes in real-time.
- Persistence: The calendar is designed to be easily extended with localStorage or a backend API to keep your notes saved across sessions.