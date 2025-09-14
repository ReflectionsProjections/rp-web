import { useEffect } from "react";

// What interval to reload on
// not tested outside of 1-5 range - beware
const EVERY_MINUTES = 5;

export default function useTimeSyncedReload() {
  useEffect(() => {
    // Calculate time
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();

    // Calculate milliseconds until next mark
    const currentMs = (minutes * 60 + seconds) * 1000 + ms;
    const nextMark = Math.ceil((minutes + 1) / EVERY_MINUTES) * EVERY_MINUTES;
    const nextMarkMs = nextMark * 60 * 1000;
    const delay = nextMarkMs - currentMs;

    // Set initial timeout to sync next mark
    const initialTimeout = setTimeout(() => {
      window.location.reload();

      // Note: We don't need to set up an interval since the page will reload
    }, delay);

    return () => clearTimeout(initialTimeout);
  }, []);
}
