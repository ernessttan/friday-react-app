/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Proptypes from "prop-types";
import ProjectTab from "./ProjectTab";
import CreateProjectButton from "./CreateProjectButton";
import AuthContext from "../../context/AuthContext";

function ProjectsMenu({ toggleNav }) {
  const auth = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      await fetch(`https://friday-productivity.herokuapp.com/projects/user/${auth.userId}`)
        .then((res) => res.json())
        .then((data) => setProjects(data.projects));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
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
        <CreateProjectButton
          toggleNav={toggleNav}
          fetchProjects={fetchProjects}
        />
        {projects && projects.map((project) => (
          <ProjectTab
            key={project.id}
            projectData={project}
            fetchProjects={fetchProjects}
          />
        ))}
      </div>
    </>
  );
}

ProjectsMenu.propTypes = {
  toggleNav: Proptypes.func.isRequired,
};

export default ProjectsMenu;
