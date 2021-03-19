import './App.css';
import DragItem from './DragItem';
import { useState, useEffect } from 'react';
import Label from './Label';
import Input from './Input';
import Button from './Button';

function App() {

  const [structure, setStructure] = useState([]);
  const [currentDragElement, setCurrentDragElement] = useState();
  const [text, setText] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [fontSize, setFontSize] = useState(15);
  const [fontWeight, setFontWeight] = useState(300);
  const [dragZoneSelectedElement, setDragZoneSelectedElement] = useState('');

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [currElementX, setCurrElementX] = useState(0);
  const [currElementY, setCurrElementY] = useState(0);
  const [currElementId, setCurrElementId] = useState();
  const [currElementText, setCurrElementText] = useState();
  const [currElementFontSize, setCurrElementFontSize] = useState();
  const [currElementFontWeight, setCurrElementFontWeight] = useState();
  
  const [currDragArea,setCurrDragArea] = useState(0);

  useEffect(() => {
    
    return () => {
      
    }
  }, [])

  const onDragStartCurrent = (event,uuid) => {
    structure.forEach((e) => {
      if(e.id === uuid){
        setCurrDragArea(1);
        setCurrElementX(e.x);
        setCurrElementY(e.y);
        setCurrElementId(e.id);
      }
    })
    
  }

  const onDClickElement = (e,uuid,x,y,text,fontSize,fontWeight) => {
    setCurrElementX(x);
    setCurrElementY(y);
    setCurrElementFontSize(fontSize);
    setCurrElementFontWeight(fontWeight);
    setCurrElementText(text);
    setCurrElementId(uuid);
    setUpdateModalVisible(true);
  }

  // Render method to render the elements dropped in the Editor

  const RenderEditor = () => {
  
    return (
      <>
        {
          structure.map(element => {
            
            if(element.elementName === 'Label'){
              return (<Label onDClickElement={onDClickElement} key={element.id} uuid={element.id}  x={element.x} y={element.y} text={element.text} draggable="true" fontSize={element.fontSize} fontWeight={element.fontWeight} onDragStartCurrent={onDragStartCurrent}/>)
            }
            if(element.elementName === 'Input'){
              return (<Input onDClickElement={onDClickElement} key={element.id} uuid={element.id} x={element.x} y={element.y} text={element.text} draggable="true" fontSize={element.fontSize} fontWeight={element.fontWeight} onDragStartCurrent={onDragStartCurrent}/>)
            }
            if(element.elementName === 'Button'){
              return (<Button onDClickElement={onDClickElement} key={element.id} uuid={element.id} x={element.x} y={element.y} text={element.text} draggable="true" fontSize={element.fontSize} fontWeight={element.fontWeight} onDragStartCurrent={onDragStartCurrent}/>)
            }
          
          })
        }
      </>
    )

  }

  // Modal methods handling open and closing states

  const onModalClose = () => {
    setModalVisible(false);
  }

  const onModalOpen = () => {
    setModalVisible(true);
  }

  // Drag and Drop api methods

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const onDragStart = (event, name) => {
    event.dataTransfer.setData("name_stub",name);
    setDragZoneSelectedElement(name);
  }

  // Function gets called on moving the dropped element in the editor

  const completeStructureChange = async (x,y, event) => {
    let newArr = await structure.map(e => {
      if(e.id === currElementId){
        e.x = event.clientX;
        e.y = event.clientY;
      }
    })
  }

  const onDrop = async (event) => {
    
    // Checking if the element is already present in the editor or not
    
    if(currElementId > 1000){
      await completeStructureChange(currElementX, currElementY, event).then(() => setCurrElementId(0));
    }else{
      await setCurrentDragElement(event.dataTransfer.getData("name_stub"));
      await setX(event.clientX);
      await setY(event.clientY);
      await onModalOpen();
    }

  }

  const createElement = async (elementName) => {
    await setStructure([...structure, {elementName, x, y, text, fontSize, fontWeight, id:Math.floor(Math.random()*9999999)}]);  
  }

  // Saving the element

  const saveChange = async () => {
    
    await createElement(currentDragElement);
    await onModalClose();
  }

  // Updating the element

  const updateCurrentElement = async () => {
    let arr = await structure.map(e => {
      if(e.id === currElementId){
        e.x = currElementX;
        e.y = currElementY;
        e.text = currElementText;
        e.fontSize = currElementFontSize;
        e.fontWeight = currElementFontWeight;
      }
    })
  }

  const updateElement = async () => {
    await updateCurrentElement();
    await setUpdateModalVisible(false);
  }

  // Deleting the element

  const deleteCurrElement =async () => {
    
    let arr = await structure.filter(e => {
      if(e.id !== currElementId){
        return e;
      }
    });
    await setStructure([...arr]);
    await setUpdateModalVisible(false);
  }

  const deleteElement = async () => {
    await deleteCurrElement()
  }

  // Handling Ctrl + S and Delete button functionality when the update modal is visible

  const handleKeyDown = (e) => {
    e.preventDefault();
    if((e.ctrlKey || e.metaKey) && String.fromCharCode(e.which).toLowerCase() === 's'){
      if(updateModalVisible){
          updateElement();       
      }
    }
    if(e.key === 'Delete'){
      if(updateModalVisible){
          deleteElement();      
      }
    }
  }

  return (
    <div className="App" onClick={(e) => {
        if(e.target === document.getElementsByClassName('App__dropzone')[0] || e.target === document.getElementsByClassName('App__dragzone')[0]){
          setModalVisible(false); 
          setUpdateModalVisible(false);
        }}}>
      
      {/* Modal appears after dropping the element in the dropzone */}
      
      <div className="modal" style={{ display: modalVisible ? 'block':'none'}}>
        <p className="modal__header">Edit {dragZoneSelectedElement}</p>
        <hr style={{border: 'solid 1px #000', opacity: '0.07'}}/>
        <br/>
        <span className="modal__label">Text</span><br/>
        <input className="modal__input" type="text" onChange={(e)=>setText(e.target.value)} value={text}/><br/>
        <span className="modal__label">X</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setX(e.target.value)} value={x}/><br/>
        <span className="modal__label">Y</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setY(e.target.value)} value={y}/><br/>
        <span className="modal__label">Font Size</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setFontSize(e.target.value)} value={fontSize}/><br/>
        <span className="modal__label">Font Weight</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setFontWeight(e.target.value)} value={fontWeight}/><br/>
        <button className="modal__savebtn" onClick={saveChange}>Save Changes</button>
      </div>

        {/* Modal appears after double-clicking an element which is already dropped */}

      <div className="modal" onKeyDown={(e) => handleKeyDown(e)} style={{ display: updateModalVisible ? 'block':'none'}}>
        <p className="modal__header">Edit Label</p>
        <hr style={{border: 'solid 1px #000', opacity: '0.07'}}/>
        <br/>
        <span className="modal__label">Text</span><br/>
        <input className="modal__input" type="text" onChange={(e)=>setCurrElementText(e.target.value)} value={currElementText}/><br/>
        <span className="modal__label">X</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setCurrElementX(e.target.value)} value={currElementX}/><br/>
        <span className="modal__label">Y</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setCurrElementY(e.target.value)} value={currElementY}/><br/>
        <span className="modal__label">Font Size</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setCurrElementFontSize(e.target.value)} value={currElementFontSize}/><br/>
        <span className="modal__label">Font Weight</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setCurrElementFontWeight(e.target.value)} value={currElementFontWeight}/><br/>
        <button className="modal__savebtn" onClick={updateElement}>Update Changes</button>
        <button className="modal__savebtn" onClick={deleteElement}>Delete</button>
      </div>


      <div 
          className="App__dropzone"
          id="editor"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e)}>
            {
              <RenderEditor/>
            }
      </div>

      <div className="App__dragzone">
        <p className="App__dragzone__header">BLOCKS</p>

        <DragItem name="Label" draggable="true" onDragStart={onDragStart}/>
        <DragItem name="Input" draggable="true" onDragStart={onDragStart}/>
        <DragItem name="Button" draggable="true" onDragStart={onDragStart}/>

      </div>
    </div>
  );
}

export default App;
