import { useEffect, useState } from 'react';

type Breakpoint = `${number}px`;

export function useMediaQuery(breakpoint: Breakpoint) {
  const [mediaMatches, setMediaMatches] = useState(false);

  useEffect(() => {
    const screen = window.matchMedia(`(max-width: ${breakpoint})`);
    const handleChange = (e: MediaQueryListEvent) => setMediaMatches(e.matches);
    screen.addEventListener('change', handleChange);

    return () => {
      screen.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return mediaMatches;
}
