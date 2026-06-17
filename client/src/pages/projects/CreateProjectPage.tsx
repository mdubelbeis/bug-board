import { useLoaderData, useNavigate } from 'react-router-dom';
import { createProject } from '../../api/projects.ts';
import type { ProjectData } from '../../types/project.ts';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Project Title: </label>
        <input type='text' name='title' id='title' required />
      </div>
      <div>
        <label htmlFor='description'>Project Description: </label>
        <textarea name='description' id='description' required />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default CreateProjectPage;
