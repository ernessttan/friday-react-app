import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import TaskCard from "../common/TaskCard";

function TaskList() {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    fetch(`http://localhost:4000/tasks/user/${auth.userId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }, []);

  return (
    <section>
      <h1 className="text-orange-500">Tasks</h1>
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

export default TaskList;
