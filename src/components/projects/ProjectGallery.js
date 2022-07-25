import ProjectCard from "./ProjectCard";

function ProjectGallery() {
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
  return (
    <section className="flex items-center gap-4 overflow-x-scroll scroll-smooth w-full">
      {DUMMY_PROJECTS.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </section>
  );
}

export default ProjectGallery;
