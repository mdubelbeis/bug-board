import { Link, useLoaderData } from 'react-router-dom';
import type { BugsPageData } from '../../types/bug.ts';
import styles from './BugsPage.module.css';

function BugsPage() {
  const { bugs, bugsCount } = useLoaderData() as BugsPageData;

  return (
    <section className={styles.bugsPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Bugs</p>
          <h1>Bug tracker</h1>
          <p>Review bugs across your projects and open each issue for more detail.</p>
        </div>
      </header>

      <section className={styles.summaryGrid} aria-label='Bug summary'>
        <article className={styles.summaryCard}>
          <span>Total Bugs</span>
          <strong>{bugsCount}</strong>
        </article>

        <article className={styles.summaryCard}>
          <span>Open Bugs</span>
          <strong>{bugs.filter((bug) => bug.status === 'OPEN').length}</strong>
        </article>

        <article className={styles.summaryCard}>
          <span>High/Critical</span>
          <strong>
            {bugs.filter((bug) => bug.priority === 'HIGH' || bug.priority === 'CRITICAL').length}
          </strong>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>All bugs</h2>
            <p>View bug status, priority, severity, and details.</p>
          </div>
        </div>

        {bugs.length > 0 ? (
          <ul className={styles.bugList}>
            {bugs.map((bug) => (
              <li className={styles.bugCard} key={bug._id}>
                <div className={styles.bugHeader}>
                  <div>
                    <div className={styles.badgeRow}>
                      <span className={styles.statusBadge}>{bug.status}</span>
                      <span className={styles.priorityBadge}>{bug.priority}</span>
                      <span className={styles.severityBadge}>{bug.severity}</span>
                    </div>

                    <h3>{bug.title}</h3>
                    <p>{bug.description}</p>
                  </div>
                </div>

                <div className={styles.metaRow}>
                  <span>Updated {new Date(bug.updatedAt).toLocaleDateString()}</span>
                  <Link to={`/bugs/${bug._id}`}>View Bug Details</Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <h3>No current bugs</h3>
            <p>Create a bug from one of your project detail pages.</p>
            <Link to='/projects'>View Projects</Link>
          </div>
        )}
      </section>
    </section>
  );
}

export default BugsPage;
