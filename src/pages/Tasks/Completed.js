import Proptypes from "prop-types";
import TaskList from "../../components/TaskList/TaskList";

function Completed({ tasks }) {
  return (
    <section>
      <h2>Completed</h2>
      <TaskList
        tasks={tasks.filter((task) => task.status === "Done")}
      />
    </section>
  );
}

Completed.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  })).isRequired,
};

export default Completed;
