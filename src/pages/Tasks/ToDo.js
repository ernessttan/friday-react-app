import Proptypes from "prop-types";
import TaskList from "../../components/TaskList/TaskList";

function ToDo({ tasks }) {
  return (
    <section>
      <h2>To Do</h2>
      <TaskList
        tasks={tasks.filter((task) => task.status === "To Do" || task.status === "In Progress")}
      />
    </section>
  );
}

ToDo.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  })).isRequired,
};

export default ToDo;
