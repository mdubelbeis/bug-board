import type { BugData, BugStatus, CreateBugData } from '../types/bug.ts';

export async function getBugsData(token: string) {
  const bugsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bugs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const bugsData = await bugsResponse.json();

  if (!bugsResponse.ok) {
    throw new Error(bugsData.message || 'Failed to fetch projects');
  }

  return bugsData;
}

export async function getBugData(token: string, id: string) {
  const bugResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bugs/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const bugData = await bugResponse.json();

  if (!bugResponse.ok) {
    throw new Error(bugData.message || 'Failed to fetch project');
  }

  return bugData;
}

export async function createBug(token: string, newBugData: CreateBugData) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bugs`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newBugData),
  });

  const bugData = await response.json();

  if (!response.ok) {
    throw new Error(bugData.message || 'Failed to create project');
  }

  return bugData.data.bug;
}

export async function getProjectBugsData(token: string, projectId: string) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}/bugs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateBugStatus(
  token: string,
  bugId: string,
  status: BugStatus
): Promise<BugData> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bugs/${bugId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update bug status');
  }

  return data.data.bug;
}
