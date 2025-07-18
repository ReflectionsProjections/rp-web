import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { Resume } from "./ResumeBook";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export function ResumeBookFooter({
  startIndex,
  endIndex,
  allFilteredResumes,
  filteredResumes,
  page,
  pageSize,
  displayedPage,
  handlePageChange,
  handleNext,
  handlePrevious
}: {
  startIndex: number;
  endIndex: number;
  allFilteredResumes: Resume[];
  filteredResumes: Resume[];
  page: number;
  pageSize: number;
  displayedPage: string;
  handlePageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNext: () => void;
  handlePrevious: () => void;
}) {
  return (
    <Flex
      bg="gray.200"
      px={4}
      py={{ base: 4, md: 4 }}
      direction={{ base: "column", md: "row" }}
      align="center"
    >
      <Box
        flex={1}
        textAlign={{ base: "center", md: "left" }}
        mb={{ base: 2, md: 0 }}
      >
        <Text
          display={{ base: "none", md: "block" }}
          fontSize="md"
          whiteSpace="nowrap"
        >
          {`Showing ${startIndex + 1} - ${endIndex} of ${allFilteredResumes.length} resumes`}
        </Text>
      </Box>

      <Box flex={1} textAlign="center" mb={{ base: 2, md: 0 }}>
        <Text fontSize="sm" color="gray.500">
          © 2025 Reflections | Projections
        </Text>
      </Box>

      {filteredResumes.length > 0 && (
        <Box flex={1} textAlign={{ base: "center", md: "right" }}>
          <HStack
            spacing={{ base: 2, md: 4 }}
            justify={{ base: "center", md: "flex-end" }}
          >
            <Button
              onClick={handlePrevious}
              isDisabled={page === 1}
              colorScheme="blue"
              color="white"
              leftIcon={<FaChevronLeft />}
            >
              Previous
            </Button>

            <HStack spacing={2} display={{ base: "none", md: "flex" }}>
              <Input
                value={displayedPage}
                onChange={handlePageChange}
                type="number"
                max={pageSize}
                width="50px"
                textAlign="center"
                bg="white"
                px={1}
              />
              <Text fontSize="md">/ {pageSize}</Text>
            </HStack>

            <Button
              onClick={handleNext}
              isDisabled={page === pageSize}
              colorScheme="blue"
              color="white"
              rightIcon={<FaChevronRight />}
            >
              Next
            </Button>
          </HStack>

          <HStack
            spacing={2}
            display={{ base: "flex", md: "none" }}
            justify="center"
            mt={2}
          >
            <Input
              value={displayedPage}
              onChange={handlePageChange}
              type="number"
              max={pageSize}
              width="50px"
              textAlign="center"
              bg="white"
              px={1}
            />
            <Text fontSize="md">/ {pageSize}</Text>
          </HStack>
        </Box>
      )}
    </Flex>
  );
}
