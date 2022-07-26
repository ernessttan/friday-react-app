import PropTypes from "prop-types";
import { useState } from "react";
import { DotsHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

function ProjectTab({ project }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <div className="relative flex items-center justify-between text-white">
      <p>{project.title}</p>
      <button type="button" onClick={toggleOptions} className="relative">
        <DotsHorizontalIcon className="h-5 w-5" />
      </button>
      <div className={`origin-top-right absolute right-0 bg-white shadow-lg rounded w-40 mt-36 p-3 z-40 flex flex-col gap-2 ${
        isOptionsOpen ? "" : "hidden"
      }`}
      >
        <button type="button" className="w-full text-black flex items-center gap-2 py-2 hover:bg-orange-100">
          <PencilIcon className="h-5 w-5" />
          <p>Edit Project</p>
        </button>
        <button type="button" className="w-full text-black flex items-center gap-2 py-2 hover:bg-orange-100">
          <TrashIcon className="h-5 w-5" />
          <p>Delete Project</p>
        </button>
      </div>
    </div>
  );
}

ProjectTab.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProjectTab;
