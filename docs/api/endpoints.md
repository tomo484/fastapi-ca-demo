# APIエンドポイント詳細

## タスク管理

### GET /tasks
タスク一覧を取得します。

**URL**: `/tasks`
**メソッド**: `GET`
**認証**: 不要

**リクエスト**
```
GET /tasks HTTP/1.1
Host: localhost:8000
```

**成功レスポンス**
- **ステータスコード**: 200 OK
- **Content-Type**: application/json

```json
[
  {
    "id": 1,
    "title": "サンプルタスク"
  },
  {
    "id": 2, 
    "title": "完了済みタスク"
  }
]
```

---

### POST /tasks
新しいタスクを作成します。

**URL**: `/tasks`
**メソッド**: `POST`
**認証**: 不要

**リクエスト**
```json
{
  "title": "新しいタスク"
}
```

**必須フィールド**
- `title` (string): タスクのタイトル（1文字以上必須）

**成功レスポンス**
- **ステータスコード**: 200 OK
- **Content-Type**: application/json

```json
{
  "id": 3,
  "title": "新しいタスク"
}
```

**エラーレスポンス**
- **422 Validation Error**: タイトルが空または未指定の場合

---

### PUT /tasks/{id}
指定されたタスクを更新します。

**URL**: `/tasks/{id}`
**メソッド**: `PUT`
**認証**: 不要

**パラメータ**
- `id` (integer): タスクID（パス内）

**リクエスト**
```json
{
  "title": "更新されたタスク"
}
```

**必須フィールド**
- `title` (string): 新しいタスクタイトル

**成功レスポンス**
- **ステータスコード**: 200 OK
- **Content-Type**: application/json

```json
{
  "id": 1,
  "title": "更新されたタスク"
}
```

**エラーレスポンス**
- **404 Not Found**: 指定されたIDのタスクが存在しない場合
- **422 Validation Error**: タイトルが無効な場合

---

### DELETE /tasks/{id}
指定されたタスクを削除します。

**URL**: `/tasks/{id}`
**メソッド**: `DELETE`
**認証**: 不要

**パラメータ**
- `id` (integer): タスクID（パス内）

**成功レスポンス**
- **ステータスコード**: 200 OK
- **Content-Type**: application/json

```json
{
  "detail": "Task deleted successfully"
}
```

**エラーレスポンス**
- **404 Not Found**: 指定されたIDのタスクが存在しない場合

---

## 完了状態管理

### POST /tasks/{id}/done
タスクを完了状態にマークします。

**URL**: `/tasks/{id}/done`
**メソッド**: `POST`
**認証**: 不要

**パラメータ**
- `id` (integer): タスクID（パス内）

**リクエスト**
```
POST /tasks/1/done HTTP/1.1
Host: localhost:8000
```

**成功レスポンス**
- **ステータスコード**: 200 OK
- **Content-Type**: application/json

```json
{
  "detail": "Task marked as done"
}
```

**エラーレスポンス**
- **404 Not Found**: 指定されたIDのタスクが存在しない場合

---

### DELETE /tasks/{id}/done
タスクの完了状態を解除します。

**URL**: `/tasks/{id}/done`
**メソッド**: `DELETE`
**認証**: 不要

**パラメータ**
- `id` (integer): タスクID（パス内）

**リクエスト**
```
DELETE /tasks/1/done HTTP/1.1
Host: localhost:8000
```

**成功レスポンス**
- **ステータスコード**: 200 OK
- **Content-Type**: application/json

```json
{
  "detail": "Task marked as not done"
}
```

**エラーレスポンス**
- **404 Not Found**: 指定されたIDのタスクが存在しない場合
- **400 Bad Request**: タスクが既に未完了状態の場合

---

## 使用例

詳細な使用例とサンプルコードは [examples.md](./examples.md) を参照してください。

## データ型

すべてのデータ型定義は [types.md](./types.md) を参照してください。 