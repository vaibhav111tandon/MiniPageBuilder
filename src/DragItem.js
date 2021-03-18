import React from 'react'

function DragItem({name, draggable, onDragStart}) {
    return (
        <div
            onDragStart={(e) => onDragStart(e,name)} 
            draggable={draggable} 
            style={{backgroundColor: '#FFFFFF', padding: '10px', margin: '10px 15px', fontFamily: 'Arial', fontWeight: '300', borderRadius: '4px'}}>
            {name}
        </div>
    )
} 

export default DragItem
