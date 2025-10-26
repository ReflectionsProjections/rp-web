import { useEffect, useRef, useState } from "react";

/**
 * Returns current time in milliseconds from epoch (`Date.now()`).
 * Updates via requestAnimationFrame.
 * @param precisionMs Minimum update interval in ms (default = 0 -> update every frame).
 */
export default function useTime(precisionMs: number = 0) {
  const [time, setTime] = useState(() => Date.now());
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    let frame: number;

    const tick = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current >= precisionMs) {
        lastUpdateRef.current = now;
        setTime(now);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [precisionMs]);

  return time;
}
