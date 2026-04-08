# Conceptly Calendar

A sleek, **React-based calendar application** featuring seasonal themes, dual-view scheduling, and full note-management capabilities.

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