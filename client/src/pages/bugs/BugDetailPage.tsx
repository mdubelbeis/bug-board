import { Link, useLoaderData } from 'react-router-dom';
import type { BugData, BugStatus } from '../../types/bug.ts';
import styles from './BugDetailPage.module.css';
import { useState } from 'react';
import { updateBugStatus } from '../../api/bugs.ts';

// TODO Comments
//  - list of comments for this bug
//  - comment body
//  - author
//  - createdAt

const BugDetailPage = () => {
  const loadedBug = useLoaderData() as BugData;

  const [bug, setBug] = useState(loadedBug);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const status = bug.status === 'IN_PROGRESS' ? 'IN PROGRESS' : bug.status;

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as BugStatus;
    const token = localStorage.getItem('token');

    if (!token) {
      setStatusError('You must be logged in to update bug status.');
      return;
    }

    setIsUpdatingStatus(true);
    setStatusError(null);

    try {
      const updatedBug = await updateBugStatus(token, bug._id, newStatus);
      setBug(updatedBug);
    } catch (err) {
      if (err instanceof Error) {
        setStatusError(err.message);
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  }

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
            <span className={styles.statusBadge}>{status}</span>
            <span className={styles.priorityBadge}>{bug.priority}</span>
            <span className={styles.severityBadge}>{bug.severity}</span>
          </div>
        </article>

        <article className={styles.detailsCard}>
          <h2>Issue Status</h2>

          <div className={styles.badgeRow}>
            <span className={styles.statusBadge}>{bug.status.replace('_', ' ')}</span>
            <span className={styles.priorityBadge}>{bug.priority}</span>
            <span className={styles.severityBadge}>{bug.severity}</span>
          </div>

          <div className={styles.statusControl}>
            <label htmlFor='status'>Update Status</label>

            <select
              id='status'
              name='status'
              value={bug.status}
              onChange={handleStatusChange}
              disabled={isUpdatingStatus}
            >
              <option value='OPEN'>Open</option>
              <option value='IN_PROGRESS'>In Progress</option>
              <option value='RESOLVED'>Resolved</option>
              <option value='CLOSED'>Closed</option>
            </select>

            {isUpdatingStatus && <p className={styles.statusNote}>Updating status...</p>}
            {statusError && <p className={styles.statusError}>{statusError}</p>}
          </div>
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
