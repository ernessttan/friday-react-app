import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import ProjectTab from "./ProjectTab";
import CreateProjectButton from "./CreateProjectButton";

function ProjectsMenu() {
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

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };
  return (
    <>
      <div className="mt-5 w-full flex items-center justify-between">
        <button type="button">
          <h2 className="text-white">Projects</h2>
        </button>
        <button onClick={toggleProjects} type="button">
          <ChevronRightIcon className={`h-8 w-8 text-white ${isProjectsOpen ? "rotate-90 transition ease-out duration-100" : ""}`} />
        </button>
      </div>
      <div className={`${isProjectsOpen ? "flex" : "hidden"} w-full flex-col gap-3 my-5`}>
        <CreateProjectButton />
        {DUMMY_PROJECTS.map((project) => (
          <ProjectTab
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </>
  );
}

export default ProjectsMenu;
