import React, { forwardRef, useEffect, useState, useRef } from 'react'

const TurtleCanvas = forwardRef(({ turtle, onExecute }, ref) => {
    const [turtleInfo, setTurtleInfo] = useState({
        position: { x: 0, y: 0 },
        heading: 0,
        penStatus: 'Down'
    })

    const [overlayPosition, setOverlayPosition] = useState({ x: 15, y: 15 })
    const [overlaySize, setOverlaySize] = useState({ width: 300, height: 400 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [isMinimized, setIsMinimized] = useState(true)
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
    const [isDraggingButton, setIsDraggingButton] = useState(false)
    const [buttonDragStart, setButtonDragStart] = useState({ x: 0, y: 0 })
    const [buttonWasDragged, setButtonWasDragged] = useState(false)
    const [activeTab, setActiveTab] = useState('info') // 'info' or 'help'
    const overlayRef = useRef(null)
    const containerRef = useRef(null)
    const buttonRef = useRef(null)

    // Set initial button position to bottom right
    useEffect(() => {
        const updateButtonPosition = () => {
            if (containerRef.current) {
                const container = containerRef.current
                const containerRect = container.getBoundingClientRect()
                const buttonSize = 50 // Button is 50x50px
                const padding = 20 // Padding from edges
                const x = containerRect.width - buttonSize - padding
                const y = containerRect.height - buttonSize - padding
                setButtonPosition({ x, y })
            }
        }

        // Set position initially
        updateButtonPosition()

        // Update on window resize
        window.addEventListener('resize', updateButtonPosition)
        return () => window.removeEventListener('resize', updateButtonPosition)
    }, [])

    useEffect(() => {
        if (!turtle) return

        const interval = setInterval(() => {
            setTurtleInfo({
                position: turtle.getPosition(),
                heading: turtle.getHeading(),
                penStatus: turtle.getPenStatus()
            })
        }, 100)

        return () => clearInterval(interval)
    }, [turtle])

    // Monitor overlay size changes
    useEffect(() => {
        const overlay = overlayRef.current
        if (!overlay) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect
                setOverlaySize({ width, height })

                // Constrain position after resize
                const container = containerRef.current
                if (container) {
                    const containerRect = container.getBoundingClientRect()
                    const maxX = containerRect.width - width
                    const maxY = containerRect.height - height

                    setOverlayPosition(prev => ({
                        x: Math.max(0, Math.min(prev.x, maxX)),
                        y: Math.max(0, Math.min(prev.y, maxY))
                    }))
                }
            }
        })

        resizeObserver.observe(overlay)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    const handleMouseDown = (e) => {
        // Don't drag if clicking on buttons
        if (e.target.closest('.minimize-btn') || e.target.closest('.floating-restore-btn')) {
            return
        }
        // Only start dragging if clicking on the header area
        if (e.target.closest('.overlay-header')) {
            setIsDragging(true)
            setDragStart({
                x: e.clientX - overlayPosition.x,
                y: e.clientY - overlayPosition.y
            })
        }
    }

    const handleButtonMouseDown = (e) => {
        e.stopPropagation()
        setButtonWasDragged(false)
        setIsDraggingButton(true)
        setButtonDragStart({
            x: e.clientX - buttonPosition.x,
            y: e.clientY - buttonPosition.y
        })
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            const container = containerRef.current
            if (!container) return

            const containerRect = container.getBoundingClientRect()
            const newX = e.clientX - dragStart.x - containerRect.left
            const newY = e.clientY - dragStart.y - containerRect.top

            // Constrain to canvas bounds
            const maxX = containerRect.width - overlaySize.width
            const maxY = containerRect.height - overlaySize.height

            setOverlayPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            })
        }

        if (isDraggingButton) {
            setButtonWasDragged(true)
            const container = containerRef.current
            if (!container) return

            const containerRect = container.getBoundingClientRect()
            const button = buttonRef.current
            if (!button) return

            const buttonRect = button.getBoundingClientRect()
            const newX = e.clientX - buttonDragStart.x - containerRect.left
            const newY = e.clientY - buttonDragStart.y - containerRect.top

            // Constrain to canvas bounds
            const maxX = containerRect.width - buttonRect.width
            const maxY = containerRect.height - buttonRect.height

            setButtonPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        setIsDraggingButton(false)
    }

    useEffect(() => {
        if (isDragging || isDraggingButton) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, isDraggingButton, dragStart, buttonDragStart, overlayPosition, overlaySize, buttonPosition])


    const handleMinimize = () => {
        setIsMinimized(true)
        // Reset button position to bottom right
        if (containerRef.current) {
            const container = containerRef.current
            const containerRect = container.getBoundingClientRect()
            const buttonSize = 50 // Button is 50x50px
            const padding = 20 // Padding from edges
            const x = containerRect.width - buttonSize - padding
            const y = containerRect.height - buttonSize - padding
            setButtonPosition({ x, y })
        }
    }

    const handleRestore = (e) => {
        // Only restore if it was a click, not a drag
        if (!buttonWasDragged) {
            setIsMinimized(false)
        }
        setButtonWasDragged(false)
    }

    return (
        <div className="canvas-container" ref={containerRef}>
            <canvas 
                ref={ref}
                id="turtleCanvas" 
                width={800} 
                height={600}
            />
            {!isMinimized && (
                <div 
                    className="canvas-overlay"
                    ref={overlayRef}
                    style={{
                        left: `${overlayPosition.x}px`,
                        top: `${overlayPosition.y}px`,
                        width: `${overlaySize.width}px`,
                        height: `${overlaySize.height}px`
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <div className="overlay-header">
                        <span className="drag-handle">⋮⋮</span>
                        <div className="overlay-tabs">
                            <button 
                                className={`overlay-tab ${activeTab === 'info' ? 'active' : ''}`}
                                onClick={() => setActiveTab('info')}
                            >
                                Info
                            </button>
                            <button 
                                className={`overlay-tab ${activeTab === 'help' ? 'active' : ''}`}
                                onClick={() => setActiveTab('help')}
                            >
                                Help
                            </button>
                        </div>
                        <button 
                            className="minimize-btn"
                            onClick={handleMinimize}
                            title="Minimize"
                        >
                            −
                        </button>
                    </div>
                    <div className="overlay-content">
                        {activeTab === 'info' ? (
                            <div className="turtle-info">
                                <div>Position: <span>{turtleInfo.position.x}, {turtleInfo.position.y}</span></div>
                                <div>Heading: <span>{turtleInfo.heading}°</span></div>
                                <div>Pen: <span>{turtleInfo.penStatus}</span></div>
                            </div>
                        ) : (
                            <div className="help-content">
                                <div className="help-category">
                                    <strong>Movement:</strong>
                                    <ul>
                                        <li><code>FD n</code> - Forward n steps</li>
                                        <li><code>BK n</code> - Backward n steps</li>
                                        <li><code>RT n</code> - Right turn n degrees</li>
                                        <li><code>LT n</code> - Left turn n degrees</li>
                                        <li><code>HOME</code> - Return to center</li>
                                        <li><code>SETXY x y</code> - Move to coordinates</li>
                                        <li><code>SETH n</code> - Set heading to n degrees</li>
                                    </ul>
                                </div>
                                <div className="help-category">
                                    <strong>Pen Control:</strong>
                                    <ul>
                                        <li><code>PU</code> - Pen up (stop drawing)</li>
                                        <li><code>PD</code> - Pen down (start drawing)</li>
                                        <li><code>PE</code> - Pen erase mode</li>
                                        <li><code>PPT</code> - Pen paint mode</li>
                                        <li><code>SETPC color</code> - Set pen color</li>
                                        <li><code>SETPENSIZE n</code> - Set pen size</li>
                                    </ul>
                                </div>
                                <div className="help-category">
                                    <strong>Screen Control:</strong>
                                    <ul>
                                        <li><code>CS</code> - Clear screen</li>
                                        <li><code>HT</code> - Hide turtle</li>
                                        <li><code>ST</code> - Show turtle</li>
                                    </ul>
                                </div>
                                <div className="help-category">
                                    <strong>Control:</strong>
                                    <ul>
                                        <li><code>REPEAT n [commands]</code> - Repeat commands n times</li>
                                        <li><code>MAKE "var value</code> - Create variable</li>
                                        <li><code>PR text</code> - Print text</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isMinimized && (
                <button
                    ref={buttonRef}
                    className="floating-restore-btn"
                    style={{
                        left: `${buttonPosition.x}px`,
                        top: `${buttonPosition.y}px`
                    }}
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleRestore}
                    title="Click to restore, drag to move"
                >
                    🐢
                </button>
            )}
        </div>
    )
})

TurtleCanvas.displayName = 'TurtleCanvas'

export default TurtleCanvas

