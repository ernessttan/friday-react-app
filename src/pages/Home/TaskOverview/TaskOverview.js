import { ClipboardListIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

function TaskOverview({ tasks }) {
  return (
    <section>
      <Link to="/today" className="rounded-lg bg-orange-400 px-5 py-8 flex items-center justify-between">
        <div>
          <h3 className="text-white mb-3">Today</h3>
          <h2 className="text-white font-bold">
            2/
            {tasks.length}
            {" "}
            Tasks Completed
          </h2>
        </div>
        <div>
          <ClipboardListIcon className="w-16 h-16 text-white" />
        </div>
      </Link>
    </section>
  );
}

TaskOverview.propTypes = {
  tasks: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      title: Proptypes.string.isRequired,
      dueDate: Proptypes.string.isRequired,
      description: Proptypes.string.isRequired,
      status: Proptypes.string.isRequired,
    }),
  ).isRequired,
};

export default TaskOverview;
