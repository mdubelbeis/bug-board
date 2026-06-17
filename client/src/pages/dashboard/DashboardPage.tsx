import { Link, useLoaderData } from 'react-router-dom';
import type { DashboardData } from '../../types/dashboard.ts';

const DashboardPage = () => {
  const data = useLoaderData() as DashboardData;

  return (
    <main>
      <section>
        <h2>Projects</h2>
        {data.projects.length > 0 ? (
          <ul>
            {data.projects.map((project) => (
              <li key={project._id}>
                <p>{project.title}</p>
                <p>{project.description}</p>
                <p>{project.createdAt}</p>
                <p>{project.updatedAt}</p>
                <Link to={`/projects/${project._id}`}>View Project Details</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Current Projects</p>
        )}
      </section>
      <section>
        <h2>Bugs</h2>
        {data.bugs.length > 0 ? (
          <ul>
            {data.bugs.map((bug) => (
              <li key={bug._id}>
                <p>{bug.title}</p>
                <p>{bug.description}</p>
                <p>{bug.createdAt}</p>
                <p>{bug.updatedAt}</p>
                <Link to={`/bugs/${bug._id}`}>View Bug Details</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Current Bugs</p>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
