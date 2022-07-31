/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TaskList from "../../components/TaskList/TaskList";
import Header from "../../components/Header";

function Tasks() {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // Get all the tasks belonging to a user
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
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1 className="text-orange-500">Tasks</h1>
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
        />
      </main>
    </>
  );
}

export default Tasks;
