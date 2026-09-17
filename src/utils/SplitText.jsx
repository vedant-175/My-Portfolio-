import React from 'react'

export function SplitText({ text, type = 'chars', className = '' }) {
  if (type === 'chars') {
    return (
      <span className={className} style={{ display: 'inline-block' }}>
        {text.split('').map((char, index) => (
          <span 
            key={index} 
            className="split-char" 
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </span>
    )
  }

  if (type === 'words') {
    return (
      <span className={className} style={{ display: 'inline-block' }}>
        {text.split(' ').map((word, index) => (
          <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            <span className="split-word" style={{ display: 'inline-block' }}>
              {word}
            </span>
            {index < text.split(' ').length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    )
  }

  return <span>{text}</span>
}
