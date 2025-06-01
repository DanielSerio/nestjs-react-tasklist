import type { UseKanbanParams } from "#hooks/kanban/useKanban";
import type { useTasks } from "#hooks/useTasks";
import type { Pretty } from "#types/utility.types";

type KanbanBaseProps = UseKanbanParams;

export interface KanbanProps extends Omit<KanbanBaseProps, 'tasks'> {
  tasks: ReturnType<typeof useTasks>;
}

interface KanbanBodyProps extends KanbanBaseProps {
  isLoading?: boolean | null;
}

export type StaticKanbanProps = Pretty<KanbanBodyProps>;
export type DraggableKanbanProps = Pretty<KanbanBodyProps>;