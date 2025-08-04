# データ型定義

## TypeScript型定義

フロントエンド開発で使用するTypeScript型定義を以下に示します。

### 基本型

#### Task型

```typescript
interface Task {
  id: number;           // タスクID（自動生成）
  title: string;        // タスクタイトル
}
```

---

## リクエスト型

### TaskCreateRequest

```typescript
interface TaskCreateRequest {
  title: string;        // タスクタイトル（必須、1文字以上）
}
```

**使用例**
```typescript
const newTaskData: TaskCreateRequest = {
  title: "新しいタスク"
};
```

### TaskUpdateRequest

```typescript
interface TaskUpdateRequest {
  title: string;        // 更新するタスクタイトル（必須）
}
```

**使用例**
```typescript
const updateData: TaskUpdateRequest = {
  title: "更新されたタスク"
};
```

---

## レスポンス型

### TaskListResponse

```typescript
type TaskListResponse = Task[];
```

**使用例**
```typescript
const tasks: TaskListResponse = [
  { id: 1, title: "タスク1" },
  { id: 2, title: "タスク2" }
];
```

### TaskResponse

```typescript
type TaskResponse = Task;
```

**使用例**
```typescript
const task: TaskResponse = {
  id: 1,
  title: "サンプルタスク"
};
```

### SuccessResponse

```typescript
interface SuccessResponse {
  detail: string;       // 成功メッセージ
}
```

**使用例**
```typescript
const deleteResult: SuccessResponse = {
  detail: "Task deleted successfully"
};
```

---

## エラー型

### ErrorResponse

```typescript
interface ErrorResponse {
  detail: string | ValidationError[];
}
```

### ValidationError

```typescript
interface ValidationError {
  loc: string[];        // エラーが発生したフィールドの場所
  msg: string;          // エラーメッセージ
  type: string;         // エラーの種類
}
```

**使用例**
```typescript
// 単一エラーメッセージ
const simpleError: ErrorResponse = {
  detail: "Task not found"
};

// バリデーションエラー
const validationError: ErrorResponse = {
  detail: [
    {
      loc: ["body", "title"],
      msg: "field required",
      type: "value_error.missing"
    }
  ]
};
```

---

## API関数型定義

### APIクライアント型

```typescript
interface ApiClient {
  getTasks: () => Promise<TaskListResponse>;
  createTask: (title: string) => Promise<TaskResponse>;
  updateTask: (id: number, title: string) => Promise<TaskResponse>;
  deleteTask: (id: number) => Promise<SuccessResponse>;
  markTaskDone: (id: number) => Promise<SuccessResponse>;
  markTaskUndone: (id: number) => Promise<SuccessResponse>;
}
```

### API関数の型定義

```typescript
// タスク一覧取得
type GetTasksFunction = () => Promise<TaskListResponse>;

// タスク作成
type CreateTaskFunction = (title: string) => Promise<TaskResponse>;

// タスク更新
type UpdateTaskFunction = (id: number, title: string) => Promise<TaskResponse>;

// タスク削除
type DeleteTaskFunction = (id: number) => Promise<SuccessResponse>;

// 完了マーク
type MarkTaskDoneFunction = (id: number) => Promise<SuccessResponse>;

// 完了解除
type MarkTaskUndoneFunction = (id: number) => Promise<SuccessResponse>;
```

---

## React Query型定義

### カスタムフック型

```typescript
import { UseQueryResult, UseMutationResult } from '@tanstack/react-query';

// タスク一覧取得フック
type UseTasksHook = () => UseQueryResult<TaskListResponse, Error>;

// タスク作成フック
type UseCreateTaskHook = () => UseMutationResult<
  TaskResponse,
  Error,
  string,
  unknown
>;

// タスク更新フック
type UseUpdateTaskHook = () => UseMutationResult<
  TaskResponse,
  Error,
  { id: number; title: string },
  unknown
>;

// タスク削除フック
type UseDeleteTaskHook = () => UseMutationResult<
  SuccessResponse,
  Error,
  number,
  unknown
>;

// 完了状態切り替えフック
type UseToggleTaskDoneHook = () => UseMutationResult<
  SuccessResponse,
  Error,
  { id: number; isDone: boolean },
  unknown
>;
```

---

## ユーティリティ型

### APIエラー判定

```typescript
// エラーレスポンスかどうかを判定するタイプガード
function isErrorResponse(response: any): response is ErrorResponse {
  return response && typeof response.detail !== 'undefined';
}

// バリデーションエラーかどうかを判定するタイプガード
function isValidationError(detail: any): detail is ValidationError[] {
  return Array.isArray(detail) && 
         detail.length > 0 && 
         'loc' in detail[0] && 
         'msg' in detail[0] && 
         'type' in detail[0];
}
```

**使用例**
```typescript
try {
  const response = await fetch('/api/tasks', { ... });
  const data = await response.json();
  
  if (!response.ok) {
    if (isErrorResponse(data)) {
      if (isValidationError(data.detail)) {
        // バリデーションエラーの処理
        data.detail.forEach(error => {
          console.log(`${error.loc.join('.')}: ${error.msg}`);
        });
      } else {
        // 単一エラーメッセージの処理
        console.log(data.detail);
      }
    }
  }
} catch (error) {
  console.error('Network error:', error);
}
```

---

## 環境設定型

### Next.js環境変数型

```typescript
interface EnvironmentVariables {
  NEXT_PUBLIC_API_URL: string;     // APIのベースURL
  NODE_ENV: 'development' | 'production' | 'test';
}

// 環境変数の型安全なアクセス
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}
```

### API設定型

```typescript
interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
```

---

## 完全な型定義ファイル例

### types/api.ts

```typescript
// types/api.ts
export interface Task {
  id: number;
  title: string;
}

export interface TaskCreateRequest {
  title: string;
}

export interface TaskUpdateRequest {
  title: string;
}

export type TaskListResponse = Task[];
export type TaskResponse = Task;

export interface SuccessResponse {
  detail: string;
}

export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  detail: string | ValidationError[];
}

export interface ApiClient {
  getTasks: () => Promise<TaskListResponse>;
  createTask: (title: string) => Promise<TaskResponse>;
  updateTask: (id: number, title: string) => Promise<TaskResponse>;
  deleteTask: (id: number) => Promise<SuccessResponse>;
  markTaskDone: (id: number) => Promise<SuccessResponse>;
  markTaskUndone: (id: number) => Promise<SuccessResponse>;
}
```

この型定義ファイルをプロジェクトのルートまたは`types`ディレクトリに配置することで、フロントエンド開発時に型安全性を確保できます。 