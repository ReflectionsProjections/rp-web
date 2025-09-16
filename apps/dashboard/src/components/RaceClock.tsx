import { Flex, Text } from "@chakra-ui/react";
import { useTime } from "@rp/shared";
import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Configure dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Chicago");

function ClockSegment({
  value,
  w = "1.5vh",
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
      fontSize="3vh"
      letterSpacing="0"
      width={w}
      display="inline-block"
      textAlign="center"
      lineHeight="1"
      mb={semicolon ? ".7vh" : undefined}
      color="red.500"
    >
      {value}
    </Text>
  );
}

function useClockParts() {
  const time = useTime(100);
  return useMemo(() => {
    const now = dayjs(time).tz();
    const hours = now.format("h");
    return {
      hours: hours.padStart(2, "0"),
      minutes: now.format("mm"),
      seconds: now.format("ss"),
      ms: Math.floor(now.millisecond() / 100).toString(),
      meridian: now.format("A")
    };
  }, [time]);
}

export function RaceClock() {
  const clockParts = useClockParts();

  return (
    <Flex
      display={"flex"}
      gap="0.35vh"
      alignItems="center"
      fontFamily="SevenSegment"
      fontWeight="bold"
      bgColor={"rgba(0,0,0,0.2)"}
      px="1.5vh"
      py="0.5vh"
      borderRadius={"0.5vh"}
      borderColor={"gray.600"}
      userSelect="none"
      mt="1.5vh"
      sx={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      }}
    >
      {/* Hour */}
      <ClockSegment value={clockParts.hours[0]} />
      <ClockSegment value={clockParts.hours[1]} />
      <ClockSegment value=":" w="1vh" semicolon />
      {/* Minute */}
      <ClockSegment value={clockParts.minutes[0]} />
      <ClockSegment value={clockParts.minutes[1]} />
      <ClockSegment value=":" w="1vh" semicolon />
      {/* Second */}
      <ClockSegment value={clockParts.seconds[0]} />
      <ClockSegment value={clockParts.seconds[1]} />
      <ClockSegment value="." w="1vh" />
      {/* Tenths */}
      <ClockSegment value={clockParts.ms} w="1vh" />
      {/* AM/PM */}
      <ClockSegment value={clockParts.meridian} w="6vh" />
    </Flex>
  );
}
