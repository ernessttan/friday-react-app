import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function ProjectGallery() {
  const [projects, setProjects] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

  return (
    <section className="flex items-center gap-4 overflow-x-scroll scroll-smooth w-full">
      {projects && (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))
      )}
    </section>
  );
}

export default ProjectGallery;
