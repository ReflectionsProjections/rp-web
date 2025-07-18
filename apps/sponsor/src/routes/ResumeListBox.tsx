import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { FaFilePdf } from "react-icons/fa6";
import { Config } from "../config";
import PortfolioLinks from "./PortfolioLinks";
import { Resume } from "./ResumeBook/ResumeBook";

interface ResumeComponentProps {
  resume: Resume;
  isSelected: boolean;
  screenIsLarge: boolean;
  screenIsLargeButton: boolean;
  openResume: (resume: Resume) => void;
  toggleResume: (resumeId: string) => void;
  baseColor: string;
  bgColor: string;
}

const ResumeListBox: React.FC<ResumeComponentProps> = ({
  resume,
  isSelected,
  screenIsLarge,
  openResume,
  toggleResume,
  baseColor,
  bgColor
}) => {
  return (
    <Box
      key={resume.id}
      padding="10px"
      pr="20px"
      background={isSelected ? "blue." + baseColor : bgColor}
      overflow="visible"
      position="relative"
      cursor="pointer"
      borderBottom={"1px solid"}
      borderColor={"gray.300"}
      py={screenIsLarge ? 3 : 2}
      w="100%"
      minH="fit-content"
      _hover={{
        background: isSelected ? "blue.300" : "gray.200"
      }}
      onClick={() => {
        toggleResume(resume.id);
      }}
      transition="all 0.2s ease"
    >
      <Grid
        templateColumns={
          screenIsLarge
            ? "80px minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1.2fr) 100px"
            : "60px minmax(0, 1.5fr) minmax(0, 1fr) 100px"
        }
        gap={4}
        alignItems="center"
        overflow="hidden"
      >
        <GridItem>
          <HStack gap={4}>
            <Checkbox
              size="lg"
              isChecked={isSelected}
              onChange={() => toggleResume(resume.id)}
              borderColor={"gray.400"}
            />
            {Config.STAFF_UIDs.includes(resume.id) && (
              <Tooltip label="Staff Member" fontSize="md">
                <Image src="/2024_rp_logo.svg" width="20px" height="20px" />
              </Tooltip>
            )}
          </HStack>
        </GridItem>
        {screenIsLarge ? (
          <>
            <GridItem>
              <Text
                fontWeight="bold"
                fontSize={{
                  base: "sm",
                  lg: "md"
                }}
              >
                {resume.name}
              </Text>
            </GridItem>
            <GridItem>
              <Text
                color="gray.700"
                fontSize={{
                  base: "sm",
                  lg: "md"
                }}
              >
                {resume.degree}
              </Text>
            </GridItem>
            <GridItem>
              <Text
                color="gray.700"
                fontSize={{
                  base: "sm",
                  lg: "md"
                }}
              >
                {resume.major}
              </Text>
            </GridItem>
            <GridItem>
              <Text
                color="gray.700"
                fontSize={{
                  base: "sm",
                  lg: "md"
                }}
              >
                {resume.graduationYear}
              </Text>
            </GridItem>
          </>
        ) : (
          <GridItem>
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold" fontSize="lg">
                {resume.name}
              </Text>
              <Text color="gray.700" fontSize="sm">
                {resume.degree} - {resume.graduationYear}
              </Text>
              <Text color="gray.570" fontSize="sm">
                {resume.major}
              </Text>
            </VStack>
          </GridItem>
        )}
        <GridItem zIndex="5" overflow="visible">
          <PortfolioLinks resume={resume} isMediumScreen={screenIsLarge} />
        </GridItem>
        <GridItem zIndex="5" overflow="visible">
          <HStack spacing={2} overflow="visible">
            <Tooltip
              label={"Preview Resume"}
              placement="top"
              hasArrow
              bg="gray.700"
              color="white"
              fontSize="md"
              borderRadius="md"
              p={1}
              px={2}
              zIndex="999"
            >
              <IconButton
                backgroundColor="blue.500"
                w={"100%"}
                mx={screenIsLarge ? "auto" : ""}
                color="white"
                size={
                  screenIsLarge
                    ? {
                        base: "sm",
                        lg: "lg"
                      }
                    : "md"
                }
                _hover={{ color: "gray.700", backgroundColor: "blue.400" }}
                onClick={(e) => {
                  e.stopPropagation();
                  openResume(resume);
                }}
                aria-label=""
                icon={<FaFilePdf />}
              />
            </Tooltip>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ResumeListBox;
