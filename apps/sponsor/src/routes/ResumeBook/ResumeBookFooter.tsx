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
    <Flex bg="gray.200" px={3} py={3} align="center" w="100%">
      <Box
        display={{ base: "none", md: "block" }}
        flex={1}
        textAlign={{ base: "center", md: "left" }}
        mb={{ base: 2, md: 0 }}
      >
        <Text fontSize="md" whiteSpace="nowrap">
          {`Showing ${startIndex + 1} - ${endIndex} of ${allFilteredResumes.length} resumes`}
        </Text>
      </Box>

      <Box
        flex={1}
        textAlign="center"
        mb={{ base: 2, md: 0 }}
        display={{
          base: "none",
          md: "block"
        }}
      >
        <Text fontSize="sm" color="gray.500">
          © 2025 Reflections | Projections
        </Text>
      </Box>

      {filteredResumes.length > 0 && (
        <Box
          flex={1}
          textAlign={{ base: "center", md: "right" }}
          display={"flex"}
          gap={3}
          flexDir={{ base: "row-reverse", md: "row" }}
        >
          <HStack flex={1} spacing={{ base: 2, md: 4 }} justify={"flex-end"}>
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
              <Text fontSize="md" whiteSpace={"nowrap"}>
                / {pageSize}
              </Text>
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
