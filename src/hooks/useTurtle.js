import { useEffect, useRef, useState } from 'react'
import { Turtle } from '../utils/turtle'

export function useTurtle(canvasRef) {
  const [turtle, setTurtle] = useState(null)
  const turtleInstanceRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    if (canvas && !turtleInstanceRef.current) {
      const turtleInstance = new Turtle(canvas)
      turtleInstanceRef.current = turtleInstance
      setTurtle(turtleInstance)
    }

    return () => {
      if (turtleInstanceRef.current) {
        turtleInstanceRef.current.stopBlinking()
        turtleInstanceRef.current = null
      }
    }
  }, [canvasRef])

  return turtle
}

