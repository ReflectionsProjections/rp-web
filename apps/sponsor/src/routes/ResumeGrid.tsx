import { Box, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Resume } from "./ResumeBook/ResumeBook";
import ResumeGridBox from "./ResumeGridBox";

interface ResumeGridProps {
  resumes: Resume[];
  selectedResumes: string[];
  toggleResume: (id: string) => void;
  openResume: (id: Resume) => void;
  baseColor: string;
}

const ResumeGrid: React.FC<ResumeGridProps> = ({
  resumes,
  selectedResumes,
  toggleResume,
  openResume,
  baseColor
}) => {
  const bgColor =
    parseInt(baseColor) < 500
      ? "gray." + (parseInt(baseColor) - 100)
      : "gray." + (100 + parseInt(baseColor));
  const [screenIsLarge] = useMediaQuery("(min-width: 800px)");

  return (
    <Box py={3} pt={2}>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing="2">
        {resumes.map((resume) => {
          const isSelected = selectedResumes.includes(resume.id);
          return (
            <ResumeGridBox
              resume={resume}
              screenIsLarge={screenIsLarge}
              key={resume.id}
              isSelected={isSelected}
              toggleResume={toggleResume}
              openResume={openResume}
              baseColor={baseColor}
              bgColor={bgColor}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ResumeGrid;
