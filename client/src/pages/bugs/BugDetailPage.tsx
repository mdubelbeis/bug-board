import { Link, useLoaderData } from 'react-router-dom';
import type { BugData } from '../../types/bug.ts';

// TODO Project Context
//  - Project title/name
//  - link back to /projects/:projectId

// TODO Comments
//  - list of comments for this bug
//  - comment body
//  - author
//  - createdAt
const BugDetailPage = () => {
  const bug = useLoaderData() as BugData;
  return (
    <main>
      <div>
        <p>Bug Title: {bug.title}</p>
        <p>Bug Description: {bug.description}</p>
        <p>Bug Status: {bug.status}</p>
        <p>Bug Priority: {bug.priority}</p>
        <p>Bug Severity: {bug.severity}</p>
        <p>Created: {bug.createdAt}</p>
        <p>Updated: {bug.updatedAt}</p>
      </div>
      <Link to={`/projects/${bug.project}`}>View Project Details</Link>
    </main>
  );
};

export default BugDetailPage;
