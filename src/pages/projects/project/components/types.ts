import { Project, Milestone, TestRun } from '../../../../types';

export interface ProjectListViewProps {
  projectObject: Project;
}

export interface ListItemProps {
  recordObject: Milestone;
  projectId: any;
}

export interface TestRunListItemProps {
  recordObject: TestRun;
  projectId: any;
}
