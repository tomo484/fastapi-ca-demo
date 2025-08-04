import apiClient from "@/lib/api";
import { Task, TaskCreateRequest, TaskListResponse, TaskResponse, DeleteTaskResponse } from "@/types/api.types";

export const taskApi = {
    getTasks: async (): Promise<TaskListResponse> => {
        const response = await apiClient.get("/tasks");
        return response.data;
    },

    createTask: async (data: TaskCreateRequest): Promise<TaskResponse> => {
        const response = await apiClient.post('/tasks', data);
        return response.data;
      },
    
    updateTask: async (id: number, data: TaskCreateRequest): Promise<TaskResponse> => {
        const response = await apiClient.put(`/tasks/${id}`, data);
        return response.data;
      },
    
    deleteTask: async (id: number): Promise<DeleteTaskResponse> => {
        await apiClient.delete(`/tasks/${id}`);
        return;
      },

    markDone: async (id: number): Promise<TaskResponse> => {
        const response = await apiClient.post(`/tasks/${id}/done`);
        return response.data;
      },

    markPending: async (id: number): Promise<TaskResponse> => {
        const response = await apiClient.delete(`/tasks/${id}/done`);
        return response.data;
      },
    };

    