import { Resume } from "@/routes/ResumeBook/ResumeBook";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function useModalNavHook({
  resumes,
  allFilteredResumes,
  onToast
}: {
  resumes: Resume[];
  allFilteredResumes: Resume[];
  onToast: (message: string) => void;
}) {
  const [initialized, setInitialized] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const { resumeId } = useParams<{ resumeId?: string }>();
  const navigate = useNavigate();
  const { onOpen, onClose } = useDisclosure();

  const numPrevious = useMemo(() => {
    if (!selectedResume) {
      return 0;
    }
    const currentIndex = allFilteredResumes.findIndex(
      (r) => r.id === selectedResume.id
    );
    return currentIndex > 0 ? currentIndex : 0;
  }, [selectedResume, allFilteredResumes]);

  const numNext = useMemo(() => {
    if (!selectedResume) {
      return 0;
    }
    const currentIndex = allFilteredResumes.findIndex(
      (r) => r.id === selectedResume.id
    );
    return currentIndex < allFilteredResumes.length - 1
      ? allFilteredResumes.length - currentIndex - 1
      : 0;
  }, [selectedResume, allFilteredResumes]);

  const handleOpenResume = (resume: Resume) => {
    setSelectedResume(resume);
    navigate(`/resume-book/${resume.id}`);
    onOpen();
  };

  const handleCloseResume = () => {
    setSelectedResume(null);
    navigate(`/resume-book`);
    onClose();
  };

  const handleNextResume = () => {
    const currentIndex = allFilteredResumes.findIndex(
      (r) => r.id === selectedResume?.id
    );
    if (currentIndex < allFilteredResumes.length - 1) {
      const nextResume = allFilteredResumes[currentIndex + 1];
      handleOpenResume(nextResume);
    } else {
      onToast("No more resumes to view.");
    }
  };

  const handlePreviousResume = () => {
    const currentIndex = allFilteredResumes.findIndex(
      (r) => r.id === selectedResume?.id
    );
    if (currentIndex > 0) {
      const previousResume = allFilteredResumes[currentIndex - 1];
      handleOpenResume(previousResume);
    } else {
      onToast("No previous resume to view.");
    }
  };

  useEffect(() => {
    if (!resumes) {
      return;
    }
    if (resumes.length === 0) {
      return;
    }

    if (!initialized) {
      if (resumeId) {
        const selectedResume = resumes.find((resume) => resume.id === resumeId);
        if (!selectedResume) {
          onToast("Resume not found");
          return;
        }
        handleOpenResume(selectedResume);
      }

      setInitialized(true);
    }
  }, [resumeId, resumes]);

  return {
    selectedResume,
    setSelectedResume,
    handleOpenResume,
    handleCloseResume,
    handleNextResume,
    handlePreviousResume,
    numNext,
    numPrevious
  };
}
