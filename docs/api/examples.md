# API使用例

## JavaScript Fetch API

### タスク一覧取得

```javascript
const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:8000/tasks');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const tasks = await response.json();
    console.log('取得したタスク:', tasks);
    return tasks;
  } catch (error) {
    console.error('タスク取得エラー:', error);
    throw error;
  }
};
```

### タスク作成

```javascript
const createTask = async (title) => {
  try {
    const response = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newTask = await response.json();
    console.log('作成されたタスク:', newTask);
    return newTask;
  } catch (error) {
    console.error('タスク作成エラー:', error);
    throw error;
  }
};

// 使用例
createTask('新しいタスク');
```

### タスク更新

```javascript
const updateTask = async (id, title) => {
  try {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('タスクが見つかりません');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const updatedTask = await response.json();
    console.log('更新されたタスク:', updatedTask);
    return updatedTask;
  } catch (error) {
    console.error('タスク更新エラー:', error);
    throw error;
  }
};

// 使用例
updateTask(1, '更新されたタスクタイトル');
```

### タスク削除

```javascript
const deleteTask = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('タスクが見つかりません');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(result.detail);
    return result;
  } catch (error) {
    console.error('タスク削除エラー:', error);
    throw error;
  }
};

// 使用例
deleteTask(1);
```

### 完了状態切り替え

```javascript
const markTaskDone = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/tasks/${id}/done`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('タスクが見つかりません');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(result.detail);
    return result;
  } catch (error) {
    console.error('完了マークエラー:', error);
    throw error;
  }
};

const markTaskUndone = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/tasks/${id}/done`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('タスクが見つかりません');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(result.detail);
    return result;
  } catch (error) {
    console.error('完了解除エラー:', error);
    throw error;
  }
};

// 使用例
markTaskDone(1);     // タスクを完了状態に
markTaskUndone(1);   // タスクを未完了状態に
```

---

## React Query使用例（Next.js向け）

### APIクライアント設定

```javascript
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = {
  // タスク一覧取得
  getTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  // タスク作成
  createTask: async (title) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  // タスク更新
  updateTask: async (id, title) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  // タスク削除
  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json();
  },

  // 完了マーク
  markTaskDone: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/done`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to mark task as done');
    return response.json();
  },

  // 完了解除
  markTaskUndone: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/done`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to mark task as undone');
    return response.json();
  },
};
```

### カスタムフック

```javascript
// hooks/useTasks.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';

// タスク一覧取得
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: apiClient.getTasks,
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
  });
};

// タスク作成
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiClient.createTask,
    onSuccess: () => {
      // タスク一覧を再取得
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('タスク作成失敗:', error);
    },
  });
};

// タスク更新
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, title }) => apiClient.updateTask(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('タスク更新失敗:', error);
    },
  });
};

// タスク削除
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiClient.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('タスク削除失敗:', error);
    },
  });
};

// 完了状態切り替え
export const useToggleTaskDone = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, isDone }) => 
      isDone ? apiClient.markTaskUndone(id) : apiClient.markTaskDone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('完了状態切り替え失敗:', error);
    },
  });
};
```

### React コンポーネント使用例

```jsx
// components/TaskList.jsx
import { useTasks, useCreateTask, useDeleteTask } from '../hooks/useTasks';

export default function TaskList() {
  const { data: tasks, isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleCreateTask = async (title) => {
    try {
      await createTaskMutation.mutateAsync(title);
    } catch (error) {
      alert('タスクの作成に失敗しました');
    }
  };

  const handleDeleteTask = async (id) => {
    if (confirm('このタスクを削除しますか？')) {
      try {
        await deleteTaskMutation.mutateAsync(id);
      } catch (error) {
        alert('タスクの削除に失敗しました');
      }
    }
  };

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error.message}</div>;

  return (
    <div>
      <h1>タスク一覧</h1>
      <button onClick={() => handleCreateTask('新しいタスク')}>
        タスク作成
      </button>
      
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleDeleteTask(task.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## エラーハンドリングのベストプラクティス

### 共通エラーハンドラー

```javascript
// utils/errorHandler.js
export const handleApiError = (error, defaultMessage = 'エラーが発生しました') => {
  if (error.response) {
    // サーバーからのエラーレスポンス
    switch (error.response.status) {
      case 404:
        return 'リソースが見つかりません';
      case 422:
        return 'データの形式が正しくありません';
      case 500:
        return 'サーバーエラーが発生しました';
      default:
        return error.response.data?.detail || defaultMessage;
    }
  } else if (error.request) {
    // ネットワークエラー
    return 'ネットワークエラーが発生しました';
  } else {
    // その他のエラー
    return error.message || defaultMessage;
  }
};
```

### React Query エラーハンドリング

```javascript
// hooks/useErrorHandler.js
import { useQueryClient } from '@tanstack/react-query';
import { handleApiError } from '../utils/errorHandler';

export const useGlobalErrorHandler = () => {
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      onError: (error) => {
        const message = handleApiError(error);
        console.error('Query Error:', message);
        // ここでトースト通知などを表示
      },
    },
    mutations: {
      onError: (error) => {
        const message = handleApiError(error);
        console.error('Mutation Error:', message);
        // ここでトースト通知などを表示
      },
    },
  });
};
``` 