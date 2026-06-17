import { useLoaderData, useNavigate } from 'react-router-dom';
import { createBug } from '../../api/bugs.ts';
import type { BugData } from '../../types/bug.ts';

const CreateBugPage = () => {
  const { token, projectId } = useLoaderData() as { token: string; projectId: string };
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
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
      title,
      description,
      priority,
      severity,
      project,
    });

    if (project) {
      navigate(`/bugs/${bug._id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title: </label>
        <input type='text' name='title' id='title' required />
      </div>
      <div>
        <label htmlFor='description'>Description: </label>
        <textarea name='description' id='description' required />
      </div>
      <div>
        <label htmlFor='priority'>Priority: </label>
        <select name='priority' id='priority' defaultValue={'LOW'} required>
          <option value='LOW'>Low</option>
          <option value='MEDIUM'>Medium</option>
          <option value='HIGH'>High</option>
          <option value='CRITICAL'>Critical</option>
        </select>
      </div>
      <div>
        <label htmlFor='severity'>Severity: </label>
        <select name='severity' id='severity' defaultValue={'MINOR'} required>
          <option value='MINOR'>Minor</option>
          <option value='MAJOR'>Major</option>
          <option value='BLOCKING'>Blocking</option>
        </select>
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default CreateBugPage;
