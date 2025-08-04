"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            エラーが発生しました
          </h2>
          <p className="text-muted-foreground">
            申し訳ございません。予期しないエラーが発生しました。
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            再試行
          </button>
        </div>
      </div>
    );
  } 