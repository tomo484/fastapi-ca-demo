// features/tasks/hooks/useTaskMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../api/tasks.api';
import { TaskCreateRequest, TaskResponse } from '@/types/api.types';

export const useTasksMutation = () => {
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('タスク作成エラー:', error);
      // トースト通知やエラーハンドリング
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskCreateRequest }) =>
      taskApi.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    // 楽観的更新の実装
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      
      queryClient.setQueryData(['tasks'], (old: any) => 
        old?.map((task: any) => 
          task.id === id ? { ...task, ...data } : task
        )
      );
      
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
  });

  const deleteTask = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const markDone = useMutation({
    mutationFn: taskApi.markDone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    // 楽観的更新
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      
      queryClient.setQueryData(['tasks'], (old: any) => 
        old?.map((task: any) => 
          task.id === id ? { ...task, done: true } : task
        )
      );
      
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
  });

  const markPending = useMutation({
    mutationFn: taskApi.markPending,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    // 楽観的更新
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      
      queryClient.setQueryData(['tasks'], (old: any) => 
        old?.map((task: any) => 
          task.id === id ? { ...task, done: false } : task
        )
      );
      
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
  });

  return {
    createTask,
    updateTask,
    deleteTask,
    markDone,
    markPending,
  };
};