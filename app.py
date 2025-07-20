from fastapi import FastAPI
from fastapi.responses import JSONResponse
import os
from datetime import datetime

# FastAPI アプリケーションの初期化
app = FastAPI(
    title="FastAPI Container Apps Demodだぞ！",
    description="Azure Container Apps での FastAPI デモアプリケーション",
    version="1.0.0"
)

# ルートエンドポイント
@app.get("/")
async def root():
    return {
        "message": "Hello from FastAPI on Azure Container Apps!",
        "timestamp": datetime.now().isoformat(),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

# ヘルスチェックエンドポイント
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

# メトリクスエンドポイント
@app.get("/metrics")
async def get_metrics():
    return {
        "cpu_usage": "45%",
        "memory_usage": "256MB",
        "active_connections": 12,
        "uptime": "2h 30m"
    }

# 簡単なAPIエンドポイント
@app.get("/api/info")
async def get_info():
    return {
        "application": "FastAPI Container Apps Demo",
        "author": "Azure Container Apps Tutorial",
        "features": [
            "FastAPI Framework",
            "Container Apps Deployment",
            "Auto Scaling",
            "Health Monitoring"
        ]
    }

# 起動時のメッセージ
@app.on_event("startup")
async def startup_event():
    print("🚀 FastAPI Container Apps Demo started!")
    print(f"📅 Started at: {datetime.now()}")
    print(f"🌍 Environment: {os.getenv('ENVIRONMENT', 'development')}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 