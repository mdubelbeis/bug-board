import type { BugData } from './bug.ts';

export interface ProjectData {
  createdAt: string;
  description: string;
  owner: string;
  title: string;
  updatedAt: string;
  _id: string;
}

export interface ProjectsPageData {
  projects: ProjectData[];
  projectsCount: number;
}

export interface ProjectDetailPageData {
  project: ProjectData;
  bugs: BugData[];
}

export interface CreateProjectData {
  title: string;
  description: string;
}
