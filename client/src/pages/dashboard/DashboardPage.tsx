import { Link, useLoaderData } from 'react-router-dom';
import type { DashboardData } from '../../types/dashboard.ts';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const data = useLoaderData() as DashboardData;

  const recentProjects = data.projects.slice(0, 4);
  const recentBugs = data.bugs
    .toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <section className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Dashboard</p>
          <h1>Project overview</h1>
          <p>Review your active projects and recently reported bugs.</p>
        </div>

        <div className={styles.headerActions}>
          <Link className={styles.primaryLink} to='/projects/new'>
            New Project
          </Link>
          <Link className={styles.secondaryLink} to='/bugs'>
            View Bugs
          </Link>
        </div>
      </header>

      <section className={styles.statsGrid} aria-label='Dashboard summary'>
        <article className={styles.statCard}>
          <span>Total Projects</span>
          <strong>{data.projects.length}</strong>
        </article>

        <article className={styles.statCard}>
          <span>Total Bugs</span>
          <strong>{data.bugs.length}</strong>
        </article>

        <article className={styles.statCard}>
          <span>Open Bugs</span>
          <strong>{data.bugs.filter((bug) => bug.status === 'OPEN').length}</strong>
        </article>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Projects</h2>
              <p>Your most recent project workspaces.</p>
            </div>
            <Link to='/projects'>View all</Link>
          </div>

          {recentProjects.length > 0 ? (
            <ul className={styles.cardList}>
              {recentProjects.map((project) => (
                <li className={styles.itemCard} key={project._id}>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <div className={styles.metaRow}>
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                    <Link to={`/projects/${project._id}`}>View Project</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <p>No current projects.</p>
              <Link to='/projects/new'>Create your first project</Link>
            </div>
          )}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Bugs</h2>
              <p>Recent bugs across your projects.</p>
            </div>
            <Link to='/bugs'>View all</Link>
          </div>

          {recentBugs.length > 0 ? (
            <ul className={styles.cardList}>
              {recentBugs.map((bug) => (
                <li className={styles.itemCard} key={bug._id}>
                  <div>
                    <div className={styles.badgeRow}>
                      <span className={styles.statusBadge}>{bug.status}</span>
                      <span className={styles.priorityBadge}>{bug.priority}</span>
                    </div>

                    <h3>{bug.title}</h3>
                    <p>{bug.description}</p>
                  </div>

                  <div className={styles.metaRow}>
                    <span>Updated {new Date(bug.updatedAt).toLocaleDateString()}</span>
                    <Link to={`/bugs/${bug._id}`}>View Bug</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <p>No current bugs.</p>
              <Link to='/projects'>Open a project to create a bug</Link>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default DashboardPage;
