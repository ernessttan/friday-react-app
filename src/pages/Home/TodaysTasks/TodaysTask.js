/* eslint-disable max-len */
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import TaskCard from "../../../components/Tasks/TaskCard";

function TaskOverview() {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState();

  useEffect(async () => {
    try {
      await fetch(`http://localhost:4000/tasks/${auth}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data.tasks.filter((task) => task.dueDate === new Date().toISOString().slice(0, 10)));
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-4 overflow-x-scroll scroll-smooth w-full">
        {tasks && (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              setTasks={setTasks}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default TaskOverview;
