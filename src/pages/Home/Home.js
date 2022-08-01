import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import TaskOverview from "./TaskOverview/TaskOverview";
import ProjectGallery from "./ProjectGallery/ProjectGallery";
import Header from "../../components/Header";
import TaskBoard from "../../components/TaskBoard/TaskBoard";

function Home() {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await fetch(`https://friday-productivity.herokuapp.com/tasks/user/${auth.userId}`)
          .then((res) => res.json())
          .then((data) => {
            setTasks(data.tasks);
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
          <h1 className="text-black">
            Hello,
            {" "}
            {auth.firstName}
          </h1>
          <TaskOverview tasks={tasks} />
          <ProjectGallery />
          <section>
            <h2 className="text-black font-bold mb-6">Tasks</h2>
            <TaskBoard tasks={tasks} setTasks={setTasks} />
          </section>
        </main>
      )
    }

    </>
  );
}

export default Home;
