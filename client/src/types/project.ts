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

export interface CreateProjectData {
  title: string;
  description: string;
}
