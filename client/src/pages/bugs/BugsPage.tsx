import { Link, useLoaderData } from 'react-router-dom';
import type { BugsPageData } from '../../types/bug.ts';

function BugsPage() {
  const { bugs, bugsCount } = useLoaderData() as BugsPageData;
  return (
    <main>
      <p>Total bugs: {bugsCount}</p>
      {bugs.length > 0 ? (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id}>
              <p>Bug Title: {bug.title}</p>
              <p>Bug Description: {bug.description}</p>
              <Link to={`/bugs/${bug._id}`}>View Bug Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Current Bugs</p>
      )}
    </main>
  );
}

export default BugsPage;
