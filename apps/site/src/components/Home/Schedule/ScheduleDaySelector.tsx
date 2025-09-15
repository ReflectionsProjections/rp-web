import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { dayColors, Event } from "@rp/shared";
import { useMemo } from "react";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionFlex = motion(Flex);

export default function ScheduleDaySelector({
  selectedDay,
  eventsByDay,
  onSelectDay
}: {
  selectedDay: string | null;
  eventsByDay: { [key: string]: Event[] };
  onSelectDay: (date: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Flex
      ref={ref}
      gap={{ base: 2, md: 5 }}
      maxWidth={{ md: "700px", lg: "1000px" }}
      mx="auto"
      px={{ base: 3, md: undefined }}
      pb={{ base: 4, lg: 0 }}
      justifyContent={{ base: "flex-start", sm: "center" }}
      overflowX="auto"
      zIndex={10}
    >
      {Object.keys(eventsByDay).map((date, index) => (
        <MotionFlex
          key={date}
          // start slightly up & invisible
          initial={{ opacity: 0, y: -10 }}
          // animate into place when inView
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.2 * index, // stagger by index
            ease: "easeOut"
          }}
        >
          <ScheduleDayButton
            color={dayColors[index % dayColors.length]}
            date={date}
            selected={selectedDay === date}
            onSelectDay={onSelectDay}
          />
        </MotionFlex>
      ))}
    </Flex>
  );
}

function ScheduleDayButton({
  color,
  date,
  selected,
  onSelectDay
}: {
  color: string;
  date: string;
  selected?: boolean;
  onSelectDay: (date: string) => void;
}) {
  const { displayedDay, displayedDate } = useMemo(() => {
    const splitDate = date.split(" ");
    if (splitDate.length < 2) {
      return { displayedDay: date, displayedDate: "" };
    }
    return {
      displayedDay: splitDate[0],
      displayedDate: splitDate[1]
    };
  }, [date]);
  return (
    <Box
      flex={{
        base: 1,
        md: "unset"
      }}
      role="group"
      bgColor={selected ? "white" : "black"}
      borderRightRadius="lg"
      border="1px solid"
      borderColor={selected ? "orange.300" : "gray.600"}
      borderLeftWidth={"8px"}
      borderLeftColor={color}
      px={{ base: 2, md: 3 }}
      py={{ base: 2, md: 1 }}
      pr={{ base: 4, sm: 6 }}
      onClick={() => onSelectDay(date)}
      transition="all 0.2s"
      _hover={{
        cursor: "pointer"
      }}
      boxShadow="md"
    >
      <Text
        display={{
          base: "none",
          md: "block"
        }}
        fontFamily="ProRacing"
        fontSize={"xl"}
        textColor={selected ? "black" : "white"}
        transition="all 0.2s, transform 0.2s"
        transformOrigin="center left"
      >
        {`${displayedDay.toUpperCase()} ${displayedDate.toUpperCase()}`}
      </Text>
      <VStack
        display={{
          base: "flex",
          md: "none"
        }}
        alignItems="flex-start"
        gap={0}
      >
        <Text
          display={{
            base: "block",
            md: "none"
          }}
          fontFamily="ProRacing"
          fontSize={"lg"}
          textColor={selected ? "black" : "white"}
          transition="all 0.2s, transform 0.2s"
        >
          {displayedDay.toUpperCase()}
        </Text>
        <Text
          display={{
            base: "block",
            md: "none"
          }}
          fontFamily="ProRacing"
          fontSize={"md"}
          textColor={selected ? "gray.600" : "gray.400"}
          transition="all 0.2s, transform 0.2s"
        >
          {displayedDate.toUpperCase()}
        </Text>
      </VStack>
    </Box>
  );
}
