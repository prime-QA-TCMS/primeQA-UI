export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  role: string;
  status?: 'Active' | 'Suspended' | 'Pending';
  avatarUrl?: string;
  timezone?: string;
  language?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  _id?: string;
  name: string;
  permissions: string[];
  defaultForNewUsers?: boolean;
}

export interface Todo {
  _id?: string;
  projectId?: string;       // optional: can belong to a specific project
  title: string;
  description?: string;
  type?: 'Task' | 'Bug' | 'Improvement' | 'Idea';
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  status?: 'Open' | 'In Progress' | 'Blocked' | 'Done' | 'Archived';
  assignedTo?: string;      // User ID
  createdBy?: string;       // User ID
  relatedEntity?: {
    type: 'Project' | 'Suite' | 'TestCase' | 'Run' | 'Result' | 'Milestone';
    id: string;
  };
  dueDate?: string;
  tags?: string[];
  comments?: TodoComment[];
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoComment {
  _id?: string;
  todoId?: string;
  authorId: string;
  comment: string;
  createdAt?: string;
}
