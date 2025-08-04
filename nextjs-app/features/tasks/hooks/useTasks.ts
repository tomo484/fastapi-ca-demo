import { useQuery } from '@tanstack/react-query';
import { taskApi } from '../api/tasks.api';
import { TaskListResponse } from '@/types/api.types';

export const useTasks = () => {
    return useQuery<TaskListResponse>({
        queryKey: ["tasks"],
        queryFn: taskApi.getTasks,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export const useFilteredTasks = (filters?: {
    done? : boolean;
    search? : string;
}) => {
    return useQuery<TaskListResponse>({
        queryKey: ["tasks", "filtered", filters],
        queryFn: taskApi.getTasks,
        select: (data) => {
            return data.filter(task => {
                if (filters?.done !== undefined && task.done !== filters.done) return false;
                if (filters?.search && !task.title?.toLowerCase().includes(filters.search.toLowerCase())) return false;
                return true;  
            });
        },
    });

};