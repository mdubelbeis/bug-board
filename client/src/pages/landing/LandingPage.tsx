import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <section className={styles.landingPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Bug-Board</p>

          <h1>Track bugs, manage projects, and keep development work organized.</h1>

          <p>
            Bug-Board helps developers and teams manage software projects, track issues, assign
            priorities, update statuses, and keep conversations connected to the work that matters.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryLink} to='/signup'>
              Get Started
            </Link>
            <Link className={styles.secondaryLink} to='/login'>
              Log In
            </Link>
          </div>
        </div>

        <div className={styles.heroPanel} aria-label='Bug-Board preview'>
          <div className={styles.previewHeader}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles.previewBody}>
            <div className={styles.previewStat}>
              <span>Projects</span>
              <strong>12</strong>
            </div>

            <div className={styles.previewStat}>
              <span>Open Bugs</span>
              <strong>34</strong>
            </div>

            <div className={styles.previewIssue}>
              <span className={styles.statusBadge}>OPEN</span>
              <p>Login form validation issue</p>
            </div>

            <div className={styles.previewIssue}>
              <span className={styles.priorityBadge}>HIGH</span>
              <p>Project detail page not loading comments</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.sectionHeader}>
          <h2>Built for simple issue tracking</h2>
          <p>
            Manage projects, bugs, priorities, severities, and comments from one clean dashboard.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <h3>Project Management</h3>
            <p>Create and organize projects so every bug is connected to the right workspace.</p>
          </article>

          <article className={styles.featureCard}>
            <h3>Bug Tracking</h3>
            <p>Track bugs by status, priority, severity, project, and update history.</p>
          </article>

          <article className={styles.featureCard}>
            <h3>Team Discussion</h3>
            <p>Keep comments attached to bugs so conversations stay tied to the issue.</p>
          </article>
        </div>
      </section>

      <section className={styles.focusSection}>
        <div>
          <h2>Focus on what needs attention</h2>
          <p>
            See open bugs, high-priority issues, recent updates, and project activity from your
            dashboard.
          </p>
        </div>

        <ul className={styles.checkList}>
          <li>View all active projects</li>
          <li>Review open and in-progress bugs</li>
          <li>Identify high-priority and critical issues</li>
          <li>Open bug details and review comments</li>
        </ul>
      </section>

      <section className={styles.ctaSection}>
        <h2>Ready to clean up your bug workflow?</h2>
        <p>Create an account, add your first project, and start tracking issues in minutes.</p>

        <Link className={styles.primaryLink} to='/signup'>
          Create Account
        </Link>
      </section>
    </section>
  );
};

export default LandingPage;
