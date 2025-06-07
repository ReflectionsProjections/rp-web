import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Checkbox,
  VStack,
  Text,
  Image,
  Button,
  SimpleGrid,
  Center,
  Tooltip,
  HStack
} from "@chakra-ui/react";
import { MdOpenInNew, MdList } from "react-icons/md";
import { Config } from "../config";
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
  toggleResume: (id: string) => void;
  openResume: (id: string) => void;
  baseColor: string;
  bgColor: string;
}

const ResumeListBox: React.FC<ResumeComponentProps> = ({
  resume,
  isSelected,
  columnWidths,
  isLargerThan700,
  toggleResume,
  openResume,
  baseColor,
  bgColor
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      key={resume.id}
      borderWidth="2px"
      padding="10px"
      background={isSelected ? "blue." + baseColor : bgColor}
      borderRadius="lg"
      overflow="hidden"
      marginTop="1"
      boxShadow="md"
      position="relative"
      cursor="pointer"
      _hover={{
        background: isSelected
          ? "blue." + (parseInt(baseColor) + 100)
          : "gray." +
            (parseInt(baseColor) > 500
              ? parseInt(baseColor) - 100
              : parseInt(baseColor) + 100),
        boxShadow: "lg"
      }}
      borderColor={isSelected ? "blue.500" : "gray." + baseColor}
      onClick={() => toggleResume(resume.id)}
      transition="all 0.2s ease"
    >
      <Grid
        templateColumns={
          isLargerThan700
            ? `${columnWidths.checkbox}px ${columnWidths.name}px ${columnWidths.degree}px ${columnWidths.major}px ${columnWidths.graduationYear}px ${columnWidths.actions}px`
            : `${columnWidths.checkbox}px ${columnWidths.data}px ${columnWidths.actions}px`
        }
        gap={4}
        alignItems="center"
      >
        <GridItem>
          <HStack>
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
              <Text fontWeight="bold" fontSize="lg">
                {resume.name}
              </Text>
            </GridItem>
            <GridItem>
              <Text color="gray.500" fontSize="sm">
                {resume.degree}
              </Text>
            </GridItem>
            <GridItem>
              <Text color="gray.500" fontSize="sm">
                {resume.major}
              </Text>
            </GridItem>
            <GridItem>
              <Text color="gray.500" fontSize="sm">
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
              <Text color="gray.500" fontSize="sm">
                {resume.degree}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {resume.major}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {resume.graduationYear}
              </Text>
            </VStack>
          </GridItem>
        )}
        <GridItem zIndex="5">
          <VStack spacing={2}>
            <Button
              backgroundColor="blue.500"
              color="white"
              size="md"
              _hover={{ color: "black", backgroundColor: "blue.300" }}
              onClick={(e) => {
                e.stopPropagation();
                openResume(resume.id);
              }}
            >
              {isLargerThan700 ? "Open Resume" : <MdOpenInNew />}
            </Button>
            <Button
              isDisabled={resume.portfolios?.length === 0}
              backgroundColor="green.500"
              color="white"
              size="md"
              _hover={{ color: "black", backgroundColor: "green.300" }}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(); // Toggle the expanded state
              }}
            >
              {isLargerThan700 ? "Portfolio Links" : <MdList />}
            </Button>
          </VStack>
        </GridItem>
      </Grid>

      {/* Conditionally render additional buttons if expanded */}
      {isExpanded && (
        <Center>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 5 }} // Use 2 columns on small screens, up to 5 columns on large screens
            spacing={2}
            marginTop={2}
            maxWidth={"90vw"}
            minChildWidth="120px" // Ensures that items are evenly distributed
            justifyContent="center" // Centers the items when they don't fill all columns
          >
            {resume.portfolios &&
              resume.portfolios.map((link) => {
                const url = new URL(link);
                const displayURL = url.hostname;
                return (
                  <Button
                    key={link}
                    backgroundColor={"gray." + baseColor}
                    _hover={{
                      backgroundColor:
                        "gray." +
                        (parseInt(baseColor) > 500
                          ? parseInt(baseColor) - 100
                          : parseInt(baseColor) + 100)
                    }}
                    color={"blue.500"}
                    border={"1px solid black"}
                    fontSize={"12px"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(link, "_blank");
                    }}
                  >
                    {displayURL}
                  </Button>
                );
              })}
          </SimpleGrid>
        </Center>
      )}
    </Box>
  );
};

export default ResumeListBox;
