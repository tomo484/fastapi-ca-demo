// features/tasks/components/TaskList.tsx
import { Task } from '@/types/api.types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleDone: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, isLoading, onToggleDone, onEdit, onDelete }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground text-lg mb-2">
          タスクがありません
        </div>
        <div className="text-muted-foreground text-sm">
          新しいタスクを追加してみましょう
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}