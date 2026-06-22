import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { createBug } from '../../api/bugs.ts';
import type { BugData } from '../../types/bug.ts';
import styles from './CreateBugPage.module.css';

const CreateBugPage = () => {
  const { token, projectId } = useLoaderData() as { token: string; projectId: string };
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const title = form.get('title');
    const description = form.get('description');
    const priority = form.get('priority');
    const severity = form.get('severity');
    const project = projectId;

    if (
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      typeof priority !== 'string' ||
      typeof severity !== 'string'
    ) {
      return;
    }

    const bugTitle = title.trim();
    const bugDesc = description.trim();

    if (!bugTitle || !bugDesc) {
      return;
    }

    const bug: BugData = await createBug(token, {
      title: bugTitle,
      description: bugDesc,
      priority,
      severity,
      project,
    });

    if (bug) {
      navigate(`/bugs/${bug._id}`);
    }
  }

  return (
    <section className={styles.createBugPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>New Bug</p>
          <h1>Create a bug</h1>
          <p>Add an issue to this project and assign its priority and severity.</p>
        </div>

        <Link className={styles.secondaryLink} to={`/projects/${projectId}`}>
          Back to Project
        </Link>
      </header>

      <section className={styles.formCard}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              required
              placeholder='Example: Login button does not submit'
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              required
              rows={6}
              placeholder='Describe the issue, expected behavior, and steps to reproduce...'
            />
          </div>

          <div className={styles.selectGrid}>
            <div className={styles.formGroup}>
              <label htmlFor='priority'>Priority</label>
              <select name='priority' id='priority' defaultValue='LOW' required>
                <option value='LOW'>Low</option>
                <option value='MEDIUM'>Medium</option>
                <option value='HIGH'>High</option>
                <option value='CRITICAL'>Critical</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='severity'>Severity</label>
              <select name='severity' id='severity' defaultValue='MINOR' required>
                <option value='MINOR'>Minor</option>
                <option value='MAJOR'>Major</option>
                <option value='BLOCKING'>Blocking</option>
              </select>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Link className={styles.cancelLink} to={`/projects/${projectId}`}>
              Cancel
            </Link>

            <button className={styles.primaryButton} type='submit'>
              Create Bug
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default CreateBugPage;
