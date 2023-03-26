import './App.css';
import Container from './Container';
import React , {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialItems1 = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' },
  { id: 'item-4', content: 'Item 4' },
];

const initialItems2 = [
  { id: 'item-5', content: 'Item 5' },
  { id: 'item-6', content: 'Item 6' },
  { id: 'item-7', content: 'Item 7' },
  { id: 'item-8', content: 'Item 8' },
];
const App = () => {

  const [items1, setItems1] = useState(initialItems1)
  const [items2, setItems2] = useState(initialItems2)

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      let [items, setItems] = getArrayById(source.droppableId)
      const newItems = Array.from(items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);
      setItems(newItems);
    }

    if (source.droppableId !== destination.droppableId) {
      let [srcItems,setSrcItems] = getArrayById(source.droppableId);
      let [destItems,setDestItems] = getArrayById(destination.droppableId);

      const newItems1 = Array.from(srcItems);
      const newItems2 = Array.from(destItems);
      const [removed] = newItems1.splice(source.index, 1);
      newItems2.splice(destination.index, 0, removed);
      setSrcItems(newItems1);
      setDestItems(newItems2);
    }
  };

  const getArrayById = (id) =>{
    switch(id){
      case 'droppable-1':
        return [items1, setItems1];
      case 'droppable-2':
        return [items2,setItems2];
    }
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items1.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <Droppable droppableId="droppable-2">
        {(provided, snapshot) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items2.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;

