import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useRef } from "react";

const useFormAutosave = <T>(callback: (values: T) => void) => {
  const { values } = useFormikContext<T>();
  const isFirstRender = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    timerRef.current = setTimeout(() => {
      callback(values);
      timerRef.current = null;
    }, 10000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [values, callback]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (timerRef.current) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useFormAutosave;
