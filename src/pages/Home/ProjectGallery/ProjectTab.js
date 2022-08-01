import Proptypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProjectTab({ project }) {
  const [completed, setCompleted] = useState();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await fetch(`https://friday-productivity.herokuapp.com/tasks/project/${project.id}`)
          .then((res) => res.json())
          .then((data) => {
            const total = data.tasks.length;
            const completed = data.tasks.filter((task) => task.status === "Done").length;
            setCompleted(`${Math.round((completed / total) * 100)}%`);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Link to={`/project/${project.id}`} className="border border-grey-300 shadow-lg rounded-md w-1/2 shrink-0 py-6 px-5 sm:w-1/3 lg:w-1/4 xl:w-1/5">
      <h3>{project.title}</h3>
      <p className="text-grey-500">
        {project.tasks.length}
        {" "}
        Tasks
      </p>
      <div className="my-2 w-full bg-grey-400 rounded-full h-2.5">
        <div
          style={{ width: completed }}
          className={`h-2.5 rounded-full ${
            completed === "100%" ? "bg-green-100" : "bg-orange-400"
          }`}
        />
      </div>
    </Link>
  );
}

ProjectTab.propTypes = {
  project: Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    tasks: Proptypes.arrayOf(Proptypes.string).isRequired,
  }).isRequired,
};

export default ProjectTab;
