'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string, initialValue = true) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setValue(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
}
