import React, { useState, useEffect, useRef } from 'react'

function ChatWindow({ history, onExecute, onClear, onClearHistory, disabled }) {
    const [command, setCommand] = useState('')
    const [theme, setTheme] = useState('dark') // 'dark' or 'light'
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    // Auto-focus input on mount and when not disabled
    useEffect(() => {
        if (!disabled) {
            inputRef.current?.focus()
        }
    }, [disabled])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (command.trim() && !disabled) {
            onExecute(command)
            setCommand('')
            // Refocus the input after command is submitted
            setTimeout(() => {
                inputRef.current?.focus()
            }, 0)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const handleHistoryClick = (cmd) => {
        setCommand(cmd)
    }

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        <div 
            className={`chat-window ${theme}-theme`}
        >
            <div className="chat-header">
                <h3>Command Chat</h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button 
                        className="theme-toggle-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleTheme();
                        }}
                        disabled={disabled}
                        title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    {history.length > 0 && (
                        <button 
                            className="clear-history-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (onClearHistory && !disabled) {
                                    onClearHistory();
                                }
                            }}
                            disabled={disabled}
                        title="Clear Command History"
                    >
                        🗑️ Clear
                    </button>
                    )}
                </div>
            </div>
            
            <div className={`chat-messages ${theme}-theme`}>
                {history.length === 0 ? (
                    <div className="chat-empty">
                        <p>🎉 Start typing commands to see them here! 🎉</p>
                        <p className="chat-hint">💡 Try: FD 50, RT 90</p>
                    </div>
                ) : (
                    history.map((cmd, index) => (
                        <div 
                            key={index}
                            className="chat-message"
                            onClick={() => handleHistoryClick(cmd)}
                        >
                            <span className="chat-prompt">&gt;</span>
                            <span className="chat-command">{cmd}</span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-form">
                <div className="chat-input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="🎨 Type a command like FD 50 and press Enter! 🚀"
                        disabled={disabled}
                        autoComplete="off"
                        autoFocus
                        className="chat-input"
                    />
                    <button 
                        type="submit" 
                        className="chat-send-btn"
                        disabled={disabled || !command.trim()}
                        title="Execute Command"
                    >
                        ▶
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatWindow

