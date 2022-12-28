import React, { useState } from "react";
import DragDropItem from "../components/DragDropItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDropContainer = () => {
  const [items, setItems] = useState([
    { icon: "ac_unit" },
    { icon: "local_pizza" },
    { icon: "agriculture" },
  ]);

  function onDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const { source, destination } = result;
    const current = items;
    [current[destination.index], current[source.index]] = [
      current[source.index],
      current[destination.index],
    ];
    setItems(current);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => {
              return (
                <Draggable
                  key={item.icon}
                  draggableId={item.icon}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DragDropItem icon={item.icon} title={item.text} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropContainer;
