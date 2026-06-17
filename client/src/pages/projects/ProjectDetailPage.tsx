import { useLoaderData } from 'react-router-dom';
import type { ProjectData } from '../../types/project.ts';

// TODO Project Bug Summary
//  - Total bugs
//  - Open bugs
//  - high/critical bugs
// TODO Bugs for this project
//  - list/table of bugs belonging to this project
//  - status
//  - priority
//  - severity
//  - updatedAt
//  - link to /bugs/:bugId (shows bug comments)
// TODO Delete project button

const ProjectDetailPage = () => {
  const project = useLoaderData() as ProjectData;
  return (
    <main>
      <section>
        <p>Project Title: {project.title}</p>
        <small>Project ID: {project._id}</small>
        <p>Project Description: {project.description}</p>
        <p>Created: {project.createdAt}</p>
        <p>Updated: {project.updatedAt}</p>
      </section>
      <section>
        <button>Delete Project</button>
      </section>
    </main>
  );
};

export default ProjectDetailPage;
