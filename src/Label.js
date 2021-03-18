import React from 'react'

function Label({x,y,text, draggable, uuid, onDragStartCurrent, onDClickElement}) {
    return (
        <span
            onDoubleClick={(e) => onDClickElement(e,uuid,x,y,text)}
            onDragStart={(e) => onDragStartCurrent(e,uuid)}
            draggable={draggable} 
            style={{position:'absolute', left:`${x}px`, top:`${y}px`, transform: 'translate(-50%, -50%)', borderWidth: '1px'}}>
                
            {text}
        </span>
    )
}

export default Label
