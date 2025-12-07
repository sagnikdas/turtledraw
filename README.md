# 🐢 LOGO Turtle Graphics

A modern, interactive web-based LOGO programming language interface featuring animated turtle graphics. Built with React and Vite for an engaging coding experience.

![LOGO Turtle Graphics Interface](./screenshots/main-interface.png)

## ✨ Features

### 🎨 Interactive Canvas
- **Animated Turtle Graphics**: Smooth animations as the turtle moves and draws
- **Visual Feedback**: Real-time turtle position and heading display
- **Resizable Panels**: Drag the divider to adjust canvas and chat window sizes
- **Floating Info Panel**: Minimizable overlay showing turtle status and command help

![Canvas with Drawing](./screenshots/canvas-drawing.png)

### 💬 Command Chat Interface
- **Code Editor Style**: Dark and light theme support for comfortable coding
- **Command History**: All executed commands displayed in a code-like format
- **Auto-focus Input**: Seamless command entry with automatic focus management
- **Theme Toggle**: Switch between dark and light themes with one click
- **Clear History**: Easy command history management

![Command Chat - Dark Theme](./screenshots/chat-dark-theme.png)
![Command Chat - Light Theme](./screenshots/chat-light-theme.png)

### 📚 Interactive Help System
- **Floating Help Panel**: Accessible via the turtle button on canvas
- **Tabbed Interface**: Switch between Turtle Info and Help documentation
- **Complete Command Reference**: All available commands organized by category
- **Draggable & Resizable**: Customize the help panel position and size

![Help Panel](./screenshots/help-panel.png)

### 🎯 Key Capabilities
- **Full LOGO Command Support**: Movement, pen control, screen management, and more
- **Smooth Animations**: Visual feedback for all turtle movements
- **Error Handling**: Clear error messages for invalid commands
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd logo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Building for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Basic Commands

#### Movement Commands
```
FD 50          # Move forward 50 steps
BK 50          # Move backward 50 steps
RT 90          # Turn right 90 degrees
LT 90          # Turn left 90 degrees
HOME           # Return to center position
SETXY 100 100  # Move to coordinates (100, 100)
SETH 45        # Set heading to 45 degrees
```

#### Pen Control
```
PU             # Pen up (stop drawing)
PD             # Pen down (start drawing)
PE             # Pen erase mode
PPT            # Pen paint mode
SETPC red      # Set pen color (black, white, red, green, blue, yellow, cyan, magenta)
SETPENSIZE 5   # Set pen size
```

#### Screen Control
```
CS             # Clear screen
HT             # Hide turtle
ST             # Show turtle
```

### Advanced Commands

#### Loops and Control
```
REPEAT 4 [FD 50 RT 90]    # Repeat commands 4 times
MAKE "size 50             # Create variable
PR Hello World            # Print text
```

### Example: Drawing a Square

```
FD 50
RT 90
FD 50
RT 90
FD 50
RT 90
FD 50
RT 90
```

Or using REPEAT:
```
REPEAT 4 [FD 50 RT 90]
```

![Square Drawing Example](./screenshots/square-example.png)

## 🎨 Interface Overview

### Main Layout

The interface consists of three main areas:

1. **Header**: Application title and subtitle
2. **Canvas Section**: Drawing area with turtle visualization
3. **Command Chat**: Command input and history panel

![Main Layout](./screenshots/layout-overview.png)

### Resizable Panels

Drag the vertical divider between the canvas and chat window to adjust their relative sizes. The layout adapts smoothly to your preference.

![Resizable Panels](./screenshots/resizable-panels.png)

### Floating Info Panel

Click the floating turtle button (🐢) on the canvas to open the info panel. It features:

- **Info Tab**: Real-time turtle position, heading, and pen status
- **Help Tab**: Complete command reference organized by category

The panel can be:
- **Dragged** by clicking and holding the header
- **Resized** by dragging the bottom-right corner
- **Minimized** using the minimize button

![Floating Panel - Info](./screenshots/floating-panel-info.png)
![Floating Panel - Help](./screenshots/floating-panel-help.png)

### Command Chat Features

#### Dark Theme (Default)
- Dark code editor background (#1e1e1e)
- Bright syntax highlighting
- Easy on the eyes for extended coding sessions

#### Light Theme
- Clean white background
- High contrast for readability
- Perfect for well-lit environments

#### Command History
- All executed commands are displayed
- Click any command to reuse it
- Commands shown in code-style format with syntax highlighting

![Command History](./screenshots/command-history.png)

## 📁 Project Structure

```
logo/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx      # Command chat interface
│   │   ├── TurtleCanvas.jsx    # Canvas with turtle visualization
│   │   └── ErrorMessage.jsx   # Error display component
│   ├── hooks/
│   │   └── useTurtle.js       # Custom hook for turtle management
│   ├── utils/
│   │   ├── turtle.js           # Turtle graphics engine
│   │   └── logoInterpreter.js # LOGO command interpreter
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   └── main.jsx               # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies

- **React 18**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **Canvas API**: High-performance graphics rendering
- **CSS3**: Modern styling with flexbox and responsive design

## 🎯 Command Reference

### Movement Commands

| Command | Alias | Description | Example |
|---------|-------|-------------|---------|
| `FD n` | `FORWARD` | Move forward n steps | `FD 50` |
| `BK n` | `BACK`, `BACKWARD` | Move backward n steps | `BK 50` |
| `RT n` | `RIGHT` | Turn right n degrees | `RT 90` |
| `LT n` | `LEFT` | Turn left n degrees | `LT 90` |
| `HOME` | - | Return to center | `HOME` |
| `SETXY x y` | - | Move to coordinates | `SETXY 100 100` |
| `SETH n` | `SETHEADING` | Set heading to n degrees | `SETH 45` |

### Pen Control Commands

| Command | Alias | Description | Example |
|---------|-------|-------------|---------|
| `PU` | `PENUP` | Pen up (stop drawing) | `PU` |
| `PD` | `PENDOWN` | Pen down (start drawing) | `PD` |
| `PE` | `PENERASE` | Pen erase mode | `PE` |
| `PPT` | `PENPAINT` | Pen paint mode | `PPT` |
| `SETPC color` | `SETPENCOLOR` | Set pen color | `SETPC red` |
| `SETPENSIZE n` | `SETSW` | Set pen size | `SETPENSIZE 5` |

### Screen Control Commands

| Command | Alias | Description | Example |
|---------|-------|-------------|---------|
| `CS` | `CLEARSCREEN` | Clear screen | `CS` |
| `HT` | `HIDETURTLE` | Hide turtle | `HT` |
| `ST` | `SHOWTURTLE` | Show turtle | `ST` |

### Control Commands

| Command | Description | Example |
|---------|-------------|---------|
| `REPEAT n [commands]` | Repeat commands n times | `REPEAT 4 [FD 50 RT 90]` |
| `MAKE "var value` | Create variable | `MAKE "size 50` |
| `PR text` | `PRINT` | Print text | `PR Hello` |

## 💡 Tips & Tricks

1. **Quick Command Reuse**: Click any command in the history to reuse it
2. **Theme Switching**: Use the sun/moon button to toggle between themes
3. **Panel Resizing**: Drag the divider to customize your workspace
4. **Help Access**: Click the floating turtle button for quick command reference
5. **Smooth Animations**: All movements are animated for better visualization

## 🐛 Troubleshooting

### Commands Not Executing
- Ensure commands are typed correctly (case-insensitive)
- Check for syntax errors in complex commands
- Verify command parameters are valid numbers

### Canvas Not Displaying
- Check browser console for errors
- Ensure canvas element is properly initialized
- Try refreshing the page

### Performance Issues
- Reduce animation complexity for large drawings
- Clear screen periodically for complex patterns
- Use browser's developer tools to monitor performance

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Happy Coding! 🐢✨**
