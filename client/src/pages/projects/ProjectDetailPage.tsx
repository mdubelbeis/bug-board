import { Link, useLoaderData } from 'react-router-dom';
import type { ProjectDetailPageData } from '../../types/project.ts';
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
  const { project, bugs } = useLoaderData() as ProjectDetailPageData;

  const totalBugs = bugs.length;
  const openBugs = bugs.filter((bug) => bug.status === 'OPEN').length;
  const highCriticalBugs = bugs.filter(
    (bug) => bug.priority === 'HIGH' || bug.priority === 'CRITICAL'
  ).length;

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
              <strong>{totalBugs}</strong>
            </div>

            <div>
              <span>Open Bugs</span>
              <strong>{openBugs}</strong>
            </div>

            <div>
              <span>High/Critical</span>
              <strong>{highCriticalBugs}</strong>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Project Bugs</h2>
            <p>Bugs connected to this project.</p>
          </div>

          <Link to={`/projects/${project._id}/bugs/new`}>Add Bug</Link>
        </div>

        {bugs.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No bugs yet</h3>
            <p>Create the first bug for this project to start tracking issues.</p>
          </div>
        ) : (
          <div className={styles.bugList}>
            {bugs.map((bug) => (
              <Link key={bug._id} to={`/bugs/${bug._id}`} className={styles.bugCard}>
                <div className={styles.bugCardHeader}>
                  <h3>{bug.title}</h3>
                  <span className={styles.statusBadge}>{bug.status.replace('_', ' ')}</span>
                </div>

                <p>{bug.description}</p>

                <div className={styles.bugMeta}>
                  <span>Priority: {bug.priority}</span>
                  <span>Severity: {bug.severity}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
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
