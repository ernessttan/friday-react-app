import { ChevronRightIcon } from '@heroicons/react/solid';
import Proptypes from 'prop-types';
import { useEffect, useState } from 'react';
import TaskListCard from './TaskListCard';

function TaskList({ tasks }) {
  const [taskList, setTaskList] = useState([]);
  const [isToDoOpen, setIsToDoOpen] = useState(false);
  const [isDoneOpen, setIsDoneOpen] = useState(false);

  const toggleToDo = () => setIsToDoOpen(!isToDoOpen);
  const toggleIsDone = () => setIsDoneOpen(!isDoneOpen);

  useEffect(
    () => {
      setTaskList(tasks);
    },
    [tasks],
  );

  return (
    <>
      <section>
        <button onClick={toggleToDo} type="button" className="w-full flex items-center justify-between">
          <h3>To Do</h3>
          <ChevronRightIcon className={`w-7 h-7 ${
            isToDoOpen ? 'rotate-90 transition ease-in-out duration-400' : ''
          }`}
          />
        </button>
        <div className={`flex-col gap-4 overflow-y-scroll scroll-smooth w-ful py-5 no-scrollbar ${
          isToDoOpen ? 'flex' : 'hidden'
        }`}
        >
          {taskList && taskList.length > 0 ? (
            taskList.filter((task) => task.status === 'To Do').map((task) => (
              <TaskListCard
                key={task.id}
                taskData={task}
                setTasks={setTaskList}
                tasks={taskList}
              />
            ))
          ) : (
            <h1 className="mt-8 text-center text-grey-500">
              No Tasks Found
            </h1>
          )}
        </div>
      </section>
      <section>
        <button onClick={toggleIsDone} type="button" className="w-full flex items-center justify-between">
          <h3>Done</h3>
          <ChevronRightIcon className={`w-7 h-7 ${
            isDoneOpen ? 'rotate-90 transition ease-in-out duration-400' : ''
          }`}
          />
        </button>
        <div className={`flex-col gap-4 overflow-y-scroll scroll-smooth w-ful py-5 no-scrollbar ${
          isDoneOpen ? 'flex' : 'hidden'
        }`}
        >
          {taskList && taskList.length > 0 ? (
            taskList.filter((task) => task.status === 'Done').map((task) => (
              <TaskListCard
                key={task.id}
                taskData={task}
                setTasks={setTaskList}
                tasks={taskList}
              />
            ))
          ) : (
            <h1 className="mt-8 text-center text-grey-500">
              No Tasks Found
            </h1>
          )}
        </div>
      </section>
    </>

  );
}

TaskList.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    dueDate: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  })).isRequired,
};

export default TaskList;
