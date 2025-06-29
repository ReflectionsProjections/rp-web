import React from "react";
import { HStack, Button, useColorModeValue, Text } from "@chakra-ui/react";
import { MdViewModule, MdOutlineCalendarToday } from "react-icons/md";

export type ViewMode = "cards" | "calendar";

type ViewToggleProps = {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
};

const ViewToggle: React.FC<ViewToggleProps> = ({
  currentView,
  onViewChange
}) => {
  const activeBg = useColorModeValue("blue.500", "blue.400");
  const inactiveBg = useColorModeValue("gray.100", "gray.700");
  const activeColor = useColorModeValue("white", "gray.900");
  const inactiveColor = useColorModeValue("gray.600", "gray.300");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <HStack spacing={2} p={4}>
      <Text fontSize="sm" fontWeight="medium" color={textColor}>
        View:
      </Text>
      <Button
        size="sm"
        leftIcon={<MdViewModule />}
        variant={currentView === "cards" ? "solid" : "ghost"}
        bg={currentView === "cards" ? activeBg : inactiveBg}
        color={currentView === "cards" ? activeColor : inactiveColor}
        onClick={() => onViewChange("cards")}
        _hover={{
          bg: currentView === "cards" ? activeBg : hoverBg
        }}
      >
        Cards
      </Button>
      <Button
        size="sm"
        leftIcon={<MdOutlineCalendarToday />}
        variant={currentView === "calendar" ? "solid" : "ghost"}
        bg={currentView === "calendar" ? activeBg : inactiveBg}
        color={currentView === "calendar" ? activeColor : inactiveColor}
        onClick={() => onViewChange("calendar")}
        _hover={{
          bg: currentView === "calendar" ? activeBg : hoverBg
        }}
      >
        Calendar
      </Button>
    </HStack>
  );
};

export default ViewToggle;
