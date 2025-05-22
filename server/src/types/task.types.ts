import { Pretty } from "./utility.types";

export interface TaskStatusCreate {
  name: string;
};

export interface TaskStatusRecord extends TaskStatusCreate {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export interface TaskCategoryCreate {
  name: string;
};

export interface TaskCategoryRecord extends TaskCategoryCreate {
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

export type TaskRecord = Pretty<TaskBody>;