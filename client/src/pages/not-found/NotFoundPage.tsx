import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main className={styles.notFoundPage}>
      <section className={styles.heroCard}>
        <p className={styles.errorCode}>404</p>

        <h1>Page not found</h1>

        <p>
          Sorry, we couldn’t find the page you were looking for. The link may be broken, the page
          may have moved, or you may not have access to it.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryLink} to='/'>
            Go Home
          </Link>
          <Link className={styles.secondaryLink} to='/dashboard'>
            Back to Dashboard
          </Link>
        </div>
      </section>

      <section className={styles.linksCard}>
        <h2>Helpful links</h2>

        <ul>
          <li>
            <Link to='/projects'>View Projects</Link>
          </li>
          <li>
            <Link to='/bugs'>View Bugs</Link>
          </li>
          <li>
            <Link to='/account'>Account Settings</Link>
          </li>
          <li>
            <Link to='/login'>Log In</Link>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default NotFoundPage;
