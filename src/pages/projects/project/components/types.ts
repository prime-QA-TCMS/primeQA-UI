import { Project, Milestone } from "../../../../types/database/Projects";
import { TestRun } from "../../../../types/database/Runs";

export interface ProjectListViewProps {
  projectObject: Project;
}

export interface ListItemProps {
  recordObject: Milestone;
  projectID: any;
}


export interface TestRunListItemProps {
  recordObject: TestRun;
  projectID: any;
}

