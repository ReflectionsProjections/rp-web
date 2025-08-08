import { DAY_COLORS } from "@/constants/colors";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Event } from "@rp/shared";
import { useMemo } from "react";

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
      gap={{
        base: 2,
        md: 5
      }}
      maxWidth={{
        md: "700px", // Ensures that there are 2 or more buttons per line
        lg: "1000px"
      }}
      mx="auto"
      mb={{
        md: 0,
        lg: 10
      }}
      px={{
        base: 3,
        md: undefined
      }}
      justifyContent={{ md: "center" }}
      overflowX="auto"
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
      py={{ base: 2, md: 3 }}
      pr={{ base: 2, md: 4 }}
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
        fontSize="lg"
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
          fontSize={{ base: "md", md: "lg" }}
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
          fontSize={{ base: "sm", md: "md" }}
          textColor={selected ? "gray.600" : "gray.400"}
          transition="all 0.2s, transform 0.2s"
        >
          {displayedDate.toUpperCase()}
        </Text>
      </VStack>
    </Box>
  );
}
