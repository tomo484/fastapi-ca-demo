export type Task = {
    id: number;
    title: string | null;
    done: boolean;
}

export type TaskCreateRequest = {
    title: string | null;
}

export type TaskListResponse = Task[];
export type TaskResponse = Task;
export type DeleteTaskResponse = void;

export interface ApiClient {
    getTasks: () => Promise<TaskListResponse>;
    createTask: (data: TaskCreateRequest) => Promise<TaskResponse>;
    updateTask: (id: number, data: TaskCreateRequest) => Promise<TaskResponse>;
    deleteTask: (id: number) => Promise<DeleteTaskResponse>;
}