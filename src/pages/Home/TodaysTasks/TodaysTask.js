/* eslint-disable max-len */
// import TaskCard from "../../../components/Tasks/TaskCard";

function TaskOverview() {
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
