import { useEffect, useState } from "react";
import { isServer } from "utils";

export function useStickyState(key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue = isServer ? "" : window.localStorage.getItem(key);
    return stickyValue !== null ? stickyValue : "";
  });
  useEffect(() => {
    if (!isServer) window.localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue] as const;
}
