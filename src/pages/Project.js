import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Header from '../components/layout/Header';
import ViewMenu from '../components/ViewMenu';
import TaskList from '../components/tasklist/TaskList';
import TaskBoard from '../components/taskboard/TaskBoard';
import AuthContext from '../context/AuthContext';

function Project() {
  const auth = useContext(AuthContext);
  const { pid } = useParams();
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedView, setSelectedView] = useState('List');
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProjectTasks = async () => {
      try {
        await fetch(`https://friday-productivity.herokuapp.com/tasks/project/${pid}`)
          .then((res) => res.json())
          .then((data) => {
            setProject(data.project);
            setTasks(data.tasks);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjectTasks();
  }, [pid]);

  const toggleViewMenu = () => setIsViewMenuOpen(!isViewMenuOpen);

  const handleViewSelect = (e) => {
    setSelectedView(e.target.value);
    toggleViewMenu();
  };

  return (
    <>
      <Header />
      <main>
        <div className="py-5">
          <h1 className="text-orange-500">{project.title}</h1>
          <p className="align-left font-normal">{project.description}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <h2>Tasks</h2>
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

export default Project;
