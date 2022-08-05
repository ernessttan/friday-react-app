import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import OptionsMenu from '../OptionsMenu';
import EditProject from '../project/EditProject';

function Project({ project, fetchProjects }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleOptions = () => setIsOptionsOpen(!isOptionsOpen);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex items-center justify-between text-white">
      <Link to={`/project/${project.id}`}>{project.title}</Link>
      <button
        onClick={toggleOptions}
        type="button"
        className="text-white rounded-md hover:bg-orange-200"
      >
        <DotsHorizontalIcon className="w-5 h-5" />
      </button>
      <OptionsMenu
        isOptionsOpen={isOptionsOpen}
        item="Project"
        itemId={project.id}
        toggleModal={toggleModal}
        toggleOptions={toggleOptions}
        fetchProjects={fetchProjects}
      />
      <EditProject
        project={project}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </div>
  );
}

Project.propTypes = {
  project: Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    userId: Proptypes.string.isRequired,
  }).isRequired,
  fetchProjects: Proptypes.func.isRequired,
};

export default Project;
