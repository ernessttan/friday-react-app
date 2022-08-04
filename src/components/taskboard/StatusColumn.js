import { Droppable } from 'react-beautiful-dnd';
import Proptypes from 'prop-types';
import { useState } from 'react';
import CreateTask from '../task/CreateTask';

function StatusColumn({ status, children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTaskModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Droppable droppableId={status.title}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`${snapshot.isDraggingOver ? 'bg-grey-200' : 'bg-grey-100'} rounded shrink-0 w-[90%] h-full p-3 sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[32%]`}
        >
          <h2 className={`${status.color} p-2 rounded mb-3 text-white font-bold`}>{status.title}</h2>
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
          <CreateTask
            isModalOpen={isModalOpen}
            toggleModal={toggleTaskModal}
            status={status.title}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

StatusColumn.propTypes = {
  status: Proptypes.shape({
    title: Proptypes.string.isRequired,
    color: Proptypes.string.isRequired,
  }).isRequired,
  children: Proptypes.node.isRequired,
};

export default StatusColumn;
