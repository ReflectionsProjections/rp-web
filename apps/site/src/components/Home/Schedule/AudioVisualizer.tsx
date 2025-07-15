import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface AudioVisualizerProps {
  barCount?: number;
  maxHeight?: number;
  updateInterval?: number;
  variance?: number;
  // Spring animation properties
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  barCount = 40,
  maxHeight = 60,
  updateInterval = 100,
  // Default spring physics values
  stiffness = 100,
  damping = 10,
  mass = 1
}) => {
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: barCount }, () => Math.random() * maxHeight)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setHeights((prev) =>
        prev.map((h) => {
          // Create more dramatic changes by using a new random value
          // combined with the previous height
          const targetHeight = Math.random() * maxHeight;
          // Mix previous height (30%) with new random height (70%)
          // This creates more noticeable variations while maintaining some continuity
          const newHeight = h * 0.3 + targetHeight * 0.7;

          // Add extra randomness for occasional peaks
          const shouldSpike = Math.random() > 0.85;
          const spikeMultiplier = shouldSpike ? Math.random() * 0.7 + 0.3 : 0;

          return Math.max(
            5,
            Math.min(newHeight + maxHeight * spikeMultiplier, maxHeight)
          );
        })
      );
    }, updateInterval);
    return () => clearInterval(timer);
  }, [maxHeight, updateInterval]);

  return (
    <Flex
      flex={2}
      alignItems="flex-end"
      height={`${maxHeight}px`}
      gap="2px"
      width="100%"
    >
      {heights.map((h, idx) => (
        <motion.div
          key={idx}
          style={{
            flex: 1,
            backgroundColor: "var(--chakra-colors-orange-300)",
            borderRadius: "2px",
            height: `${h}px`
          }}
          initial={{ height: 0 }}
          animate={{ height: `${h}px` }}
          transition={{
            stiffness,
            damping,
            mass
          }}
        />
      ))}
    </Flex>
  );
};
