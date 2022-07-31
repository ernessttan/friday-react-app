import { useEffect, useState, useContext } from "react";
import ProjectTab from "./ProjectTab";
import AuthContext from "../../../context/AuthContext";

function ProjectGallery() {
  const auth = useContext(AuthContext);
  const [projects, setProjects] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        fetch(`https://friday-productivity.herokuapp.com/projects/user/${auth.userId}`)
          .then((res) => res.json())
          .then((data) => setProjects(data.projects));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <h3 className="text-black font-bold">Projects</h3>
      <section className="flex items-center gap-4 overflow-x-scroll scroll-smooth w-full">
        {projects && (
          projects.map((project) => (
            <ProjectTab
              key={project.id}
              project={project}
            />
          ))
        )}
      </section>
    </>

  );
}

export default ProjectGallery;
