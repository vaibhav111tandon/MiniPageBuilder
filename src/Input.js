import React from 'react'

function Input({x,y,text, draggable, uuid, onDragStartCurrent, onDClickElement}) {
    return (
        
            <input 
            onDoubleClick={(e) => onDClickElement(e,uuid,x,y,text)}
            onDragStart={(e) => onDragStartCurrent(e,uuid)}
            value={text} 
            draggable={draggable} 
            style={{
                position:'absolute',
                left:`${x}px`, 
                top:`${y}px`, 
                height: '40px',
                width: '250px', 
                transform: 'translate(-50%, -50%)',
                border: '1px solid rgba(0, 0, 0, 0.07)'
            }}/>
       
    )
}

export default Input
