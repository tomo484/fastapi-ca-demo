// hooks/useErrorHandler.ts
import { useCallback } from 'react';

export const useErrorHandler = () => {
  const handleError = useCallback((error: any) => {
    console.error('API Error:', error);
    
    // エラーの種類に応じた処理
    if (error.response?.status === 404) {
      // 404エラー処理
    } else if (error.response?.status >= 500) {
      // サーバーエラー処理
    } else if (!navigator.onLine) {
      // オフライン処理
    }
    
    // トースト通知などのUI更新
  }, []);

  return { handleError };
};