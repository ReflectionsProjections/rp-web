import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState(0);

  // Measure once on mount (before paint) so you don't see a jump
  useLayoutEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const next = entry.contentRect.height;
        setHeight(next);
      }
    });
    ro.observe(el);
    return () => ro.unobserve(el);
  }, []);

  return { ref, height };
}
