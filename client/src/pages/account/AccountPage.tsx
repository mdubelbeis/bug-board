import { useLoaderData } from 'react-router-dom';
import type { User } from '../../types/auth.ts';
import styles from './AccountPage.module.css';

// TODO: Edit Profile
// - update name
// - update email

// TODO: Change Password
// - current password
// - new password
// - confirm new password

const AccountPage = () => {
  const user = useLoaderData() as User;
  const { name, email, createdAt, updatedAt } = user;

  return (
    <section className={styles.accountPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Account</p>
          <h1>Account settings</h1>
          <p>View your profile information and manage account security.</p>
        </div>
      </header>

      <section className={styles.detailsGrid}>
        <article className={styles.profileCard}>
          <div className={styles.avatar}>{name.slice(0, 1).toUpperCase()}</div>

          <div>
            <h2>{name}</h2>
            <p>{email}</p>
          </div>
        </article>

        <article className={styles.detailsCard}>
          <h2>Account Overview</h2>

          <dl className={styles.metaList}>
            <div>
              <dt>Name</dt>
              <dd>{name}</dd>
            </div>

            <div>
              <dt>Email</dt>
              <dd>{email}</dd>
            </div>

            <div>
              <dt>Created</dt>
              <dd>{new Date(createdAt).toLocaleString()}</dd>
            </div>

            <div>
              <dt>Updated</dt>
              <dd>{new Date(updatedAt).toLocaleString()}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className={styles.panel}>
        <div>
          <h2>Profile Settings</h2>
          <p>Update your profile information when account editing is added.</p>
        </div>

        <div className={styles.buttonGroup}>
          <button type='button'>Edit Name</button>
          <button type='button'>Edit Email</button>
        </div>
      </section>

      <section className={styles.panel}>
        <div>
          <h2>Security</h2>
          <p>Manage password and account security options.</p>
        </div>

        <div className={styles.buttonGroup}>
          <button type='button'>Change Password</button>
        </div>
      </section>
    </section>
  );
};

export default AccountPage;
