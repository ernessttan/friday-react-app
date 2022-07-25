/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { BriefcaseIcon } from "@heroicons/react/outline";
import { useState } from "react";
import proptypes from "prop-types";

function AddProject({ setNewTask }) {
  const DUMMY_PROJECTS = [
    {
      id: "1",
      userId: "0",
      title: "Project 1",
      tasks: ["0", "1", "2"],
    },
    {
      id: "2",
      userId: "1",
      title: "Project 2",
      tasks: ["3", "4", "5"],
    },
    {
      id: "3",
      userId: "2",
      title: "Project 3",
      tasks: ["6", "7", "8"],
    },
  ];

  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);

  const handleProjectSelect = (event) => {
    setSelectedProject(event.target.value);
    setIsProjectsOpen(false);
    setNewTask((prevTask) => ({
      ...prevTask,
      project: event.target.value,
    }));
  };

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-1 w-1/3">
        <BriefcaseIcon className="h-5 w-5 text-grey-500" />
        <p className="text-grey-500">Project</p>
      </div>
      <div className="relative inline-block text-left w-2/3 px-4">
        <div>
          <button onClick={toggleProjects} type="button" className="inline-flex w-full rounded-md py-2 bg-white text-grey-500 text-sm hover:bg-grey-200">
            {selectedProject || "Select Project"}
          </button>
        </div>
        <div
          id="projectMenu"
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border-grey-200 bg-white z-40 ${
            isProjectsOpen ? "" : "hidden"
          }`}
        >
          <div className="p-5 flex flex-col gap-2">
            {
              DUMMY_PROJECTS.map((project) => (
                <button
                  key={project.id}
                  className="flex justify-start"
                  type="button"
                  name="project"
                  value={project.title}
                  onClick={handleProjectSelect}
                >
                  {project.title}
                </button>
              ))
            }
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
