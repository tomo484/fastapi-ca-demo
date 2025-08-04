'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { TaskForm } from '@/features/tasks/components/TaskForm';
import { TaskFilters } from '@/features/tasks/components/TaskFilters';
import { TaskList } from '@/features/tasks/components/TaskList';
import { Task, TaskCreateRequest } from '@/types/api.types';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { useTasksMutation } from '@/features/tasks/hooks/useTasksMutation';
import { useTaskFilters } from '@/hooks/useTaskFilters';

export default function HomePage() {
  // API経由でのデータ取得
  const { data: tasks, isLoading, error } = useTasks();
  const { createTask, updateTask, deleteTask, markDone, markPending } = useTasksMutation();
  
  // URLパラメータで管理されるフィルター
  const { filters, updateFilters } = useTaskFilters();

  // 編集中タスク（ローカル状態として残す）
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // フィルタリングされたタスク
  const filteredTasks = tasks?.filter((task) => {
    // done フィルター
    if (filters.done !== undefined && task.done !== filters.done) return false;

    // 検索フィルター
    if (filters.search && !task.title?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    return true;
  }) || [];

  // タスク作成
  const handleCreateTask = async (data: TaskCreateRequest) => {
    try {
      await createTask.mutateAsync(data);
    } catch (error) {
      console.error('タスク作成に失敗しました:', error);
    }
  };

  // タスク更新
  const handleUpdateTask = async (data: TaskCreateRequest) => {
    if (!editingTask) return;
    
    try {
      await updateTask.mutateAsync({ id: editingTask.id, data });
      setEditingTask(null);
    } catch (error) {
      console.error('タスク更新に失敗しました:', error);
    }
  };

  // 完了状態切り替え
  const handleToggleDone = async (id: number) => {
    const task = tasks?.find(t => t.id === id);
    if (!task) return;

    try {
      if (task.done) {
        await markPending.mutateAsync(id);
      } else {
        await markDone.mutateAsync(id);
      }
    } catch (error) {
      console.error('完了状態の切り替えに失敗しました:', error);
    }
  };

  // タスク編集開始
  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  // タスク削除
  const handleDelete = async (id: number) => {
    try {
      await deleteTask.mutateAsync(id);
    } catch (error) {
      console.error('タスク削除に失敗しました:', error);
    }
  };

  // 編集キャンセル
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // フィルター変更
  const handleFilterChange = (newFilters: {
    status: 'all' | 'done' | 'pending';
    search: string;
  }) => {
    updateFilters({
      done: newFilters.status === 'all' ? undefined : newFilters.status === 'done',
      search: newFilters.search,
    });
  };

  // ローディング状態
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="タスク管理アプリ" />
        <main>
          <Container className="py-8">
            <div className="flex justify-center items-center min-h-64">
              <div className="text-lg text-gray-600">読み込み中...</div>
            </div>
          </Container>
        </main>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="タスク管理アプリ" />
        <main>
          <Container className="py-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-red-600">
                  <p className="text-lg font-semibold mb-2">エラーが発生しました</p>
                  <p className="text-sm">
                    データの読み込みに失敗しました。しばらく時間をおいて再度お試しください。
                  </p>
                </div>
              </CardContent>
            </Card>
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーエリア */}
      <Header title="タスク管理アプリ" />

      {/* メインコンテンツエリア */}
      <main>
        <Container className="py-8">
          {/* 新規タスク追加エリア */}
          <section className="mb-8">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  {editingTask ? 'タスクを編集' : '新しいタスクを追加'}
                </h2>
              </CardHeader>
              <CardContent>
                <TaskForm
                  task={editingTask || undefined}
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  onCancel={editingTask ? handleCancelEdit : undefined}
                  isLoading={createTask.isPending || updateTask.isPending}
                />
              </CardContent>
            </Card>
          </section>

          {/* フィルター・検索エリア */}
          <section className="mb-6">
            <Card>
              <CardHeader className="pb-3">
                <h3 className="text-md font-medium">フィルター・検索</h3>
              </CardHeader>
              <CardContent>
                <TaskFilters onFilterChange={handleFilterChange} />
              </CardContent>
            </Card>
          </section>

          {/* タスク一覧エリア */}
          <section>
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  タスク一覧 ({filteredTasks.length}件)
                </h2>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={filteredTasks}
                  isLoading={false}
                  onToggleDone={handleToggleDone}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </section>
        </Container>
      </main>
    </div>
  );
}