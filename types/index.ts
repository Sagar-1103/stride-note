export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: string;
}

export interface ProjectsContextType {
  projects: Project[];
  addProject: (title: string) => void;
  addTask: (projectId: string, title: string) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  deleteProject: (projectId: string) => void;
  deleteTask: (projectId: string, taskId: string) => void;
}
