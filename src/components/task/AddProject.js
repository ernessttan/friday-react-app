import { BriefcaseIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import proptypes from 'prop-types';

function AddProject({ setNewTask, title, userId }) {
  const [projects, setProjects] = useState();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(title);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        fetch(`https://friday-productivity.herokuapp.com/projects/user/${userId}`)
          .then((res) => res.json())
          .then((data) => setProjects(data.projects));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, [userId]);

  const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);

  const handleProjectSelect = (e) => {
    setSelectedProject(e.target.textContent);
    setIsProjectsOpen(false);
    setNewTask((prevTask) => ({
      ...prevTask,
      projectId: e.target.value,
    }));
  };

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-2 w-1/3 text-black">
        <BriefcaseIcon className="h-5 w-5" />
        <p>Project</p>
      </div>
      <div className="relative inline-block text-left w-2/3 px-4">
        <div>
          <button onClick={toggleProjects} type="button" className="inline-flex w-full rounded-md py-2 bg-white text-black hover:bg-grey-200">
            {selectedProject || 'Select Project'}
          </button>
        </div>
        <div
          id="projectMenu"
          className={`absolute mt-2 rounded-md shadow-lg border border-grey-300 bg-white z-40 w-full ${
            isProjectsOpen ? '' : 'hidden'
          }`}
        >
          <div className="p-5 flex flex-col gap-2">
            { projects && projects.length > 0 ? (
              projects.map((project) => (
                <button
                  key={project.id}
                  className="flex justify-start"
                  type="button"
                  name="projectId"
                  value={project.id}
                  onClick={handleProjectSelect}
                >
                  {project.title}
                </button>
              ))
            ) : (
              <p className="text-grey-500">No Projects Created</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AddProject.defaultProps = {
  title: '',
};

AddProject.propTypes = {
  setNewTask: proptypes.func.isRequired,
  title: proptypes.string,
  userId: proptypes.string.isRequired,
};

export default AddProject;
