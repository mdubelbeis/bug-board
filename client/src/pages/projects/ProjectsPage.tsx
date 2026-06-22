import { Link, useLoaderData } from 'react-router-dom';
import type { ProjectsPageData } from '../../types/project.ts';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const { projects, projectsCount } = useLoaderData() as ProjectsPageData;

  return (
    <section className={styles.projectsPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Projects</p>
          <h1>Your projects</h1>
          <p>View and manage the workspaces where your bugs are organized.</p>
        </div>

        <Link className={styles.primaryLink} to='/projects/new'>
          New Project
        </Link>
      </header>

      <section className={styles.summaryGrid} aria-label='Projects summary'>
        <article className={styles.summaryCard}>
          <span>Total Projects</span>
          <strong>{projectsCount}</strong>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Project list</h2>
            <p>Open a project to view details and manage its bugs.</p>
          </div>
        </div>

        {projects.length > 0 ? (
          <ul className={styles.projectGrid}>
            {projects.map((project) => (
              <li className={styles.projectCard} key={project._id}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <dl className={styles.metaList}>
                  <div>
                    <dt>Project ID</dt>
                    <dd>{project._id}</dd>
                  </div>
                  <div>
                    <dt>Updated</dt>
                    <dd>{new Date(project.updatedAt).toLocaleDateString()}</dd>
                  </div>
                </dl>

                <Link className={styles.cardLink} to={`/projects/${project._id}`}>
                  View Project Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <h3>No current projects</h3>
            <p>Create your first project to start tracking bugs and project work.</p>
            <Link to='/projects/new'>Create Project</Link>
          </div>
        )}
      </section>
    </section>
  );
};

export default ProjectsPage;
