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
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスクのタイトルを入力してください"
        error={error}
      />
      
      <div className="flex space-x-2">
        <Button 
          type="submit" 
          isLoading={isLoading}
          className="flex-1"
        >
          {task ? '更新' : '追加'}
        </Button>
        
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            キャンセル
          </Button>
        )}
      </div>
    </form>
  );
}