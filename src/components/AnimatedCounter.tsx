import { Box } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MotionBox = motion(Box);

type AnimatedCounterProps = {
  value: string;
  before?: string;
  after?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, before, after }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef);
  const finalValue = parseInt(value);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / (2 * 1000), 1);

      setCount(Math.floor((1 - Math.pow(2, -6 * progress)) * finalValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(finalValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [finalValue, isInView]);

  return (
    <MotionBox
      ref={nodeRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {before}{count}{after}
    </MotionBox>
  );
};

export default AnimatedCounter;