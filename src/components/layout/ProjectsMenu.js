import { useContext, useEffect, useState, useCallback } from 'react';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import AuthContext from '../../context/AuthContext';
import CreateProject from '../project/CreateProject';
import Project from './Project';

function ProjectsMenu() {
  const auth = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add Project Modal

  const fetchProjects = useCallback(async () => {
    try {
      await fetch(`https://friday-productivity.herokuapp.com/projects/user/${auth.userId}`)
        .then((res) => res.json())
        .then((data) => setProjects(data.projects));
    } catch (error) {
      console.log(error.message);
    }
  }, [auth.userId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Toggle Projects Dropdown
  const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);

  // Toggle Add Project Modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <button
        type="button"
        onClick={toggleProjects}
        className="flex items-center justify-between w-full text-white"
      >
        <h2>Projects</h2>
        <ChevronRightIcon
          className={`h-8 w-8 ${
            isProjectsOpen
              ? 'rotate-90 transition ease-in-out duration-400'
              : ''
          }`}
        />
      </button>
      <div
        className={`${
          isProjectsOpen ? 'flex' : 'hidden'
        } w-full flex-col gap-3 py-5`}
      >
        <button
          onClick={toggleModal}
          type="button"
          className="flex items-center justify-center w-full gap-2 py-1 text-sm text-white bg-orange-200 rounded"
        >
          <PlusIcon className="w-5 h-5" />
          Create Project
        </button>
        <CreateProject
          userId={auth.userId}
          token={auth.token}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          fetchProjects={fetchProjects}
        />
        <div className="flex flex-col gap-4 py-3">
          {projects.map((project) => (
            <Project
              key={project.id}
              project={project}
              fetchProjects={fetchProjects}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectsMenu;
