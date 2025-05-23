import { HStack, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../util/api";
import {
  MdSignalWifi4Bar,
  MdSignalWifiConnectedNoInternet4
} from "react-icons/md";

const StatusMonitor = () => {
  const [status, setStatus] = useState<boolean>(true);
  const [lastUptime, setLastUptime] = useState<Date | null>(null);
  const [lastFailureTime, setLastFailureTime] = useState<Date | null>(null);
  const [offlineDuration, setOfflineDuration] = useState<number>(0);

  const checkInterval = 5000; // 5 seconds
  const updateInterval = 1000; // 1 second

  useEffect(() => {
    const fetchStatus = () => {
      api
        .get("/status")
        .then((response) => {
          if (response.status === 200) {
            if (!status) {
              setOfflineDuration(0); // Reset offline duration only if coming online
            }
            setLastUptime(new Date());
            setStatus(true);
            setLastFailureTime(null); // Clear the failure time when online
          } else {
            if (status) {
              setLastFailureTime(new Date());
              setStatus(false);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching status:", error);
          if (status) {
            setLastFailureTime(new Date());
            setStatus(false);
          }
        });
    };

    fetchStatus();
    const fetchInterval = setInterval(fetchStatus, checkInterval);

    return () => clearInterval(fetchInterval);
  }, [status]); // Depend on status to update fetchInterval accordingly

  useEffect(() => {
    const calculateOfflineDuration = () => {
      if (status === false && lastFailureTime) {
        const now = new Date();
        const duration = Math.floor(
          (now.getTime() - lastFailureTime.getTime()) / 1000
        );
        setOfflineDuration(duration);
      }
    };

    const interval = setInterval(calculateOfflineDuration, updateInterval);

    return () => clearInterval(interval);
  }, [status, lastFailureTime]); // Depend on status and lastFailureTime

  const statusColor = status ? "green.500" : "red.500";

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Tooltip
      label={`Last Uptime: ${lastUptime ? lastUptime.toLocaleString() : "N/A"}${!status ? `\nTime Offline: ${formatDuration(offlineDuration)}` : ""}`}
    >
      <HStack
        p={4}
        border="1px solid"
        borderColor={statusColor}
        borderRadius="2xl"
        textAlign="center"
      >
        <Icon
          as={status ? MdSignalWifi4Bar : MdSignalWifiConnectedNoInternet4}
          fill={statusColor}
          fontSize="x-large"
        />
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={statusColor}
          // display={{ base: "none", md: "block" }}
        >
          {status ? "Connected" : "Disconnected"}
        </Text>
      </HStack>
    </Tooltip>
  );
};

export default StatusMonitor;
