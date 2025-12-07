import React from 'react'

function ErrorMessage({ message, onClose }) {
    if (!message) return null

    return (
        <div className="error-message show">
            <span>{message}</span>
            <button className="error-close" onClick={onClose}>×</button>
        </div>
    )
}

export default ErrorMessage

