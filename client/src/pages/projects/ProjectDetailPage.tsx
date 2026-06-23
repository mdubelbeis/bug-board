import { Link, useLoaderData } from 'react-router-dom';
import type { ProjectData } from '../../types/project.ts';
import styles from './ProjectDetailPage.module.css';

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
    <section className={styles.projectDetailPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Project Details</p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>

        <div className={styles.headerActions}>
          <Link className={styles.secondaryLink} to='/projects'>
            Back to Projects
          </Link>
          <Link className={styles.primaryLink} to={`/projects/${project._id}/bugs/new`}>
            Create Bug
          </Link>
        </div>
      </header>

      <section className={styles.detailsGrid}>
        <article className={styles.detailsCard}>
          <h2>Project Info</h2>

          <dl className={styles.metaList}>
            <div>
              <dt>Project ID</dt>
              <dd>{project._id}</dd>
            </div>

            <div>
              <dt>Created</dt>
              <dd>{new Date(project.createdAt).toLocaleString()}</dd>
            </div>

            <div>
              <dt>Updated</dt>
              <dd>{new Date(project.updatedAt).toLocaleString()}</dd>
            </div>
          </dl>
        </article>

        <article className={styles.detailsCard}>
          <h2>Bug Summary</h2>

          <div className={styles.summaryGrid}>
            <div>
              <span>Total Bugs</span>
              <strong>0</strong>
            </div>

            <div>
              <span>Open Bugs</span>
              <strong>0</strong>
            </div>

            <div>
              <span>High/Critical</span>
              <strong>0</strong>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Project Bugs</h2>
            <p>Bugs connected to this project will appear here.</p>
          </div>

          <Link to={`/projects/${project._id}/bugs/new`}>Add Bug</Link>
        </div>

        <div className={styles.emptyState}>
          <h3>No bugs loaded yet</h3>
          <p>
            Once this page loader returns bugs for the project, this section can become a bug list
            or table.
          </p>
        </div>
      </section>

      <section className={styles.dangerZone}>
        <div>
          <h2>Danger Zone</h2>
          <p>Delete this project only when you are sure it is no longer needed.</p>
        </div>

        <button disabled type='button'>
          Delete Project
        </button>
      </section>
    </section>
  );
};

export default ProjectDetailPage;
