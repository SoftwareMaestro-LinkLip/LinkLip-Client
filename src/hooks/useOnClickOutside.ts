import { RefObject, useEffect } from 'react';

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  status: boolean,
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      handler(event);
    };
    if (status) {
      document.addEventListener('click', listener, true);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('click', listener, true);
        document.removeEventListener('touchstart', listener);
      };
    }
  }, [ref, handler, status]);
}
