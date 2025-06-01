import type { UseKanbanParams } from "#hooks/kanban/useKanban";
import type { useTaskDrawer } from "#hooks/kanban/useTaskDrawer";
import type { useTasks } from "#hooks/useTasks";
import type { Pretty } from "#types/utility.types";

type KanbanBaseProps = UseKanbanParams;

export interface KanbanProps extends Omit<KanbanBaseProps, 'tasks'> {
  tasks: ReturnType<typeof useTasks>;
  taskDrawerController: ReturnType<typeof useTaskDrawer>;
}

interface KanbanBodyProps extends KanbanBaseProps {
  isLoading?: boolean | null;
  taskDrawerController: ReturnType<typeof useTaskDrawer>;
}

export type StaticKanbanProps = Pretty<KanbanBodyProps>;
export type DraggableKanbanProps = Pretty<KanbanBodyProps>;