import api from "@/util/api";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spacer,
  Spinner,
  Text,
  useSafeLayoutEffect,
  useToast
} from "@chakra-ui/react";
import { path } from "@rp/shared";
import axios from "axios";
import { saveAs } from "file-saver";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import PortfolioLinks from "../../components/PortfolioLinks";
import { Resume } from "./ResumeBook";

type ResumePopupModalProps = {
  isMediumScreen: boolean;
  resume: Resume | null;
  numPrevious: number;
  numNext: number;

  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const ResumePopupModal = ({
  resume,
  isMediumScreen,
  onClose,
  onPrevious,
  onNext,
  numPrevious,
  numNext
}: ResumePopupModalProps) => {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const toast = useToast();

  const showToast = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true
    });
  };

  const handleLoadResume = () => {
    setResumeLoading(true);
    if (!resume) {
      return;
    }
    console.log("resume", resume);
    api
      .get(path("/s3/download/user/:userId", { userId: resume.id }))
      .then((response) => {
        setResumeUrl(response.data.url);
        setTimeout(() => {
          setResumeLoading(false);
        }, 1000);
      })
      .catch(() => {
        showToast("Failed to open resume. Please try again later.");
        setResumeLoading(false);
      });
  };

  useSafeLayoutEffect(() => {
    handleLoadResume();
  }, [resume]);

  const [resumeLoading, setResumeLoading] = useState(false);

  const handleDownloadResume = async () => {
    if (!resumeUrl || !resume) {
      showToast("No resume available for download.");
      return;
    }

    try {
      // Fetch the file as a blob
      const fileResponse = await axios.get<unknown, { data: Blob }>(resumeUrl, {
        responseType: "blob"
      });

      saveAs(
        fileResponse.data,
        resume.name
          ? `${resume.name}-${resume.graduationYear}.pdf`
          : "resume.pdf"
      );
    } catch (error) {
      console.error("Download failed:", error);
      showToast("Failed to download resume. Please try again.");
    }
  };

  const hasLinks = resume?.portfolios && resume.portfolios.length > 0;

  return (
    <Modal isOpen={resume !== null} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent
        h={isMediumScreen ? "95dvh" : "90dvh"}
        my={"auto"}
        mt={isMediumScreen ? "auto" : 0}
      >
        {resume !== null && (
          <>
            <ModalHeader>
              <Flex
                justifyContent="space-between"
                alignItems={"flex-start"}
                gap={2}
                flexDir={{
                  base: "column",
                  md: "row"
                }}
              >
                <Flex w="100%">
                  <Flex flexDirection={"column"} w="100%">
                    <Text fontSize="2xl" fontWeight="bold">
                      {resume.name}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                      {resume.degree} | {resume.major} | {resume.graduationYear}
                    </Text>
                  </Flex>
                  <IconButton
                    display={{
                      base: "flex",
                      md: "none"
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    aria-label="Close"
                    icon={<FaTimes />}
                    onClick={onClose}
                    ml="auto"
                  />
                </Flex>
                <Flex
                  w="100%"
                  mt={1}
                  justifyContent={{
                    base: "flex-start",
                    md: "flex-end"
                  }}
                >
                  {resumeLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <HStack spacing={2}>
                        <PortfolioLinks
                          resume={resume}
                          showPlaceholders={false}
                        />
                        <IconButton
                          display={{
                            base: "none",
                            md: "flex"
                          }}
                          aria-label="Close Resume"
                          icon={<FaTimes />}
                          onClick={onClose}
                          ml={2}
                        />
                      </HStack>
                      {resumeUrl && (
                        <Button
                          colorScheme="blue"
                          aria-label="Download Resume"
                          leftIcon={hasLinks ? undefined : <FaDownload />}
                          ml={hasLinks ? "auto" : undefined}
                          px={hasLinks ? 2 : 4}
                          display={{
                            base: "flex",
                            md: "none"
                          }}
                          onClick={() => {
                            void handleDownloadResume();
                          }}
                        >
                          {hasLinks ? <FaDownload /> : "Download Resume"}
                        </Button>
                      )}
                    </>
                  )}
                </Flex>
              </Flex>
            </ModalHeader>
            <ModalBody height="100%">
              {resumeUrl && (
                <Box
                  w="100%"
                  height={resumeLoading ? "0px" : "100%"}
                  outline="2px solid"
                  outlineColor="gray.200"
                >
                  <iframe src={resumeUrl} width="100%" height="100%" />
                </Box>
              )}
              {resumeLoading && (
                <Skeleton
                  height={"100%"}
                  width="100%"
                  borderRadius="md"
                  startColor="gray.200"
                  endColor="gray.300"
                />
              )}
            </ModalBody>
            <ModalFooter
              display={"flex"}
              // flexDir={isMediumScreen ? "row" : "column"}
              flexDir={{
                base: "column",
                md: "row"
              }}
              pt={2}
              w="100%"
            >
              <Flex
                gap={2}
                // hidden={!isMediumScreen}
                display={{
                  base: "none",
                  md: "flex"
                }}
              >
                {resumeUrl && (
                  <Button
                    colorScheme="blue"
                    aria-label="Download Resume"
                    onClick={() => void handleDownloadResume()}
                  >
                    <FaDownload />
                    <Box
                      as="span"
                      ml={2}
                      display={{ base: "none", md: "inline" }}
                    >
                      Download Resume
                    </Box>
                  </Button>
                )}
              </Flex>
              <Spacer />

              <Flex
                gap={2}
                // justifyContent={isMediumScreen ? "flex-end" : "space-between"}
                justifyContent={{
                  base: "space-between",
                  md: "flex-end"
                }}
                w="100%"
              >
                <Button
                  colorScheme="blue"
                  onClick={onPrevious}
                  isDisabled={!resumeUrl || numPrevious === 0}
                >
                  Previous
                  <Text
                    fontWeight={"normal"}
                    ml={2}
                    color="gray.200"
                    fontSize="sm"
                  >
                    {numPrevious}
                  </Text>
                </Button>

                <Button
                  colorScheme="blue"
                  onClick={onNext}
                  isDisabled={!resumeUrl || numNext === 0}
                >
                  Next
                  <Text
                    fontWeight={"normal"}
                    ml={2}
                    color="gray.200"
                    fontSize="sm"
                  >
                    {numNext}
                  </Text>
                </Button>
              </Flex>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResumePopupModal;
