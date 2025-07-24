import { DAY_COLORS } from "@/constants/day-colors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Event } from "@rp/shared";

export default function ScheduleDaySelector({
  selectedDay,
  eventsByDay,
  onSelectDay
}: {
  selectedDay: string | null;
  eventsByDay: { [key: string]: Event[] };
  onSelectDay: (date: string) => void;
}) {
  return (
    <Flex
      flexWrap={"wrap"}
      gap={5}
      maxWidth={{
        base: "1000px",
        md: "700px", // Ensures that there are 2 or more buttons per line
        lg: "1000px"
      }}
      mx="auto"
      mb={{
        base: 7,
        md: 0,
        lg: 10
      }}
      justifyContent={"center"}
    >
      {Object.keys(eventsByDay).map((date, index) => (
        <ScheduleDayButton
          color={DAY_COLORS[index % DAY_COLORS.length]}
          key={date}
          date={date}
          selected={selectedDay === date}
          onSelectDay={onSelectDay}
        />
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
  return (
    <Box
      role="group"
      bgColor={selected ? "white" : "black"}
      borderRightRadius="lg"
      border="1px solid"
      borderColor={selected ? "orange.300" : "gray.600"}
      borderLeftWidth={"8px"}
      borderLeftColor={color}
      px={3}
      py={3}
      pr={8}
      onClick={() => onSelectDay(date)}
      transition="all 0.2s"
      _hover={{
        cursor: "pointer"
      }}
      boxShadow="md"
    >
      <Text
        fontFamily="ProRacing"
        fontSize="lg"
        textColor={selected ? "black" : "white"}
        transition="all 0.2s, transform 0.2s"
        transform="scaleX(0.7)"
        transformOrigin="center left"
      >
        {date.toUpperCase()}
      </Text>
    </Box>
  );
}
