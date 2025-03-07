import { useState, useEffect } from "react";

// Custom debounce hook
const useDebouncedSearch = (initialValue: string, delay: number) => {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    // Cleanup the timeout on every render
    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return {
    query,
    debouncedQuery,
    setQuery,
  };
};

export default useDebouncedSearch;
