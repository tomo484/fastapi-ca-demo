// features/tasks/components/TaskForm.tsx
import { useState } from 'react';
import { Task, TaskCreateRequest } from '@/types/api.types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface TaskFormProps {
  task?: Task; // 編集時のみ渡される
  onSubmit: (data: TaskCreateRequest) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    if (!title.trim()) {
      setError('タスクタイトルは必須です');
      return;
    }

    setError('');
    onSubmit({ title: title.trim() });
    
    // 新規作成の場合のみフォームをリセット
    if (!task) {
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスクのタイトルを入力してください"
          error={error}
          className="transition-all duration-200 focus:scale-[1.01]"
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          {title.length}/100文字
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          type="submit" 
          isLoading={isLoading}
          className="flex-1 transition-all duration-200"
          disabled={!title.trim()}
        >
          {task ? '更新' : '追加'}
        </Button>
        
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
            className="sm:min-w-[100px] transition-all duration-200"
          >
            キャンセル
          </Button>
        )}
      </div>
    </form>
  );
}