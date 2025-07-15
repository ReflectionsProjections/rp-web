import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Divider
} from "@chakra-ui/react";
import { useColorTheme, ColorProfile } from "@/contexts/ColorThemeContext";

type ColorProfileSelectorProps = {
  onClose?: () => void;
};

const ColorProfileSelector: React.FC<ColorProfileSelectorProps> = ({
  onClose
}) => {
  const { currentProfile, setCurrentProfile, colorProfiles } = useColorTheme();
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleProfileSelect = (profile: ColorProfile) => {
    setCurrentProfile(profile);
    onClose?.();
  };

  return (
    <VStack spacing={2} align="stretch" minW="200px">
      <Text fontSize="sm" fontWeight="semibold" px={3} py={2}>
        Color Theme
      </Text>
      <Divider />
      {colorProfiles.map((profile) => (
        <Box
          key={profile.id}
          px={3}
          py={2}
          cursor="pointer"
          borderRadius="md"
          border="1px solid"
          borderColor={
            currentProfile.id === profile.id ? "blue.300" : "transparent"
          }
          bg={currentProfile.id === profile.id ? "blue.300" : "transparent"}
          _hover={{
            bg: "gray.300"
          }}
          onClick={() => handleProfileSelect(profile)}
          transition="all 0.2s"
        >
          <VStack align="start" spacing={1}>
            <HStack spacing={3} w="100%">
              <Box
                w="20px"
                h="20px"
                borderRadius="full"
                bg={profile.gradient}
                bgGradient={profile.gradient}
                border="2px solid"
                borderColor={borderColor}
                flexShrink={0}
              />
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" fontWeight="medium">
                  {profile.name}
                </Text>
                <Text fontSize="xs" color="gray.500" noOfLines={1}>
                  {profile.description}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default ColorProfileSelector;
