import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          ページが見つかりません
        </h2>
        <p className="text-muted-foreground">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link 
          href="/"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}