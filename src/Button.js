import React from 'react'

function Button({x,y,text, draggable, uuid, onDragStartCurrent, onDClickElement}) {
    return (
            <button 
                onDoubleClick={(e) => onDClickElement(e,uuid,x,y,text)}
                onDragStart={(e) => onDragStartCurrent(e,uuid)}
                draggable={draggable} 
                style={{
                    position:'absolute',
                    left:`${x}px`,
                    top:`${y}px`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#0044C1',
                    height: '40px',
                    border: '1px solid #0044c1',
                    color: 'white',
                    cursor: 'pointer'
                }}>
            {text}
            </button>
    )
}

export default Button
