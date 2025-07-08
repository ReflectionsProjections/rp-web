import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosDocument } from "react-icons/io";
import { MdOpenInNew } from "react-icons/md";
import { Config } from "../config";
import PortfolioLinks from "./PortfolioLinks";
import { Resume } from "./ResumeBook";

interface ColumnWidths {
  checkbox: number;
  name: number;
  major: number;
  degree: number;
  graduationYear: number;
  actions: number;
  data: number;
}

interface ResumeComponentProps {
  resume: Resume;
  isSelected: boolean;
  columnWidths: ColumnWidths;
  isLargerThan700: boolean;
  openResume: (resume: Resume) => void;
  toggleResume: (resumeId: string) => void;
  baseColor: string;
  bgColor: string;
}

const ResumeListBox: React.FC<ResumeComponentProps> = ({
  resume,
  isSelected,
  columnWidths,
  isLargerThan700,
  openResume,
  toggleResume,
  baseColor,
  bgColor
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <Box
      key={resume.id}
      padding="10px"
      background={isSelected ? "blue." + baseColor : bgColor}
      overflow="visible"
      position="relative"
      cursor="pointer"
      borderBottom={"1px solid"}
      borderColor={"gray.300"}
      py={4}
      w="100%"
      minH="fit-content"
      _hover={{
        background: isSelected ? "blue.300" : "gray.200"
      }}
      onClick={() => {
        toggleResume(resume.id);
      }}
      transition="all 0.2s ease"
      zIndex={isExpanded ? 999 : 1}
    >
      <Grid
        templateColumns={
          isLargerThan700
            ? `${columnWidths.checkbox}px ${columnWidths.name}px ${columnWidths.degree}px ${columnWidths.major}px ${columnWidths.graduationYear}px ${columnWidths.actions}px`
            : `${columnWidths.checkbox}px ${columnWidths.data}px ${columnWidths.actions}px`
        }
        gap={4}
        alignItems="center"
        overflow="visible"
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
        {isLargerThan700 ? (
          <>
            <GridItem>
              <Text fontWeight="bold" fontSize="md">
                {resume.name}
              </Text>
            </GridItem>
            <GridItem>
              <Text color="gray.700" fontSize="md">
                {resume.degree}
              </Text>
            </GridItem>
            <GridItem>
              <Text color="gray.700" fontSize="md">
                {resume.major}
              </Text>
            </GridItem>
            <GridItem>
              <Text color="gray.700" fontSize="md">
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
                {resume.degree}
              </Text>
              <Text color="gray.570" fontSize="sm">
                {resume.major}
              </Text>
              <Text color="gray.700" fontSize="sm">
                {resume.graduationYear}
              </Text>
            </VStack>
          </GridItem>
        )}
        <GridItem zIndex="5" overflow="visible">
          <HStack spacing={2} overflow="visible">
            <Button
              backgroundColor="blue.500"
              color="white"
              size="md"
              _hover={{ color: "black", backgroundColor: "blue.300" }}
              onClick={(e) => {
                e.stopPropagation();
                openResume(resume);
              }}
              leftIcon={isLargerThan700 ? <IoIosDocument /> : undefined}
            >
              {isLargerThan700 ? "Open Resume" : <MdOpenInNew />}
            </Button>

            <PortfolioLinks
              isLargerThan700={isLargerThan700}
              isExpanded={isExpanded}
              resume={resume}
              baseColor={baseColor}
              onCollapse={handleCollapse}
              onExpand={handleExpand}
            />
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ResumeListBox;
