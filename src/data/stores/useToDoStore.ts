import { create } from "zustand";

import { generateId } from "../helpers";
import { persist } from "zustand/middleware";

interface Task {
  id: string;
  title: string;
  createdAd: number;
  completed: boolean;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
  completedTask: (id: string) => void;
  completedTaskBack: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      createTask: (title) => {
        const { tasks } = get();
        const newTask = {
          id: generateId(),
          title,
          createdAd: Date.now(),
          completed: false,
        };

        set({
          tasks: [newTask].concat(tasks),
        });
      },
      updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
          })),
        });
      },
      removeTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.filter((task) => task.id !== id),
        });
      },
      completedTask: (id: string) => {
        const { tasks } = get();
        const item = tasks.filter((task) => task.id === id);
        item[0].completed = true;
        set({
          tasks: [...tasks.filter((task) => task.id !== id), item[0]],
        });
        console.log(item[0]);
      },
      completedTaskBack: (id: string) => {
        const { tasks } = get();
        const item = tasks.filter((task) => task.id === id);
        item[0].completed = false;

        set({
          tasks: [item[0]].concat(...tasks.filter((task) => task.id !== id)),
        });
      },
    }),
    { name: "todoStorage" }
  )
);
