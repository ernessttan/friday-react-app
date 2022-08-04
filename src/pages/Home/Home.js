import { useEffect, useState, useContext, useCallback } from 'react';
import format from 'date-fns/format';
import AuthContext from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Overview from './Overview';
import ProjectCarousel from './ProjectCarousel';
import TasksToday from './TasksToday';

function Home() {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      await fetch(`https://friday-productivity.herokuapp.com/tasks/user/${auth.userId}`)
        .then((res) => res.json())
        .then((data) => setTasks(data.tasks));
    } catch (error) {
      console.log(error.message);
    }
  }, [auth.userId]);

  const fetchProjects = useCallback(async () => {
    try {
      await fetch(`https://friday-productivity.herokuapp.com/projects/user/${auth.userId}`)
        .then((res) => res.json())
        .then((data) => setProjects(data.projects));
    } catch (error) {
      console.log(error.message);
    }
  }, [auth.userId]);

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, [fetchProjects, fetchTasks]);

  return (
    <>
      <Header />
      <main>
        <h1 className="py-5">{`Hello ${auth.firstName}`}</h1>
        <Overview
          tasks={tasks.filter((task) => task.dueDate === format(new Date(), 'MM/dd/yyyy'))}
          activeProjects={projects.length}
        />
        <ProjectCarousel projects={projects} />
        <TasksToday tasks={tasks} />
      </main>
    </>
  );
}

export default Home;
