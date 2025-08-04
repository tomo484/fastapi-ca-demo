# タスク管理API仕様書

## 基本情報

- **ベースURL**: `http://localhost:8000` (開発環境)
- **本番URL**: `https://your-production-url.com` (本番環境)
- **API バージョン**: v1
- **認証**: なし（現在）
- **データ形式**: JSON
- **文字エンコーディング**: UTF-8

## CORS設定

以下のオリジンからのアクセスが許可されています：
- `http://localhost:3000` (Next.js開発サーバー)
- `https://127.0.0.1:3000`

## 共通レスポンスヘッダー

```
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:3000
```

## エラーレスポンス形式

### 404 Not Found
```json
{
  "detail": "Task not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

## 自動生成ドキュメント

詳細なAPI仕様は以下で確認できます：
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## クイックスタート

```javascript
// タスク一覧取得
const response = await fetch('http://localhost:8000/tasks');
const tasks = await response.json();

// タスク作成
const newTask = await fetch('http://localhost:8000/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'サンプルタスク' })
});
```

## 関連ドキュメント

- [エンドポイント詳細](./endpoints.md)
- [使用例・サンプルコード](./examples.md)
- [データ型定義](./types.md) 