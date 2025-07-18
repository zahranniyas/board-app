import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Status = "todo" | "inProgress" | "approved" | "reject";

export interface Task {
  id: string;
  status: Status;
  category: string;
  title: string;
  priority: "high" | "medium" | "low";
  assignees: string[];
  cover?: string;
  links: number;
  comments: number;
  extra?: { type: "due" | "reports" | "event"; text: string };
}

interface TaskStore {
  tasks: Task[];
  setTasks: (t: Task[]) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      updateTask: (id, updates) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
    }),
    {
      name: "task-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);
