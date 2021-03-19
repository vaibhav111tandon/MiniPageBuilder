import React from 'react'

function Label({x,y,text, draggable, uuid, fontSize, fontWeight, onDragStartCurrent, onDClickElement}) {
    return (
        <span
            onDoubleClick={(e) => onDClickElement(e,uuid,x,y,text,fontSize,fontWeight)}
            onDragStart={(e) => onDragStartCurrent(e,uuid)}
            draggable={draggable} 
            style={{
                position:'absolute',
                left:`${x}px`, 
                top:`${y}px`, 
                fontSize: fontSize+'px', 
                fontWeight: fontWeight, 
                transform: 'translate(-50%, -50%)', 
                borderWidth: '1px',
                cursor: 'grab'
                }}>
                
            {text}
        </span>
    )
}

export default Label
