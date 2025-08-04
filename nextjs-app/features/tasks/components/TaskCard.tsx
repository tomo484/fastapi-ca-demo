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
    <Card className={`transition-all duration-200 hover:shadow-md ${task.done ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        {/* デスクトップレイアウト */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* チェックボックス */}
            <button
              onClick={() => onToggleDone(task.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
                task.done 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-input hover:border-primary'
              }`}
            >
              {task.done && <span className="text-xs">✓</span>}
            </button>
            
            {/* タスクタイトル */}
            <span 
              className={`text-sm transition-all duration-200 ${
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
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              編集
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              削除
            </Button>
          </div>
        </div>

        {/* モバイルレイアウト */}
        <div className="sm:hidden space-y-3">
          <div className="flex items-center space-x-3">
            {/* チェックボックス */}
            <button
              onClick={() => onToggleDone(task.id)}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 transform active:scale-95 ${
                task.done 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-input hover:border-primary'
              }`}
            >
              {task.done && <span className="text-sm">✓</span>}
            </button>
            
            {/* タスクタイトル */}
            <span 
              className={`text-base transition-all duration-200 flex-1 ${
                task.done 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              }`}
            >
              {task.title || '無題のタスク'}
            </span>
          </div>

          {/* モバイル用アクションボタン */}
          <div className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(task)}
              className="text-xs px-3 py-2 min-h-[36px]"
            >
              編集
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-xs px-3 py-2 min-h-[36px] text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              削除
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

