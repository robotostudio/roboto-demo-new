import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useMarketingModal = (key: string, delay = 5000) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();
  const paramKey = params.get('campaign');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (paramKey && paramKey === key) setIsOpen(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [paramKey, key, delay]);

  return {
    isOpen,
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  };
};
