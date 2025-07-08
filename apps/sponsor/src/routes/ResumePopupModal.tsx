import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spacer,
  Text,
  useSafeLayoutEffect,
  useToast
} from "@chakra-ui/react";
import { Resume } from "./ResumeBook";
import api from "@/util/api";
import { path } from "@rp/shared";
import { useState } from "react";
import PortfolioLinks from "./PortfolioLinks";

type ResumePopupModalProps = {
  isLargerThan700: boolean;
  resume: Resume | null;
  baseColor: string;
  numPrevious: number;
  numNext: number;

  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const ResumePopupModal = ({
  resume,
  onClose,
  isLargerThan700,
  baseColor,
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
      .catch((error) => {
        console.log(error);
        showToast("Failed to open resume. Please try again later.");
      });
  };

  useSafeLayoutEffect(() => {
    handleLoadResume();
  }, [resume]);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const [resumeLoading, setResumeLoading] = useState(false);

  const handleDownloadResume = async () => {
    if (!resumeUrl || !resume) {
      showToast("No resume available for download.");
      return;
    }

    try {
      // Fetch the file as a blob
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch resume");
      }

      const blob = await response.blob();

      // Create object URL and download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resume.name
        ? `${resume.name}-${resume.graduationYear}.pdf`
        : "resume.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      showToast("Failed to download resume. Please try again.");
    }
  };

  return (
    <Modal isOpen={resume !== null} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent h="98vh" my={"auto"}>
        {resume !== null && (
          <>
            <ModalHeader>
              {resume.name}

              <Text fontSize="md" color="gray.500">
                {resume.degree} | {resume.major} | {resume.graduationYear}
              </Text>
            </ModalHeader>
            <ModalBody height="100%">
              {resumeUrl && (
                <iframe
                  src={resumeUrl}
                  width="100%"
                  height={resumeLoading ? "0px" : "100%"}
                />
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
            <ModalFooter>
              {resumeUrl && (
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    void handleDownloadResume();
                  }}
                >
                  Download
                </Button>
              )}

              <PortfolioLinks
                isLargerThan700={isLargerThan700}
                isExpanded={isExpanded}
                resume={resume}
                baseColor={baseColor}
                onCollapse={handleCollapse}
                onExpand={handleExpand}
              />
              <Button onClick={onClose} ml={3}>
                Close
              </Button>
              <Spacer />

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
                ml={3}
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResumePopupModal;
