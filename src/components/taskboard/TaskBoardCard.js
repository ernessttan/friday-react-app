import Proptypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { CalendarIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import EditTask from '../task/EditTask';

function TaskBoardCard({ id, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        await fetch(`https://friday-productivity.herokuapp.com/tasks/${id}`)
          .then((res) => res.json())
          .then((data) => setTask(data.task));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [id]);

  return task && (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            onClick={toggleModal}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? 'bg-grey-200' : 'bg-white'} border border-grey-300 rounded-md shadow-xl p-3`}
          >
            <div className="flex items-center justify-between">
              <h3>{task.title}</h3>
            </div>
            <p className="text-left py-2">{task.description}</p>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {task.dueDate}
            </div>
          </div>
        )}
      </Draggable>
      <EditTask
        setTask={setTask}
        task={task}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </>
  );
}

TaskBoardCard.propTypes = {
  index: Proptypes.number.isRequired,
  id: Proptypes.string.isRequired,
};

export default TaskBoardCard;
