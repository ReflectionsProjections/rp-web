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
      {Object.keys(eventsByDay).map((date) => (
        <ScheduleDayButton
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
  date,
  selected,
  onSelectDay
}: {
  date: string;
  selected?: boolean;
  onSelectDay: (date: string) => void;
}) {
  return (
    <Box
      role="group"
      bgColor={selected ? "gray.400" : "gray.300"}
      borderRadius="lg"
      px={3}
      py={1.5}
      onClick={() => onSelectDay(date)}
      transition="all 0.2s"
      boxShadow="md"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.05)"
      }}
      _active={{ bgColor: selected ? "gray.400" : "gray.300" }}
      _focus={{ boxShadow: "outline" }}
      transform={selected ? "scale(1.05)" : "scale(1)"}
    >
      <Box
        flex={1}
        bgColor={selected ? "gray.100" : "gray.100"}
        borderRadius="lg"
        textAlign="center"
        textColor="black"
        px={10}
        transition="all 0.2s, transform 0.2s"
        _focus={{ boxShadow: "outline" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"flex-end"}
          bgColor={selected ? "gray.400" : "gray.300"}
          pb={"2.5px"}
          borderBottomRadius="lg"
          textAlign="center"
          textColor="black"
          px={2}
          transition="all 0.2s, transform 0.2s"
          clipPath="polygon(0 0, 100% 0, 90% 100%, 10% 100%)"
          h={2}
          mx={-2}
        >
          <Box
            backgroundColor="white"
            w={"5px"}
            h={"5px"}
            borderRadius={"full"}
          />
          <Box
            backgroundColor="white"
            w={"5px"}
            h={"5px"}
            borderRadius={"full"}
          />
        </Box>
        <Text
          fontFamily="Racing Sans One"
          textColor={selected ? "black" : "gray.400"}
          _groupHover={{ textColor: selected ? "black" : "gray.500" }}
          transition="all 0.2s, transform 0.2s"
          noOfLines={1}
          py={0.5}
        >
          {date}
        </Text>

        <Box
          display="flex"
          justifyContent="space-between"
          bgColor={selected ? "gray.400" : "gray.300"}
          borderTopRadius="lg"
          textAlign="center"
          textColor="black"
          pt={"2.5px"}
          px={2}
          transition="all 0.2s, transform 0.2s"
          clipPath="polygon(10% 0, 90% 0, 100% 100%, 0 100%)"
          h={2}
          mx={-2}
        >
          <Box
            backgroundColor="white"
            w={"5px"}
            h={"5px"}
            borderRadius={"full"}
          />
          <Box
            backgroundColor="white"
            w={"5px"}
            h={"5px"}
            borderRadius={"full"}
          />
        </Box>
      </Box>
    </Box>
  );
}
