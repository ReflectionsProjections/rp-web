import {
  Box,
  ChakraProvider,
  Flex,
  useColorModeValue,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useModalNavHook } from "@/hooks/use-modal-nav-hook";
import { useResumeDataPaginationHook } from "@/hooks/use-resume-data-pagination-hook";
import ResumePopupModal from "../ResumePopupModal";
import { ResumeBookContent, ResumeBookProps } from "./ResumeBookContent";
import { ResumeBookFooter } from "./ResumeBookFooter";
import { ResumeBookHeader, ResumeBookHeaderProps } from "./ResumeBookHeader";
import { ResumeBookNavbar } from "./ResumeBookNavbar";

export interface Resume {
  id: string;
  name: string;
  major: string | null;
  degree?: string;
  graduationYear: string | null;
  jobInterest: Array<string>;
  portfolios?: Array<string>;
}

export function ResumeBook() {
  const toast = useToast();
  const [showList, setShowList] = useState(true);
  const [isMediumScreen] = useMediaQuery("(min-width: 960px)");
  const viewColor = useColorModeValue("200", "700");

  useEffect(() => {
    setShowList(isMediumScreen);
  }, [isMediumScreen]);

  const showToast = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true
    });
  };

  const resumeDataPaginationHook = useResumeDataPaginationHook({
    onToast: showToast
  });

  const modalNavHook = useModalNavHook({
    resumes: resumeDataPaginationHook.resumeData.resumes,
    allFilteredResumes: resumeDataPaginationHook.resumeData.allFilteredResumes,
    onToast: showToast
  });

  return (
    <ChakraProvider>
      <Flex flexDirection={"column"} bgColor="red" h="100vh" maxH="100vh">
        <ResumeBookNavbar setShowList={setShowList} showList={showList} />
        <Box
          bgColor={"gray.200"}
          w="100%"
          maxW="1700px"
          mx="auto"
          flex={1}
          display="flex"
          flexDir={"column"}
          h={"calc(100vh - 4rem)"}
        >
          <ResumeBookHeader
            filtering={
              resumeDataPaginationHook.filtering satisfies ResumeBookHeaderProps["filtering"]
            }
            pagination={
              resumeDataPaginationHook.pagination satisfies ResumeBookHeaderProps["pagination"]
            }
            selection={
              resumeDataPaginationHook.selection satisfies ResumeBookHeaderProps["selection"]
            }
            resumeData={
              resumeDataPaginationHook.resumeData satisfies ResumeBookHeaderProps["resumeData"]
            }
            exportResumes={
              resumeDataPaginationHook.exportResumes satisfies ResumeBookHeaderProps["exportResumes"]
            }
            viewColor={viewColor}
            isMediumScreen={isMediumScreen}
          />
          <ResumeBookContent
            loading={resumeDataPaginationHook.loading}
            resumeData={
              resumeDataPaginationHook.resumeData satisfies ResumeBookProps["resumeData"]
            }
            selection={
              resumeDataPaginationHook.selection satisfies ResumeBookProps["selection"]
            }
            sorting={
              resumeDataPaginationHook.sorting satisfies ResumeBookProps["sorting"]
            }
            showList={showList}
            handleOpenResume={modalNavHook.handleOpenResume}
          />
          <ResumeBookFooter
            startIndex={resumeDataPaginationHook.pagination.startIndex}
            endIndex={resumeDataPaginationHook.pagination.endIndex}
            allFilteredResumes={
              resumeDataPaginationHook.resumeData.allFilteredResumes
            }
            filteredResumes={
              resumeDataPaginationHook.resumeData.filteredResumes
            }
            page={resumeDataPaginationHook.pagination.page}
            pageSize={resumeDataPaginationHook.pagination.pageSize}
            displayedPage={resumeDataPaginationHook.pagination.displayedPage}
            handlePageChange={
              resumeDataPaginationHook.pagination.handlePageChange
            }
            handleNext={resumeDataPaginationHook.pagination.handleNext}
            handlePrevious={resumeDataPaginationHook.pagination.handlePrevious}
          />
        </Box>
      </Flex>
      <ResumePopupModal
        resume={modalNavHook.selectedResume}
        onClose={modalNavHook.handleCloseResume}
        isMediumScreen={isMediumScreen}
        onNext={modalNavHook.handleNextResume}
        onPrevious={modalNavHook.handlePreviousResume}
        numPrevious={modalNavHook.numPrevious}
        numNext={modalNavHook.numNext}
      />
    </ChakraProvider>
  );
}

export default ResumeBook;
