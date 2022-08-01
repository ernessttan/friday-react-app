/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Header from "../../components/Header";
import ToDo from "./ToDo";
import Completed from "./Completed";

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
        {tasks && tasks.length > 0 ? (
          <>
            <ToDo tasks={tasks} setTasks={setTasks} />
            <Completed tasks={tasks} />
          </>

        ) : (
          <h1 className="mt-16 text-center text-grey-500">
            No Tasks Found
          </h1>
        )}
      </main>
    </>
  );
}

export default Tasks;
