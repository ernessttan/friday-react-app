import { useContext, useEffect, useState } from "react";
import format from "date-fns/format";
import AuthContext from "../../context/AuthContext";
import TaskOverview from "./TaskOverview/TaskOverview";
import ProjectGallery from "./ProjectGallery/ProjectGallery";
import Header from "../../components/Header";
import TaskBoard from "../../components/TaskBoard/TaskBoard";

function Home() {
  const auth = useContext(AuthContext);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await fetch(`https://friday-productivity.herokuapp.com/tasks/user/${auth.userId}`)
          .then((res) => res.json())
          .then((data) => {
            setTasks(data.tasks);
            setTodaysTasks(data.tasks.filter((task) => task.dueDate === format(new Date(), "MM/dd/yyyy")));
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <Header />
      {
      tasks && (
        <main>
          <h1 className="text-black">Hello, Madeline</h1>
          <TaskOverview tasks={todaysTasks} />
          <ProjectGallery />
          <h3 className="text-black font-bold mb-6">Tasks</h3>
          <TaskBoard tasks={tasks} setTasks={setTasks} />
        </main>
      )
    }

    </>
  );
}

export default Home;
