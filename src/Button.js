import React from 'react'

function Button({x,y,text, draggable, uuid, fontSize, fontWeight, onDragStartCurrent, onDClickElement}) {
    return (
            <button 
                onDoubleClick={(e) => onDClickElement(e,uuid,x,y,text, fontSize, fontWeight)}
                onDragStart={(e) => onDragStartCurrent(e,uuid)}
                draggable={draggable} 
                style={{
                    position:'absolute',
                    left:`${x}px`,
                    top:`${y}px`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#0044C1',
                    fontSize: fontSize+'px', 
                    fontWeight: fontWeight,
                    height: '40px',
                    border: '1px solid #0044c1',
                    color: 'white',
                    cursor: 'grab'
                }}>
            {text}
            </button>
    )
}

export default Button
