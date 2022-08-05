import Proptypes from 'prop-types';
import ProjectCard from './ProjectCard';

function ProjectCarousel({ projects }) {
  return (
    <section>
      <h2>Projects</h2>
      <div className="flex items-center w-full gap-4 py-3 overflow-x-scroll no-scrollbar">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

ProjectCarousel.propTypes = {
  projects: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      title: Proptypes.string.isRequired,
      description: Proptypes.string.isRequired,
    })
  ).isRequired,
};

export default ProjectCarousel;
