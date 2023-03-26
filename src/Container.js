import React , {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Container = () => {

  const [items, setItems] = useState([])
  const onDragEnd = (result) => {
    console.log(result)
    const currItems = Array.from(items);
    const [reorderedItem] = currItems.splice(result.source.index, 1);
    currItems.splice(result.destination.index, 0, reorderedItem);

    setItems(currItems);
  };

  return (
    <div style={{backgroundColor:'pink',width:'100px', height:'100px'}}>

    
      <Droppable droppableId="droppable-2">
        {(provided, snapshot) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
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
      </div>
  );
};

export default Container;

