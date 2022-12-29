import React, { useEffect } from "react";
import DragDropItem from "../components/DragDropItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { moveDragDrop, fetchDragDrop } from "../store/dragdrop";

const DragDropContainer = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchDragDrop(items));
  }, []);

  const onDragEnd = (result) => {
    if (
      result.destination &&
      result.destination.index !== result.source.index
    ) {
      const { source, destination } = result;
      const newItems = [...items];
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);

      dispatch(moveDragDrop(newItems));
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
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
                      <DragDropItem icon={item.icon} />
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
