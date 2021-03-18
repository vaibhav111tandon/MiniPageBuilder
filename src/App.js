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
  
  const [modalVisible, setModalVisible] = useState(false);

  const [currElementX, setCurrElementX] = useState(0);
  const [currElementY, setCurrElementY] = useState(0);
  const [currElementId, setCurrElementId] = useState();

  const [currDragArea,setCurrDragArea] = useState(0);

  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  useEffect(() => {
    
    return () => {
      
    }
  }, [])

  const onDragStartCurrent = (event,uuid) => {
    structure.forEach((e) => {
      console.log(e.id);
      if(e.id === uuid){
        console.log(e.id);
        setCurrDragArea(1);
        setCurrElementX(e.x);
        setCurrElementY(e.y);
        setCurrElementId(e.id);
      }
    })
    //event.dataTransfer.setData("name_stub",name);
  }

  const onDClickElement = (e,uuid,x,y,text) => {
    
    setX(x)
    setY(y)
    setText(text);
    setUpdateModalVisible(true);
    setCurrElementId(uuid);
  }

  const RenderEditor = () => {
  console.log("here", structure);
    return (
      <>
        {
          structure.map(element => {
            
            if(element.elementName === 'Label'){
              return (<Label onDClickElement={onDClickElement} key={element.id} uuid={element.id}  x={element.x} y={element.y} text={element.text} draggable="true" onDragStartCurrent={onDragStartCurrent}/>)
            }
            if(element.elementName === 'Input'){
              return (<Input onDClickElement={onDClickElement} key={element.id} uuid={element.id} x={element.x} y={element.y} text={element.text} draggable="true" onDragStartCurrent={onDragStartCurrent}/>)
            }
            if(element.elementName === 'Button'){
              return (<Button onDClickElement={onDClickElement} key={element.id} uuid={element.id} x={element.x} y={element.y} text={element.text} draggable="true" onDragStartCurrent={onDragStartCurrent}/>)
            }
          
          })
        }
      </>
    )

  }

  const createElement = async (elementName) => {
    await setStructure([...structure, {elementName, x, y, text, id:Math.floor(Math.random()*9999999)}]);  
  }

  const onModalClose = () => {
    setModalVisible(false);
  }

  const onModalOpen = () => {
    setModalVisible(true);
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const onDragStart = (event, name) => {
    console.log(event);
    event.dataTransfer.setData("name_stub",name);
  }

  const completeStructureChange = async (x,y, event) => {
    let newArr = await structure.map(e => {
      if(e.id === currElementId){
        e.x = event.clientX;
        e.y = event.clientY;
      }
    })
    

    console.log(newArr);
    //await setStructure([...newArr])

  }

  const onDrop = async (event) => {
   //console.log(currDragArea);
    if(currElementId > 1000){
      await completeStructureChange(currElementX, currElementY, event).then(() => setCurrElementId(0))
    }else{
      await setCurrentDragElement(event.dataTransfer.getData("name_stub"));
      await setX(event.clientX);
      await setY(event.clientY);
      await onModalOpen();
    }
  }

  const saveChange = async () => {
    
    await createElement(currentDragElement);
    await onModalClose();
  }

  const updateCurrentElement = async () => {
    let arr = await structure.map(e => {
      if(e.id === currElementId){
        e.x = x;
        e.y = y;
        e.text = text;
      }
    })
  }

  const updateElement = async () => {
    await updateCurrentElement();
    await setUpdateModalVisible(false);
  }

  const deleteCurrElement =async () => {
    
    let arr = await structure.filter(e => {
      if(e.id !== currElementId){
        console.log(currElementId);
        return e;
      }
    })
   // console.log(arr);
    await setStructure([...arr]);
    await setUpdateModalVisible(false);
  }

  const deleteElement = async () => {
    console.log("deleted");
    await deleteCurrElement()
  }

  return (
    <div className="App" onClick={(e) => {
        if(e.target == document.getElementsByClassName('App__dropzone')[0] || e.target == document.getElementsByClassName('App__dragzone')[0]){
          console.log(e.target);
          setModalVisible(false); 
          setUpdateModalVisible(false);
        }}}>
      <div className="modal" style={{position: 'absolute', top: '50%', left: '50%', zIndex:'999999', width: '300px', display: modalVisible ? 'block':'none'}}>
        <p style={{fontWeight: '600', fontSize: '21px', fontFamily:'Arial', paddingLeft: '20px'}}>Edit Label</p>
        <hr style={{border: 'solid 1px #000', opacity: '0.07'}}/>
        <br/>
        <span className="modal__label">Text</span><br/>
        <input className="modal__input" type="text" onChange={(e)=>setText(e.target.value)} value={text}/><br/>
        <span className="modal__label">X</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setX(e.target.value)} value={x}/><br/>
        <span className="modal__label">Y</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setY(e.target.value)} value={y}/><br/>
        <button className="modal__savebtn" onClick={saveChange}>Save Changes</button>
      </div>

      <div className="modal" style={{position: 'absolute', top: '50%', left: '50%', zIndex:'999999', width: '300px', display: updateModalVisible ? 'block':'none'}}>
        <p style={{fontWeight: '600', fontSize: '21px', fontFamily:'Arial', paddingLeft: '20px'}}>Edit Label</p>
        <hr style={{border: 'solid 1px #000', opacity: '0.07'}}/>
        <br/>
        <span className="modal__label">Text</span><br/>
        <input className="modal__input" type="text" onChange={(e)=>setText(e.target.value)} value={text}/><br/>
        <span className="modal__label">X</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setX(e.target.value)} value={x}/><br/>
        <span className="modal__label">Y</span><br/>
        <input className="modal__input" type="number" onChange={(e)=>setY(e.target.value)} value={y}/><br/>
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
        <p style={{fontWeight: 'bold', fontSize: '17px', color: '#FFFFFF', fontFamily: 'Arial', marginLeft: '15px'}}>BLOCKS</p>

        <DragItem name="Label" draggable="true" onDragStart={onDragStart}/>
        <DragItem name="Input" draggable="true" onDragStart={onDragStart}/>
        <DragItem name="Button" draggable="true" onDragStart={onDragStart}/>

      </div>
    </div>
  );
}

export default App;
