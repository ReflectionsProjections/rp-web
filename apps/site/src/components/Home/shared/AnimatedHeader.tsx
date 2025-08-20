import { Text, TextProps } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// create a motion-wrapped Text
const MotionText = motion(Text);

interface AnimatedHeaderProps extends TextProps {
  children: React.ReactNode;
  /** optional offset to trigger earlier/later (e.g. "-50px") */
}

export function AnimatedHeader({ children, ...rest }: AnimatedHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <MotionText
      ref={ref}
      w="100%"
      fontSize="6xl"
      fontWeight="bold"
      fontStyle="italic"
      color="white"
      fontFamily="ProRacingSlant"
      textAlign="center"
      mb={3}
      initial={{ y: -20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      {...rest}
    >
      {children}
    </MotionText>
  );
}
