import { Config, DashboardMessageRequest } from "@rp/shared";
import { useEffect, useRef, useState } from "react";

const RETRY_CONNECTION_MS = 5 * 1000;

export default function useWebSocket() {
  const [message, setMessage] = useState<DashboardMessageRequest | null>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function cleanupWs() {
      wsRef.current?.close();
      wsRef.current = null;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    }

    function connectWs() {
      cleanupWs();

      const ws = new WebSocket(`${Config.WS_BASE_URL}/dashboard`);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const rawData: unknown = event.data;
        if (!rawData || typeof rawData != "string") return;

        const data = JSON.parse(rawData) as unknown;
        if (
          !data ||
          typeof data != "object" ||
          !("type" in data) ||
          typeof data.type != "string"
        ) {
          return;
        }

        const type = data.type;
        if (type === "ping") {
          ws.send(
            JSON.stringify({
              screenWidth: window.innerWidth,
              screenHeight: window.innerHeight,
              devicePixelRatio: window.devicePixelRatio,
              userAgent: navigator.userAgent,
              platform: navigator.platform,
              unixTime: Date.now()
            })
          );
        } else if (type === "reload") {
          window.location.reload();
        } else if (type === "message") {
          setMessage(data as unknown as DashboardMessageRequest);

          if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
          }

          messageTimeoutRef.current = setTimeout(() => {
            setMessage(null);
          }, 30 * 1000);
        }
      };

      ws.onclose = (event) => {
        console.error("Web socket closed", event);
        if (ws === wsRef.current) {
          retryTimeoutRef.current = setTimeout(connectWs, RETRY_CONNECTION_MS);
        }
      };

      ws.onerror = (event) => {
        console.error("Web socket error", event);
        ws.close();
      };
    }

    connectWs();

    return cleanupWs;
  }, []);

  return { message };
}
