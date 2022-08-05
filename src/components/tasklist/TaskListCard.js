import Proptypes from 'prop-types';
import { CalendarIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import EditTask from '../task/EditTask';

function TaskListCard({ tasks, taskData, setTasks }) {
  const auth = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState(taskData);

  useEffect(() => {
    setTask(taskData);
  }, [taskData]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const updateStatus = async () => {
    try {
      await fetch(`https://friday-productivity.herokuapp.com/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, status: 'Done' }),
      }).then((res) => res.json())
        .then(() => {
          setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: 'Done' } : t)));
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return task && (
    <>
      <div
        onClick={toggleModal}
        className="border border-grey-300 rounded-md p-4 shadow-md w-full px-5"
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              onChange={updateStatus}
              className="form-checkbox h-5 w-5 rounded-full text-orange-500 border-2"
              type="checkbox"
              checked={task.status === 'Done'}
            />
            <h3 className="py-2">{task.title}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-grey-500 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {task.dueDate}
          </p>
        </div>
      </div>
      <EditTask
        task={task}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        setTask={setTask}
        setTasks={setTasks}
        tasks={tasks}
      />
    </>

  );
}

TaskListCard.propTypes = {
  taskData: Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    dueDate: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  }).isRequired,
  setTasks: Proptypes.func.isRequired,
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    dueDate: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  })).isRequired,
};

export default TaskListCard;
