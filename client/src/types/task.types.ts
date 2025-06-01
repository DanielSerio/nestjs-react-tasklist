import type { Pretty } from "./utility.types";

export interface TaskStatusCreate {
  name: string;
};

export interface TaskStatus extends TaskStatusCreate {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export interface TaskCategoryCreate {
  name: string;
};

export interface TaskCategory extends TaskCategoryCreate {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

interface TaskCreateBody {
  name: string;
  categoryId?: number | null;
  priority?: number | null;
}

export type TaskCreate = Pretty<TaskCreateBody>;

interface TaskUpdateBody extends TaskCreateBody {
  name: string;
  statusId: number | null;
  categoryId: number | null;
  priority: number | null;
}

export type TaskUpdate = Partial<TaskUpdateBody>;

interface TaskBody extends TaskUpdateBody {
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type Task = Pretty<TaskBody> & { id: number; };