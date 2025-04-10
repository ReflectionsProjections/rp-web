import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function CustomDropdown({ dropdownOptions }: { dropdownOptions: string[] }) {
  const [selected, setSelected] = useState(dropdownOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box position="relative">
      <Flex
        as="button"
        onClick={() => setIsOpen(!isOpen)}
        align="center"
        bg="#EAEAEA"
        borderRadius="full"
        px={4}
        py={2}
        width="180px"
        justifyContent="space-between"
        cursor="pointer"
        _hover={{ bg: "#E0E0E0" }}
      >
        <Flex align="center">
          <Text fontWeight="bold" fontSize="md" ml={2}>
            {selected}
          </Text>
        </Flex>
        <ChevronDownIcon />
      </Flex>

      {isOpen && (
        <Box
          position="absolute"
          top="calc(100% + 4px)"
          left="0"
          width="180px"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          zIndex="dropdown"
        >
          {dropdownOptions.map((currOption) => (
            <Flex
              key={currOption}
              px={4}
              py={2}
              cursor="pointer"
              _hover={{ bg: "#F5F5F5" }}
              onClick={() => {
                setSelected(currOption);
                setIsOpen(false);
              }}
            >
              <Text>{currOption}</Text>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CustomDropdown;
