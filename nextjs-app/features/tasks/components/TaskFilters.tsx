// features/tasks/components/TaskFilters.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface TaskFiltersProps {
  onFilterChange: (filters: { status: 'all' | 'done' | 'pending'; search: string }) => void;
}

export function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  const [status, setStatus] = useState<'all' | 'done' | 'pending'>('all');
  const [search, setSearch] = useState('');

  const handleStatusChange = (newStatus: 'all' | 'done' | 'pending') => {
    setStatus(newStatus);
    onFilterChange({ status: newStatus, search });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ status, search: value });
  };

  return (
    <div className="space-y-4">
      {/* ステータスフィルター */}
      <div className="flex space-x-2">
        <Button
          variant={status === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleStatusChange('all')}
        >
          全て
        </Button>
        <Button
          variant={status === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleStatusChange('pending')}
        >
          未完了
        </Button>
        <Button
          variant={status === 'done' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleStatusChange('done')}
        >
          完了
        </Button>
      </div>

      {/* 検索 */}
      <Input
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="タスクを検索..."
      />
    </div>
  );
}