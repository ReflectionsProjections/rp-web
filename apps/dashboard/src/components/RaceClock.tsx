import { Flex, Text } from "@chakra-ui/react";
import { useTime } from "@rp/shared";
import { useMemo } from "react";

function ClockSegment({
  value,
  w = "0.5em",
  semicolon = false
}: {
  value: string;
  w?: string;
  semicolon?: boolean;
}) {
  return (
    <Text
      as="span"
      fontFamily="SevenSegment"
      fontSize="3xl"
      letterSpacing="0"
      width={w}
      display="inline-block"
      textAlign="center"
      lineHeight="1"
      mb={semicolon ? 3 : undefined}
      color="red.500"
    >
      {value}
    </Text>
  );
}

function useClockParts() {
  const time = useTime(100);
  return useMemo(() => {
    const now = new Date(time);
    let hours = now.getHours() % 12;
    if (hours === 0) hours = 12;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: now.getMinutes().toString().padStart(2, "0"),
      seconds: now.getSeconds().toString().padStart(2, "0"),
      ms: Math.floor(now.getMilliseconds() / 100).toString(), // tenths of a sec
      meridian: now.getHours() >= 12 ? "PM" : "AM"
    };
  }, [time]);
}

export function RaceClock() {
  const clockParts = useClockParts();

  return (
    <Flex
      display={"flex"}
      gap="0.12em"
      alignItems="center"
      fontFamily="SevenSegment"
      fontWeight="bold"
      bgColor={"rgba(0,0,0,0.2)"}
      px={3}
      py={1}
      borderRadius={"md"}
      borderColor={"gray.600"}
      userSelect="none"
      mr={3}
      mt={3}
      sx={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      }}
    >
      {/* Hour */}
      <ClockSegment value={clockParts.hours[0]} />
      <ClockSegment value={clockParts.hours[1]} />
      <ClockSegment value=":" w="0.7em" semicolon />
      {/* Minute */}
      <ClockSegment value={clockParts.minutes[0]} />
      <ClockSegment value={clockParts.minutes[1]} />
      <ClockSegment value=":" w="0.7em" semicolon />
      {/* Second */}
      <ClockSegment value={clockParts.seconds[0]} />
      <ClockSegment value={clockParts.seconds[1]} />
      <ClockSegment value="." w="0.6em" />
      {/* Tenths */}
      <ClockSegment value={clockParts.ms} w="0.85em" />
      {/* AM/PM */}
      <ClockSegment value={clockParts.meridian} w="1.8em" />
    </Flex>
  );
}
