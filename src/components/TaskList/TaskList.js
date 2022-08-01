import Proptypes from "prop-types";
import TaskListItem from "./TaskListItem";

function TaskList({ tasks, setTasks }) {
  return tasks && (
    <section>
      <div className="flex flex-col gap-4 overflow-y-scroll scroll-smooth w-ful py-5 no-scrollbar">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskListItem
              key={task.id}
              taskData={task}
              setTasks={setTasks}
            />
          ))
        ) : (
          <h1 className="mt-8 text-center text-grey-500">
            No Tasks Found
          </h1>
        )}
      </div>
    </section>
  );
}

TaskList.defaultProps = {
  setTasks: () => {},
  tasks: [],
};

TaskList.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  })),
  setTasks: Proptypes.func,
};

export default TaskList;
