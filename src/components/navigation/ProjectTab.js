import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DotsHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import EditProject from "../Project/EditProject";

function ProjectTab({ fetchProjects, projectData }) {
  const auth = useContext(AuthContext);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState(projectData);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleDelete = async () => {
    try {
      await fetch(`https://friday-productivity.herokuapp.com/projects/${project.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then(() => fetchProjects());
    } catch (err) {
      console.error(err);
    }
  };

  return project && (
    <div className="relative flex items-center justify-between text-white">
      <Link to={`/project/${project.id}`} className="grow md:text-xl hover:bg-orange-200 rounded-md">
        {project.title}
      </Link>
      <button type="button" onClick={toggleOptions} className="relative hover:bg-orange-200 rounded-md">
        <DotsHorizontalIcon className="h-5 w-5" />
      </button>
      <div className={`origin-top-right absolute right-0 bg-white shadow-lg rounded w-40 mt-36 p-3 z-40 flex flex-col gap-1 ${
        isOptionsOpen ? "" : "hidden"
      }`}
      >
        <button onClick={toggleModal} type="button" className="w-full text-black flex items-center gap-2 py-2 hover:bg-orange-100">
          <PencilIcon className="h-5 w-5" />
          <p>Edit Project</p>
        </button>
        <EditProject
          setProject={setProject}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          project={project}
        />
        <button
          onClick={handleDelete}
          type="button"
          className="w-full text-black flex items-center gap-2 py-2 hover:bg-orange-100"
        >
          <TrashIcon className="fill-red-500 h-5 w-5" />
          <p>Delete Project</p>
        </button>
      </div>
    </div>
  );
}

ProjectTab.propTypes = {
  projectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

export default ProjectTab;
