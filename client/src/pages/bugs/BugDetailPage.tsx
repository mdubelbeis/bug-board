import { Link, useLoaderData } from 'react-router-dom';
import type { BugData } from '../../types/bug.ts';
import styles from './BugDetailPage.module.css';

// TODO Project Context
//  - Project title/name
//  - link back to /projects/:projectId

// TODO Comments
//  - list of comments for this bug
//  - comment body
//  - author
//  - createdAt

const BugDetailPage = () => {
  const bug = useLoaderData() as BugData;

  return (
    <section className={styles.bugDetailPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Bug Details</p>
          <h1>{bug.title}</h1>
          <p>{bug.description}</p>
        </div>

        <div className={styles.headerActions}>
          <Link className={styles.secondaryLink} to='/bugs'>
            Back to Bugs
          </Link>

          <Link className={styles.primaryLink} to={`/projects/${bug.project}`}>
            View Project
          </Link>
        </div>
      </header>

      <section className={styles.detailsGrid}>
        <article className={styles.detailsCard}>
          <h2>Issue Status</h2>

          <div className={styles.badgeRow}>
            <span className={styles.statusBadge}>{bug.status}</span>
            <span className={styles.priorityBadge}>{bug.priority}</span>
            <span className={styles.severityBadge}>{bug.severity}</span>
          </div>
        </article>

        <article className={styles.detailsCard}>
          <h2>Timeline</h2>

          <dl className={styles.metaList}>
            <div>
              <dt>Created</dt>
              <dd>{new Date(bug.createdAt).toLocaleString()}</dd>
            </div>

            <div>
              <dt>Updated</dt>
              <dd>{new Date(bug.updatedAt).toLocaleString()}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Bug Description</h2>
            <p>Full issue details and context.</p>
          </div>
        </div>

        <div className={styles.descriptionCard}>
          <p>{bug.description}</p>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Project Context</h2>
            <p>This bug belongs to the project below.</p>
          </div>

          <Link to={`/projects/${bug.project}`}>Open Project</Link>
        </div>

        <dl className={styles.metaList}>
          <div>
            <dt>Project ID</dt>
            <dd>{bug.project}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Comments</h2>
            <p>Bug discussion and updates will appear here.</p>
          </div>
        </div>

        <div className={styles.emptyState}>
          <h3>No comments loaded yet</h3>
          <p>
            Once this page loader returns comments for the bug, this section can render the comment
            thread.
          </p>
        </div>
      </section>
    </section>
  );
};

export default BugDetailPage;
