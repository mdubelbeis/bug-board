import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { createProject } from '../../api/projects.ts';
import type { ProjectData } from '../../types/project.ts';
import styles from './CreateProjectPage.module.css';

const CreateProjectPage = () => {
  const token = useLoaderData() as string;
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const title = form.get('title');
    const description = form.get('description');

    if (typeof title !== 'string' || typeof description !== 'string') {
      return;
    }

    const projectTitle = title.trim();
    const projectDesc = description.trim();

    if (!projectTitle || !projectDesc) {
      return;
    }

    const project: ProjectData = await createProject(token, {
      title: projectTitle,
      description: projectDesc,
    });

    if (project) {
      navigate(`/projects/${project._id}`);
    }
  }

  return (
    <section className={styles.createProjectPage}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>New Project</p>
          <h1>Create a project</h1>
          <p>Add a workspace where bugs, priorities, and project work can be organized.</p>
        </div>

        <Link className={styles.secondaryLink} to='/projects'>
          Back to Projects
        </Link>
      </header>

      <section className={styles.formCard}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor='title'>Project Title</label>
            <input
              type='text'
              name='title'
              id='title'
              required
              placeholder='Example: Portfolio Redesign'
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='description'>Project Description</label>
            <textarea
              name='description'
              id='description'
              required
              rows={6}
              placeholder='Describe what this project is for...'
            />
          </div>

          <div className={styles.buttonGroup}>
            <Link className={styles.cancelLink} to='/projects'>
              Cancel
            </Link>

            <button className={styles.primaryButton} type='submit'>
              Create Project
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default CreateProjectPage;
