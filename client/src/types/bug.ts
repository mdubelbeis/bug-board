export interface BugData {
  createdAt: string;
  createdBy: string;
  description: string;
  priority: string;
  project: string;
  severity: string;
  status: string;
  title: string;
  updatedAt: string;
  _id: string;
}

export interface BugsPageData {
  bugsCount: number;
  bugs: BugData[];
}

export interface CreateBugData {
  title: string;
  description: string;
  priority: string;
  severity: string;
  project: string;
}

export type BugStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
