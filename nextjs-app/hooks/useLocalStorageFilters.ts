// hooks/useLocalStorageFilters.ts
import { useState, useEffect } from 'react';

export const useLocalStorageFilters = () => {
  const [savedFilters, setSavedFilters] = useState({
    defaultView: 'all',
    sortOrder: 'desc',
  });

  useEffect(() => {
    const stored = localStorage.getItem('taskFilters');
    if (stored) {
      setSavedFilters(JSON.parse(stored));
    }
  }, []);

  const updateSavedFilters = (filters: typeof savedFilters) => {
    setSavedFilters(filters);
    localStorage.setItem('taskFilters', JSON.stringify(filters));
  };

  return { savedFilters, updateSavedFilters };
};