import type { BugData } from './bug.ts';
import type { ProjectData } from './project.ts';

export interface DashboardData {
  projects: ProjectData[];
  bugs: BugData[];
}
