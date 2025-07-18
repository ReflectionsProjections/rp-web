import {
  Box,
  Button,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";
import { BiSelectMultiple } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { FaFileCsv, FaRegFilePdf } from "react-icons/fa6";
import { TiDocumentDelete } from "react-icons/ti";
import { FilterModal, FilterModalProps } from "./FilterModal";
import { Resume } from "./ResumeBook";

export type ResumeBookHeaderProps = {
  filtering: {
    queryName: string;
    selectedMajors: string[];
    majorToMajorWithCount: Record<string, string>;
    selectedDegrees: string[];
    degreesWithCounts: Record<string, string>;
    yearsWithCounts: Record<string, string>;
    selectedYears: string[];
    jobInterestsWithCounts: Record<string, string>;
    selectedJobInterests: string[];
    setQueryName: (name: string) => void;
    setSelectedMajors: (majors: string[]) => void;
    setSelectedDegrees: (degrees: string[]) => void;
    setSelectedYears: (years: string[]) => void;
    setSelectedJobInterests: (jobs: string[]) => void;
  };
  pagination: {
    resetPage: () => void;
  };
  selection: {
    selectedResumes: string[];
    selectAllResumes: () => void;
  };
  resumeData: {
    filteredResumes: Resume[];
  };
  exportResumes: {
    handleDownloadResumes: () => void;
    downloadResumesCSV: (selectedOnly: boolean) => void;
  };
  viewColor: string;
  isMediumScreen: boolean;
};

export function ResumeBookHeader({
  filtering,
  pagination,
  selection,
  resumeData,
  exportResumes,
  viewColor,
  isMediumScreen
}: ResumeBookHeaderProps) {
  return (
    <Box
      bg={"gray.200"}
      transition="background-color 0.3s ease, color 0.3s ease"
      p={3}
    >
      <Flex w="100%" gap={2} flexWrap={"wrap"}>
        <Input
          autoComplete="off"
          value={filtering.queryName}
          bgColor="gray.300"
          w="100%"
          maxW={isMediumScreen ? "300px" : undefined}
          minW="100px"
          flex="1"
          placeholder={"Search by name..."}
          _placeholder={{ color: "gray.600" }}
          onChange={(e) => {
            filtering.setQueryName(e.target.value);
            pagination.resetPage();
          }}
        />

        <Flex gap={2}>
          <FilterModal
            isMediumScreen={isMediumScreen}
            filtering={filtering satisfies FilterModalProps["filtering"]}
          />

          <Button
            onClick={selection.selectAllResumes}
            backgroundColor={
              selection.selectedResumes.length ===
              resumeData.filteredResumes.length
                ? "salmon"
                : "blue.300"
            }
            color={"white"}
            border="1px solid transparent"
            _hover={{
              border: "1px solid black",
              backgroundColor:
                selection.selectedResumes.length ===
                resumeData.filteredResumes.length
                  ? "red.200"
                  : "blue.200",
              color: "black"
            }}
            transition="border background-color color 0.3s ease"
            leftIcon={
              isMediumScreen ? (
                selection.selectedResumes.length ===
                resumeData.filteredResumes.length ? (
                  <TiDocumentDelete />
                ) : (
                  <BiSelectMultiple />
                )
              ) : undefined
            }
          >
            {!isMediumScreen ? (
              selection.selectedResumes.length ===
              resumeData.filteredResumes.length ? (
                <TiDocumentDelete />
              ) : (
                <BiSelectMultiple />
              )
            ) : selection.selectedResumes.length ===
              resumeData.filteredResumes.length ? (
              "Deselect All"
            ) : (
              "Select All"
            )}
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button
                border="1px solid transparent"
                _hover={{
                  border: "1px solid black",
                  backgroundColor: "gray.300",
                  color: "black"
                }}
                backgroundColor={
                  parseInt(viewColor) < 500
                    ? "gray." + (parseInt(viewColor) + 300)
                    : "gray." + (parseInt(viewColor) - 200)
                }
                color={"white"}
                transition="border background-color color 0.3s ease"
                leftIcon={isMediumScreen ? <FaDownload /> : undefined}
              >
                {!isMediumScreen ? <FaDownload /> : "Download"}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              p={3}
              zIndex="999"
              w="fit-content"
              maxW="400px"
              boxShadow="lg"
              border="2px solid"
              borderColor={"gray.200"}
              gap={2}
            >
              <Text fontSize="md" fontWeight={"bold"}>
                Downloads
              </Text>
              <Button
                mr={2}
                onClick={() => void exportResumes.handleDownloadResumes()}
                border="1px solid transparent"
                _hover={{
                  border: "1px solid black",
                  backgroundColor: "gray.300",
                  color: "black"
                }}
                backgroundColor={"blue.500"}
                color={"white"}
                isDisabled={selection.selectedResumes.length < 1}
                transition="border background-color color 0.3s ease"
                justifyContent={"flex-start"}
                w="100%"
                leftIcon={<FaRegFilePdf />}
              >
                Selected resumes (PDFs)
              </Button>

              <Button
                onClick={() => void exportResumes.downloadResumesCSV(true)}
                border="1px solid transparent"
                _hover={{
                  border: "1px solid black",
                  backgroundColor: "gray.300",
                  color: "black"
                }}
                backgroundColor={"blue.500"}
                color={"white"}
                isDisabled={selection.selectedResumes.length < 1}
                transition="border background-color color 0.3s ease"
                w="100%"
                leftIcon={<FaFileCsv />}
                justifyContent={"flex-start"}
              >
                Selected profiles (CSV)
              </Button>

              <Button
                onClick={() => void exportResumes.downloadResumesCSV(false)}
                border="1px solid transparent"
                _hover={{
                  border: "1px solid black",
                  backgroundColor: "gray.300",
                  color: "black"
                }}
                backgroundColor={"blue.500"}
                color={"white"}
                transition="border background-color color 0.3s ease"
                w="100%"
                leftIcon={<FaFileCsv />}
                justifyContent={"flex-start"}
              >
                All profiles under filter (CSV)
              </Button>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Box>
  );
}
