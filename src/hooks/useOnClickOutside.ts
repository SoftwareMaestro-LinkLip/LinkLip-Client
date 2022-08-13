import { RefObject, useEffect } from 'react';

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
  status: boolean = true,
  stopOpt: boolean = true,
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      if (stopOpt) {
        event.preventDefault();
        event.stopPropagation();
      }
      handler();
    };
    if (status) {
      document.addEventListener('click', listener, true);
      document.addEventListener('touchstart', listener, { passive: false });
      return () => {
        document.removeEventListener('click', listener, true);
        document.removeEventListener('touchstart', listener);
      };
    }
  }, [ref, handler, status]);
}
