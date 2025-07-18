import {
  Box,
  Center,
  Icon,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import ResumeList, { SingleCol } from "../ResumeList";
import ResumeGrid from "../ResumeGrid";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Resume } from "./ResumeBook";

export type ResumeBookProps = {
  loading: boolean;
  showList: boolean;
  resumeData: {
    filteredResumes: Resume[];
  };
  selection: {
    selectedResumes: string[];
    toggleResume: (id: string) => void;
  };
  sorting: {
    sortByColumn?: SingleCol;
    sortDirection: "asc" | "desc";
    handleToggleSort: (column: SingleCol) => void;
  };
  handleOpenResume: (resume: Resume) => void;
};

export function ResumeBookContent(props: ResumeBookProps) {
  const viewColor = useColorModeValue("200", "700");
  return (
    <Box w="100%" px={3} overflowY={"auto"}>
      {props.resumeData.filteredResumes.length > 0 || props.loading ? (
        props.showList ? (
          <ResumeList
            loading={props.loading}
            resumes={props.resumeData.filteredResumes}
            selectedResumes={props.selection.selectedResumes}
            openResume={props.handleOpenResume}
            toggleResume={props.selection.toggleResume}
            baseColor={viewColor}
            sortDirection={props.sorting.sortDirection}
            sortByColumn={props.sorting.sortByColumn}
            onSortByColumn={props.sorting.handleToggleSort}
          />
        ) : (
          <ResumeGrid
            resumes={props.resumeData.filteredResumes}
            selectedResumes={props.selection.selectedResumes}
            toggleResume={props.selection.toggleResume}
            openResume={props.handleOpenResume}
            baseColor={viewColor}
          />
        )
      ) : (
        <Center
          minH="60vh"
          border="2px solid"
          borderColor="gray.300"
          borderRadius="2xl"
        >
          <VStack>
            <Icon
              as={FaMagnifyingGlass}
              boxSize={100}
              color="gray.400"
              mb={4}
              opacity={0.5}
            />
            <Text fontSize="2xl" color="gray.500">
              No resumes matched this criteria.
            </Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
}
