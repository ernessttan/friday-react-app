/* eslint-disable operator-linebreak */
import { DragDropContext } from 'react-beautiful-dnd';
import Proptypes from 'prop-types';
import StatusColumn from './StatusColumn';
import TaskBoardCard from './TaskBoardCard';

const STATUSES = [
  { id: 0, title: 'To Do', color: 'bg-red-100' },
  { id: 1, title: 'In Progress', color: 'bg-yellow-100' },
  { id: 2, title: 'Done', color: 'bg-green-100' },
];

function TaskBoard({ token, setTasks, tasks }) {
  const updateStatus = async (currentTask, newStatus) => {
    try {
      await fetch(
        `https://friday-productivity.herokuapp.com/tasks/${currentTask.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...currentTask, status: newStatus }),
        },
      )
        .then((res) => res.json())
        .then(() => {
          setTasks((prevTasks) => prevTasks.map((task) => ({
            ...task,
            status:
                task.title === currentTask.title ? newStatus : task.status,
          })));
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    // Check if location changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // If no Change
      return;
    }

    // Update status
    const currentTask = tasks.find((task) => task.id === draggableId);
    const newStatus = STATUSES.find((status) => status.title === destination.droppableId).title;
    updateStatus(currentTask, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-5 overflow-x-scroll">
        {STATUSES.map((status) => (
          <StatusColumn key={status.id} status={status}>
            {tasks.filter((task) => task.status === status.title).map((task) => (
              <TaskBoardCard key={task.id} id={task.id} index={tasks.indexOf(task)} />
            ))}
          </StatusColumn>
        ))}
      </div>
    </DragDropContext>
  );
}

TaskBoard.propTypes = {
  token: Proptypes.string.isRequired,
  setTasks: Proptypes.func.isRequired,
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
    dueDate: Proptypes.string.isRequired,
  })).isRequired,
};

export default TaskBoard;
