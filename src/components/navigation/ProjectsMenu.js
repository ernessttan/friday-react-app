/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import ProjectTab from "./ProjectTab";
import CreateProjectButton from "./CreateProjectButton";
import AuthContext from "../../context/AuthContext";

function ProjectsMenu() {
  const auth = useContext(AuthContext);
  const [projects, setProjects] = useState();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/projects/user/${auth.userId}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

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
        {projects && projects.map((project) => (
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
