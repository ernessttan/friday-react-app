import { useEffect, useState, useContext } from "react";
import ProjectTab from "./ProjectTab";
import AuthContext from "../../../context/AuthContext";

function ProjectGallery() {
  const auth = useContext(AuthContext);
  const [projects, setProjects] = useState();

  useEffect(() => {
    fetch(`http://localhost:4000/projects/user/${auth.userId}`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

  return (
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
  );
}

export default ProjectGallery;
