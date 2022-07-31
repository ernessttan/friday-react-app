import Proptypes from "prop-types";
import { CalendarIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function TaskListItem({ task, setTasks }) {
  const auth = useContext(AuthContext);
  const deleteHandler = async () => {
    try {
      await fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }).then(() => setTasks((tasks) => tasks.filter((t) => t.id !== task.id)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task-card flex items-center justify-between">
      <div>
        <h3 className="py-2">{task.title}</h3>
        <p className="text-grey-500 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          {task.dueDate}
        </p>
      </div>
      <input
        onChange={deleteHandler}
        className="h-5 w-5"
        type="checkbox"
      />
    </div>
  );
}

TaskListItem.propTypes = {
  task: Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    dueDate: Proptypes.string.isRequired,
  }).isRequired,
  setTasks: Proptypes.func.isRequired,
};

export default TaskListItem;
