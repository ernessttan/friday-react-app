import { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import format from 'date-fns/format';
import ViewMenu from '../../components/ViewMenu';
import TaskList from '../../components/tasklist/TaskList';
import TaskBoard from '../../components/taskboard/TaskBoard';
import AuthContext from '../../context/AuthContext';

function TasksToday({ tasks }) {
  const auth = useContext(AuthContext);
  const [selectedView, setSelectedView] = useState('List');
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [tasksToday, setTasksToday] = useState([]);

  useEffect(
    () => {
      setTasksToday(tasks.filter((task) => task.dueDate === format(new Date(), 'MM/dd/yyyy')));
    },
    [tasks],
  );

  const toggleViewMenu = () => setIsViewMenuOpen(!isViewMenuOpen);

  const handleViewSelect = (e) => {
    setSelectedView(e.target.value);
    toggleViewMenu();
  };

  return (
    <section>
      <div className="flex items-center justify-between w-full">
        <h2>Tasks Today</h2>
        <ViewMenu
          selectedView={selectedView}
          isViewMenuOpen={isViewMenuOpen}
          toggleViewMenu={toggleViewMenu}
          handleViewSelect={handleViewSelect}
        />
      </div>
      <div>
        {selectedView === 'List' ? (
          <TaskList tasks={tasks} />
        ) : (
          <TaskBoard tasks={tasksToday} token={auth.token} setTasks={setTasksToday} />
        )}
      </div>
    </section>
  );
}

TasksToday.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    dueDate: Proptypes.string.isRequired,
    projectId: Proptypes.string.isRequired,
    userId: Proptypes.string.isRequired,
    completed: Proptypes.bool.isRequired,
  })).isRequired,
};

export default TasksToday;
