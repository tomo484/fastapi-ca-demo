// hooks/useTaskFilters.ts
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useTaskFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = {
    done: searchParams.get('done') === 'true' ? true : 
          searchParams.get('done') === 'false' ? false : undefined,
    search: searchParams.get('search') || '',
  };

  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams();
    
    if (newFilters.done !== undefined) {
      params.set('done', String(newFilters.done));
    }
    if (newFilters.search) {
      params.set('search', newFilters.search);
    }
    
    router.push(`?${params.toString()}`);
  }, [router]);

  return { filters, updateFilters };
};