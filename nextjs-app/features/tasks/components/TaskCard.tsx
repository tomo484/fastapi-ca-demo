// features/tasks/components/TaskCard.tsx
import { Task } from '@/types/api.types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TaskCardProps {
  task: Task;
  onToggleDone: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onToggleDone, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className={task.done ? 'opacity-75' : ''}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* チェックボックス */}
            <button
              onClick={() => onToggleDone(task.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                task.done 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-input hover:border-primary'
              }`}
            >
              {task.done && <span className="text-xs">✓</span>}
            </button>
            
            {/* タスクタイトル */}
            <span 
              className={`text-sm ${
                task.done 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              }`}
            >
              {task.title || '無題のタスク'}
            </span>
          </div>

          {/* アクションボタン */}
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="text-muted-foreground hover:text-foreground"
            >
              編集
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              削除
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

