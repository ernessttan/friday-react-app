/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { BriefcaseIcon } from "@heroicons/react/outline";
import { useState, useEffect, useContext } from "react";
import proptypes from "prop-types";
import AuthContext from "../../context/AuthContext";

function AddProject({ setNewTask }) {
  const auth = useContext(AuthContext);
  const [projects, setProjects] = useState();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/projects/user/${auth.userId}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

  const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);

  const handleProjectSelect = (event) => {
    setSelectedProject(event.target.textContent);
    setIsProjectsOpen(false);
    setNewTask((prevTask) => ({
      ...prevTask,
      projectId: event.target.value,
    }));
  };

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-2 w-1/3">
        <BriefcaseIcon className="h-5 w-5 text-grey-500" />
        <p className="text-grey-500 text-sm">Project</p>
      </div>
      <div className="relative inline-block text-left w-2/3 px-4">
        <div>
          <button onClick={toggleProjects} type="button" className="inline-flex w-full rounded-md py-2 bg-white text-grey-500 text-sm hover:bg-grey-200">
            {selectedProject || "Select Project"}
          </button>
        </div>
        <div
          id="projectMenu"
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-grey-300 bg-white z-40 ${
            isProjectsOpen ? "" : "hidden"
          }`}
        >
          <div className="p-5 flex flex-col gap-2">
            { projects && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AddProject.propTypes = {
  setNewTask: proptypes.func.isRequired,
};

export default AddProject;
