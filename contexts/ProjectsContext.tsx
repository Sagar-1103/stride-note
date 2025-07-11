import { Project, ProjectsContextType, Task } from "@/types";
import { loadProjects, saveProjects } from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedProjects = await loadProjects();
      setProjects(loadedProjects);
    };
    loadData();
  }, []);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const addProject = (title: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const addTask = (projectId: string, title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, newTask] }
          : project
      )
    );
  };

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : project
      )
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      )
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        addTask,
        toggleTask,
        deleteProject,
        deleteTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
