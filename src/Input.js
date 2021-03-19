import React from 'react'

function Input({x,y,text, draggable, uuid, fontSize, fontWeight, onDragStartCurrent, onDClickElement}) {
    return (
        
            <input 
            onDoubleClick={(e) => onDClickElement(e,uuid,x,y,text, fontSize, fontWeight)}
            onDragStart={(e) => onDragStartCurrent(e,uuid)}
            placeholder={text} 
            draggable={draggable} 
            style={{
                position:'absolute',
                left:`${x}px`, 
                top:`${y}px`, 
                height: '40px',
                width: '250px', 
                fontSize: fontSize+'px', 
                fontWeight: fontWeight,
                transform: 'translate(-50%, -50%)',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                cursor: 'grab'
            }}/>
       
    )
}

export default Input
