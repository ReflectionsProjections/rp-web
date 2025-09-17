import { Box, Flex, Grid, Icon, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { Event } from "../api/types";
import { circleColors } from "../assets/event-circle-colors";
import { eventIcons } from "../assets/event-icons";

export type DayEventProps = {
  number: number;
  event: Event;
  selected?: boolean;
  variant?: "dashboard" | "website";
  showNumber?: boolean;
  // Website-specific props
  hoveredIndex?: number | null;
  onHover?: (index: number) => void;
  onClick?: (event: Event) => void;
};

export default function DayEvent({
  number,
  event,
  selected,
  variant = "website",
  showNumber = true,
  hoveredIndex,
  onHover,
  onClick,
  ...props
}: DayEventProps) {
  const isDashboard = variant === "dashboard";
  const dashboardStyles = {
    fontSize: {
      number: "2.5vh",
      title: "2vh",
      details: "2vh",
      tooltip: "1.8vh"
    },
    spacing: {
      grid: {
        px: "1.2vh",
        py: "0.5vh",
        gap: "0.5vh",
        templateColumns: "2vh 1vh 1fr 4vh"
      },
      icon: {
        size: "2vh",
        container: "3vh"
      }
    },
    borderRadius: "0.5vh",
    lineWidth: "0.4vh"
  };

  // Website-specific styles
  const websiteStyles = {
    fontSize: {
      number: { base: "1.3rem", md: "1.8rem" },
      title: { base: "1rem", md: "1.2rem" },
      details: { base: "0.8rem", md: "0.9rem" },
      tooltip: { base: "0.9rem", md: "1rem" }
    },
    spacing: {
      grid: {
        px: {
          base: 0,
          md: 4
        },
        py: 3,
        gap: 3,
        templateColumns: { base: "25px 8px 1fr 40px", md: "40px 8px 1fr 40px" }
      },
      icon: {
        size: 6,
        container: "30px"
      },
      line: {
        height: "50px"
      }
    },
    borderRadius: "md",
    lineWidth: "8px"
  };

  // Check if this is Sue's keynote event
  const isSueKeynote =
    event.name.toLowerCase().includes("sue") &&
    event.eventType.toLowerCase() === "speaker";

  const styles = isDashboard ? dashboardStyles : websiteStyles;

  return (
    <Grid
      px={styles.spacing.grid.px}
      py={styles.spacing.grid.py}
      templateColumns={styles.spacing.grid.templateColumns}
      alignItems="right"
      gap={styles.spacing.grid.gap}
      mb={isDashboard ? "1vh" : undefined}
      backgroundColor={
        isDashboard
          ? selected
            ? "rgba(255,255,255,0.2)"
            : undefined
          : hoveredIndex === number
            ? "#333131"
            : "#242424"
      }
      borderRadius={isDashboard && selected ? styles.borderRadius : undefined}
      _first={{
        paddingTop: isDashboard ? "1.5vh" : 3,
        borderTopRadius: isDashboard
          ? styles.borderRadius
          : {
              base: styles.borderRadius,
              md: "none"
            }
      }}
      _last={{
        paddingBottom: isDashboard ? "1.5vh" : 3,
        borderBottomRadius: isDashboard
          ? styles.borderRadius
          : {
              base: styles.borderRadius,
              md: "none"
            },
        mb: isDashboard ? "0" : undefined
      }}
      _hover={
        !isDashboard
          ? {
              bgColor: "#4D4C4C",
              cursor: "pointer"
            }
          : undefined
      }
      transition={"all 0.2s"}
      onMouseEnter={onHover ? () => onHover(number) : undefined}
      onMouseLeave={onHover ? () => onHover(-1) : undefined}
      onClick={onClick ? () => onClick(event) : undefined}
      sx={{
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)"
      }}
      {...props}
    >
      {showNumber && (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          w={isDashboard ? "1vh" : "40px"}
          borderRadius={isDashboard ? "0.2vh" : "md"}
        >
          <Text
            fontSize={styles.fontSize.number}
            color="gray.200"
            fontWeight="thin"
            textAlign="center"
            fontFamily="ProRacingSlant"
            mb={isDashboard ? "0.2vh" : 1}
            mt={isDashboard ? "0.4vh" : 1}
          >
            {number}
          </Text>
        </Box>
      )}

      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        w={
          isDashboard ? styles.lineWidth : { base: "4px", md: styles.lineWidth }
        }
        h={isDashboard ? "100%" : { base: "50px", md: "100%" }}
        bg={circleColors[(number - 1) % circleColors.length]}
        boxShadow="md"
        mx={isDashboard ? 0 : { base: "auto", md: 0 }}
        my={
          isDashboard
            ? 0
            : {
                base: "auto",
                md: 0
              }
        }
        borderRadius={isDashboard ? "0.2vh" : "sm"}
      />

      <Flex flexDirection={"column"} gap={0} width={"fit-content"}>
        <Text
          fontSize={styles.fontSize.title}
          color="white"
          fontFamily={"ProRacing"}
          transformOrigin={"top left"}
          textShadow={isSueKeynote ? "0 0 10px rgba(255, 215, 0, 0.8)" : "none"}
        >
          {isSueKeynote ? `★ ${event.name}` : event.name}
        </Text>

        <Flex
          flexDirection={isDashboard ? "row" : { base: "column", md: "row" }}
          gap={0}
          width={"fit-content"}
        >
          <Text
            fontSize={styles.fontSize.details}
            color="gray.100"
            fontWeight="bold"
            fontFamily="Magistral"
            letterSpacing={isDashboard ? "0.05vh" : "0.5px"}
            transformOrigin={"top left"}
            wordBreak="break-all"
            whiteSpace="normal"
            mr={isDashboard ? "1.5vh" : { base: 0, md: 3 }}
          >
            {event.location || "Siebel CS"}
          </Text>

          <Text
            fontSize={styles.fontSize.details}
            color="gray.400"
            fontWeight="bold"
            fontFamily="Magistral"
            letterSpacing={isDashboard ? "0.05vh" : "0.5px"}
            transformOrigin={"top left"}
            whiteSpace={
              isDashboard ? "nowrap" : { base: "normal", md: "nowrap" }
            }
          >
            {moment(event.startTime).format("h:mma")} –{" "}
            {moment(event.endTime).format("h:mma")}
          </Text>
        </Flex>
      </Flex>

      <Tooltip
        label={event.eventType
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())}
        fontFamily="Magistral"
        fontSize={styles.fontSize.tooltip}
        fontWeight={600}
        placement="top"
        hasArrow
      >
        <Flex
          w={styles.spacing.icon.container}
          h={styles.spacing.icon.container}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon
            as={eventIcons[event.eventType]}
            color={isSueKeynote ? "gold" : "yellow.500"}
            boxSize={styles.spacing.icon.size}
            filter={
              isSueKeynote
                ? "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))"
                : "none"
            }
          />
        </Flex>
      </Tooltip>
    </Grid>
  );
}
