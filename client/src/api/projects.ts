import type { CreateProjectData } from '../types/project.ts';

export async function getProjectsData(token: string) {
  const projectsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const projectsData = await projectsResponse.json();

  if (!projectsResponse.ok) {
    throw new Error(projectsData.message || 'Failed to fetch projects');
  }

  return projectsData;
}

export async function getProjectData(token: string, id: string) {
  const projectResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const projectData = await projectResponse.json();

  if (!projectResponse.ok) {
    throw new Error(projectData.message || 'Failed to fetch project');
  }

  return projectData;
}

export async function createProject(token: string, newProjectData: CreateProjectData) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newProjectData),
  });

  const projectData = await response.json();

  if (!response.ok) {
    throw new Error(projectData.message || 'Failed to create project');
  }

  return projectData.data.project;
}
