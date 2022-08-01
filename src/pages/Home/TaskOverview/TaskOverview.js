import { ClipboardListIcon } from "@heroicons/react/outline";
import Proptypes from "prop-types";
import format from "date-fns/format";

function TaskOverview({ tasks }) {
  return (
    <section>
      <div className="rounded-lg bg-orange-400 px-5 py-8 flex items-center justify-between md:px-8 md:py-12">
        <div>
          <h3 className="text-white mb-3 md:desktop">Today</h3>
          <h3 className="text-white font-bold md:desktop">
            {tasks.filter((task) => task.status === "Done").length}
            /
            {tasks.filter((task) => task.dueDate === format(new Date(), "MM/dd/yyyy")).length}
            {" "}
            Tasks Completed
          </h3>
        </div>
        <div>
          <ClipboardListIcon className="w-16 h-16 text-white" />
        </div>
      </div>
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
