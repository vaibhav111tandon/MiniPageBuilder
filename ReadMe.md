# MiniPageBuilder

Mini Page Builder in react using Functional Components

## Install
- Clone the repository.
- After cloning, go to the minipagebuider folder
- Now in the terminal, do `npm install`
- For running the project in localhost, do `npm start`
- It will open the localhost:3000 in the browser.

## Working

It uses HTML5 native Drag and Drop api.

## Flow

- make an element draggable by adding the “draggable” attribute
- make an area droppable by implementing the “dragover” event
- capture the drag data by implementing the “dragstart” event
- capture the drop by implementing the “drop” event
- implement the “drag” event that is fired as the element is being dragged
- store the intermediate data in the dataTransfer object

## Features

- Drag and drop any number of elements in the editor.
- Double Click on the dragged element to open the Configurations.
- Double Click on the dragged element if you want to delete it(Delete button will popup in the modal).
- Ctrl + S to delete the element if Update Modal is open
- Delete button to delete the element if Update Modal is open
