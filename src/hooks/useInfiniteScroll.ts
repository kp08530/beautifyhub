
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  initialPage?: number;
  loadingDelay?: number;
}

export function useInfiniteScroll<T>(
  fetchItems: (page: number) => Promise<T[]>,
  options: UseInfiniteScrollOptions = {}
) {
  const { 
    threshold = 200, 
    initialPage = 1,
    loadingDelay = 500
  } = options;
  
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { rootMargin: `0px 0px ${threshold}px 0px` });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore, threshold]);
  
  const loadItems = useCallback(async (currentPage: number) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate network delay for smoother UX
      await new Promise(resolve => setTimeout(resolve, loadingDelay));
      
      const newItems = await fetchItems(currentPage);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prevItems => [...prevItems, ...newItems]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load items'));
    } finally {
      setLoading(false);
    }
  }, [fetchItems, loading, hasMore, loadingDelay]);
  
  useEffect(() => {
    loadItems(page);
  }, [page, loadItems]);
  
  const refresh = useCallback(() => {
    setItems([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
  }, [initialPage]);
  
  return { 
    items, 
    loading, 
    error, 
    hasMore, 
    loadMoreRef, 
    refresh 
  };
}
