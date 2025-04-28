import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../util/api';

const StatusMonitor = () => {
  const [status, setStatus] = useState<boolean>(true);
  const [lastUptime, setLastUptime] = useState<Date | null>(null);
  const [lastFailureTime, setLastFailureTime] = useState<Date | null>(null);
  const [offlineDuration, setOfflineDuration] = useState<number>(0);

  const checkInterval = 5000; // 5 seconds
  const updateInterval = 1000; // 1 second

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/status'); 
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
      } catch (error) {
        console.error('Error fetching status:', error);
        if (status) {
          setLastFailureTime(new Date());
          setStatus(false);
        }
      }
    };

    fetchStatus();
    const fetchInterval = setInterval(fetchStatus, checkInterval);

    return () => clearInterval(fetchInterval);
  }, [status]); // Depend on status to update fetchInterval accordingly

  useEffect(() => {
    const calculateOfflineDuration = () => {
      if (status === false && lastFailureTime) {
        const now = new Date();
        const duration = Math.floor((now.getTime() - lastFailureTime.getTime()) / 1000);
        setOfflineDuration(duration);
      }
    };

    const interval = setInterval(calculateOfflineDuration, updateInterval);

    return () => clearInterval(interval);
  }, [status, lastFailureTime]); // Depend on status and lastFailureTime

  const statusColor = status ? 'green.500' : 'red.500';

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" borderColor={statusColor} textAlign="center">
      <Text fontSize="lg" fontWeight="bold" color={statusColor}>
        {status ? 'API is alive' : 'API is offline'}
      </Text>
      {status ? (
        <Text mt={2}>
                    Last Uptime: {lastUptime ? lastUptime.toLocaleString() : 'N/A'}
        </Text>
      ) : (
        <>
          <Text mt={2}>
                        Time Offline: {formatDuration(offlineDuration)}
          </Text>
          <Text mt={2}>
                        Last Uptime: {lastUptime ? lastUptime.toLocaleString() : 'N/A'}
          </Text>
        </>
      )}
    </Box>
  );
};

export default StatusMonitor;
