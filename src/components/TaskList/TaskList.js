import Proptypes from "prop-types";
import TaskListItem from "./TaskListItem";

function TaskList({ tasks, setTasks }) {
  return (
    <section>
      <div className="flex flex-col gap-4 overflow-y-scroll scroll-smooth w-full">
        {tasks && (
          tasks.map((task) => (
            <TaskListItem
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

TaskList.defaultProps = {
  tasks: [],
  setTasks: () => {},
};

TaskList.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.objectOf),
  setTasks: Proptypes.func,
};

export default TaskList;
