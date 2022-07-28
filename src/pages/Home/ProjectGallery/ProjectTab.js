import Proptypes from "prop-types";

function ProjectTab({ project }) {
  return (
    <div className="border border-grey-300 shadow-lg rounded-md w-1/2 shrink-0 py-6 px-5">
      <h3>{project.title}</h3>
      <p className="text-grey-500">
        {project.tasks.length}
        {" "}
        Tasks
      </p>
      {/* <div className="my-2 w-full bg-grey-400 rounded-full h-2.5">
          <div className="bg-orange-400 h-2.5 w-[20%] rounded-full" />
        </div> */}
    </div>
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
