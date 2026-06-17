import { Link, useLoaderData } from 'react-router-dom';
import type { ProjectsPageData } from '../../types/project.ts';

const ProjectsPage = () => {
  const { projects, projectsCount } = useLoaderData() as ProjectsPageData;

  return (
    <>
      <p>Total project: {projectsCount}</p>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <p>Project Title: {project.title}</p>
              <small>Project ID:{project._id}</small>
              <p>Project Description: {project.description}</p>
              <Link to={`/projects/${project._id}`}>View Project Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Current projects</p>
      )}
    </>
  );
};

export default ProjectsPage;
