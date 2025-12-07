# LOGO Turtle Graphics

A web-based LOGO programming language interface for kids, featuring interactive turtle graphics built with React and Vite.

## Features

- **Turtle Graphics**: Visual programming with a dot that moves and draws on the canvas
- **LOGO Commands**: Full support for LOGO commands (FD, BK, RT, LT, PU, PD, CS, HOME, etc.)
- **Chat Interface**: Command history and input in a chat-like window
- **Quick Commands**: One-click buttons for common commands
- **Resizable Overlay**: Canvas overlay with turtle info and quick commands that scales with window size
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

### Basic Commands

- `FD 50` - Move forward 50 steps
- `BK 50` - Move backward 50 steps
- `RT 90` - Turn right 90 degrees
- `LT 90` - Turn left 90 degrees
- `PU` - Pen up (stop drawing)
- `PD` - Pen down (start drawing)
- `CS` - Clear screen
- `HOME` - Return to center

### Advanced Commands

- `REPEAT 4 [FD 50 RT 90]` - Repeat commands
- `SETXY 100 100` - Move to specific coordinates
- `SETH 45` - Set heading to 45 degrees
- `SETPC red` - Set pen color
- `SETPENSIZE 5` - Set pen size

## Project Structure

```
logo/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility classes (Turtle, LogoInterpreter)
│   ├── App.jsx         # Main app component
│   ├── App.css         # App styles
│   └── main.jsx        # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Technologies

- React 18
- Vite
- Canvas API for graphics
- CSS with responsive design

## License

MIT

