import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Title() {
  const getTime = () => {
    const now = new Date();
    const hours = (now.getHours() % 12).toString();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const milliseconds = Math.floor(now.getMilliseconds() / 100)
      .toString()
      .padStart(1, "0");
    const meridian = now.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes}:${seconds}.${milliseconds} ${meridian}`;
  };
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const updateTime = () => {
      setTime(getTime());
      requestAnimationFrame(updateTime);
    };
    updateTime();
  }, []);

  return (
    <Box width={"100%"} textAlign={"center"}>
      <Flex
        position={"relative"}
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <Heading>Reflections | Projections</Heading>
        <Text position={"absolute"} right={0}>
          {time}
        </Text>
      </Flex>
    </Box>
  );
}
