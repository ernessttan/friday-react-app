import proptypes from "prop-types";

function ProjectCard({ project }) {
  return (
    <div className="border border-grey-300 shadow-lg rounded-md w-3/5 shrink-0 py-6 px-5">
      <h3>{project.title}</h3>
      <p className="text-grey-400">5 Tasks Left</p>
      <div className="my-2 w-full bg-grey-400 rounded-full h-2.5">
        <div className="bg-orange-400 h-2.5 w-[20%] rounded-full" />
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: proptypes.shape({
    id: proptypes.string.isRequired,
    userId: proptypes.string.isRequired,
    title: proptypes.string.isRequired,
    tasks: proptypes.arrayOf(proptypes.string).isRequired,
  }).isRequired,
};

export default ProjectCard;
