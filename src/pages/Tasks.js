import { useState, useContext, useEffect } from 'react';
import Header from '../components/layout/Header';
import AuthContext from '../context/AuthContext';
import ViewMenu from '../components/ViewMenu';
import TaskBoard from '../components/taskboard/TaskBoard';
import TaskList from '../components/tasklist/TaskList';

function Tasks() {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [selectedView, setSelectedView] = useState('List');
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await fetch(`https://friday-productivity.herokuapp.com/tasks/user/${auth.userId}`)
          .then((res) => res.json())
          .then((data) => setTasks(data.tasks));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [auth.userId]);

  const toggleViewMenu = () => setIsViewMenuOpen(!isViewMenuOpen);

  const handleViewSelect = (e) => {
    setSelectedView(e.target.value);
    toggleViewMenu();
  };

  return (
    <>
      <Header />
      <main>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-orange-500">Tasks</h1>
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
            <TaskBoard tasks={tasks} token={auth.token} setTasks={setTasks} />
          )}
        </div>
      </main>
    </>
  );
}

export default Tasks;
