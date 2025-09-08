import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa6";
import PortfolioLinks from "../../components/PortfolioLinks";
import { Config } from "../../config";
import { Resume } from "./ResumeBook";

interface MajorsMinorsListProps {
  degreeType?: string;
  majors: string[];
  minors: string[];
}

const MajorsMinorsList: React.FC<MajorsMinorsListProps> = ({
  degreeType,
  majors,
  minors
}) => {
  return (
    <VStack alignItems={"flex-start"} gap={0}>
      {degreeType && (
        <Text fontSize="sm" color="gray.700" fontWeight={"bold"}>
          {degreeType}
        </Text>
      )}
      {majors.map((major) => (
        <Text key={major} fontSize="sm" color="gray.700">
          {major}{" "}
          {
            <Text as="span" color="gray.500">
              (Major)
            </Text>
          }
        </Text>
      ))}
      {minors.map((minor) => (
        <Text key={minor} fontSize="sm" color="gray.700">
          {minor}{" "}
          <Text as="span" color="gray.500">
            (Minor)
          </Text>
        </Text>
      ))}
    </VStack>
  );
};

interface ResumeComponentProps {
  resume: Resume;
  isSelected: boolean;
  screenIsLarge: boolean;
  toggleResume: (id: string) => void;
  openResume: (resume: Resume) => void;
  baseColor: string;
  bgColor: string;
}

const ResumeGridBox: React.FC<ResumeComponentProps> = ({
  resume,
  isSelected,
  screenIsLarge,
  toggleResume,
  openResume,
  baseColor,
  bgColor
}) => {
  return (
    <Box
      key={resume.id}
      display="flex"
      flexDirection={"column"}
      alignItems={"space-between"}
      onClick={() => toggleResume(resume.id)}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding={3}
      boxShadow="sm"
      position="relative"
      cursor="pointer"
      borderColor={isSelected ? "blue.500" : `gray.${baseColor}`}
      transition="all 0.2s"
      bgColor={isSelected ? `blue.${baseColor}` : bgColor}
      _hover={{
        bgColor: isSelected ? `blue.${baseColor}` : `gray.200`,
        borderColor: "black",
        transform: "scale(1.05)"
      }}
    >
      <VStack alignItems={"flex-start"} mb={"auto"}>
        <Flex w="100%" alignItems={"center"} flexWrap="wrap" gap={2}>
          {Config.STAFF_UIDs.includes(resume.id) && (
            <Tooltip label="Staff Member" fontSize="md">
              <Image src="/rp_logo.svg" width="16px" height="16px" />
            </Tooltip>
          )}
          <Text fontWeight="bold" fontSize="lg" maxW={"70%"} my={0}>
            {resume.name}
          </Text>
        </Flex>
        <MajorsMinorsList
          degreeType={resume.degree}
          majors={resume.majors}
          minors={resume.minors}
        />
        {/* <Text color="gray.500" fontSize="sm" mr="20px">
          {resume.degree} - {formatMajorsMinors(resume.majors, resume.minors)}
        </Text> */}
        <Text color="gray.500" fontSize="sm">
          {resume.graduationYear}
        </Text>
      </VStack>
      <HStack w="100%" justifyContent="space-between" mt={2}>
        <PortfolioLinks
          resume={resume}
          showPlaceholders={true}
          isMediumScreen={screenIsLarge}
        />
        <IconButton
          aria-label={`View Resume`}
          icon={<FaFilePdf />}
          size={
            screenIsLarge
              ? {
                  base: "35px",
                  lg: "40px"
                }
              : "md"
          }
          w={
            screenIsLarge
              ? {
                  base: "35px",
                  lg: "40px"
                }
              : "40px"
          }
          height={
            screenIsLarge
              ? {
                  base: "32px",
                  lg: "40px"
                }
              : "40px"
          }
          fontSize={
            screenIsLarge
              ? {
                  base: "md",
                  lg: "xl"
                }
              : "20px"
          }
          variant="solid"
          backgroundColor={"blue.600"}
          _hover={{
            backgroundColor: "gray.500"
          }}
          color={"white"}
          onClick={(e) => {
            e.stopPropagation();
            openResume(resume);
          }}
        />
      </HStack>
    </Box>
  );
};

export default ResumeGridBox;
