import React, { useState, useRef, useEffect } from 'react'
import { useTurtle } from './hooks/useTurtle'
import { LogoInterpreter } from './utils/logoInterpreter'
import ChatWindow from './components/ChatWindow'
import TurtleCanvas from './components/TurtleCanvas'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const turtle = useTurtle(canvasRef)
  const [interpreter] = useState(() => new LogoInterpreter())
  const [commandHistory, setCommandHistory] = useState([])
  const [error, setError] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [canvasWidth, setCanvasWidth] = useState(75) // Percentage
  const [isResizing, setIsResizing] = useState(false)
  const mainLayoutRef = useRef(null)

  // Initialize interpreter with turtle
  useEffect(() => {
    if (turtle) {
      interpreter.setTurtle(turtle)
    }
  }, [turtle, interpreter])

  const executeCommand = async (command) => {
    if (!command.trim() || isExecuting) return

    setIsExecuting(true)
    setError('')

    try {
      // Add to history
      const newHistory = [...commandHistory, command]
      setCommandHistory(newHistory)

      // Execute command
      await interpreter.execute(command)

      // Update turtle info is handled by the turtle hook
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setIsExecuting(false)
    }
  }

  const clearScreen = async () => {
    if (turtle) {
      await turtle.clearScreen()
    }
  }

  const clearCommandHistory = () => {
    setCommandHistory([])
  }

  const handleResizeStart = (e) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleResizeMove = (e) => {
      if (!isResizing || !mainLayoutRef.current) return

      const layoutRect = mainLayoutRef.current.getBoundingClientRect()
      const newX = e.clientX - layoutRect.left
      const newWidthPercent = (newX / layoutRect.width) * 100

      // Constrain between 30% and 85% for canvas
      const constrainedWidth = Math.max(30, Math.min(85, newWidthPercent))
      setCanvasWidth(constrainedWidth)
    }

    const handleResizeEnd = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove)
      document.addEventListener('mouseup', handleResizeEnd)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐢 LOGO Turtle</h1>
        <p className="subtitle">Type commands to make the turtle draw!</p>
      </header>

      <div className="main-layout" ref={mainLayoutRef}>
        <div 
          className="canvas-section"
          style={{ width: `${canvasWidth}%` }}
        >
          <TurtleCanvas 
            ref={canvasRef} 
            turtle={turtle}
            onExecute={executeCommand}
          />
        </div>
        
        <div 
          className="resize-handle"
          onMouseDown={handleResizeStart}
        />
        
        <div 
          className="sidebar"
          style={{ width: `${100 - canvasWidth}%` }}
        >
          <ChatWindow
            history={commandHistory}
            onExecute={executeCommand}
            onClear={clearScreen}
            onClearHistory={clearCommandHistory}
            disabled={isExecuting}
          />
        </div>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />
    </div>
  )
}

export default App

