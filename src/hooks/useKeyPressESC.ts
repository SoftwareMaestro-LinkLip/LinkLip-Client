import { RefObject, useEffect } from 'react';

export default function useKeyPressESC(handler: () => void) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handler]);
}
