import { Droppable } from "react-beautiful-dnd";
import Proptypes from "prop-types";
import { useState } from "react";
import AddTask from "../Task/AddTask";

function StatusColumn({ title, children, color }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleTaskModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`${snapshot.isDraggingOver ? "bg-grey-200" : "bg-grey-100"} rounded shrink-0 w-[90%] h-full p-3`}
        >
          <h2 className={`${color} p-2 rounded mb-3 text-white font-bold`}>{title}</h2>
          <div className="flex flex-col gap-3">
            {children}
          </div>
          <button
            onClick={toggleTaskModal}
            type="button"
            className="add-btn-orange-200 w-full flex items-center justify-center my-3"
          >
            <p>Add Task</p>
          </button>
          <AddTask
            modalIsOpen={modalIsOpen}
            toggleModal={toggleTaskModal}
            status={title}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

StatusColumn.propTypes = {
  title: Proptypes.string.isRequired,
  children: Proptypes.node.isRequired,
  color: Proptypes.string.isRequired,
};

export default StatusColumn;
