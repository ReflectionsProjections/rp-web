import { Box, Image, Text, Tooltip, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { MdLink, MdContactPage } from "react-icons/md";
import { Config } from "../config";

interface Resume {
  id: string;
  name: string;
  major: string;
  degree: string;
  graduationYear: string;
  jobInterest: Array<string>;
  portfolios?: Array<string>;
}

interface ResumeComponentProps {
  resume: Resume;
  isSelected: boolean;
  toggleResume: (id: string) => void;
  openResume: (id: string) => void;
  baseColor: string;
  bgColor: string;
}

const ResumeGridBox: React.FC<ResumeComponentProps> = ({
  resume,
  isSelected,
  toggleResume,
  openResume,
  baseColor,
  bgColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      key={resume.id}
      onClick={() => toggleResume(resume.id)}
      borderWidth="3px"
      borderRadius="lg"
      overflow="hidden"
      padding="4"
      boxShadow="md"
      position="relative"
      cursor="pointer"
      borderColor={isSelected ? "blue.500" : `gray.${baseColor}`}
      transition="all 0.2s"
      background={isSelected ? `blue.${baseColor}` : bgColor}
      _hover={{
        background: isSelected
          ? `blue.${baseColor}`
          : `gray.${parseInt(baseColor) > 500 ? parseInt(baseColor) - 100 : parseInt(baseColor) + 100}`,
        transform: "scale(1.05)",
        borderColor: "black",
        borderWidth: "3px",
      }}
    >
      {Config.STAFF_UIDs.includes(resume.id) && (
        <Tooltip label="Staff Member" fontSize="md">
          <Image src="/2024_rp_logo.svg" width='20px' height='20px' />
        </Tooltip>
      )}
      <Tooltip label="Open Resume" fontSize="md">
        <Box
          padding="2px"
          borderRadius="5px"
          bg="transparent"
          _hover={{ bg: "blue.300" }}
          transition="background-color 0.3s ease"
          position="absolute"
          top="2"
          right="2"
          onClick={(e) => {
            e.stopPropagation();
            openResume(resume.id);
          }}
        >
          <MdContactPage size={30} />
        </Box>
      </Tooltip>

      <Tooltip label={resume.portfolios?.length === 0 ? "" : "Show Links"} fontSize="md">
        <Box
          opacity={resume.portfolios?.length === 0 ? 0 : 1}
          padding="2px"
          borderRadius="5px"
          bg="transparent"
          _hover={{ bg: "green.300" }}
          transition="background-color 0.3s ease"
          position="absolute"
          bottom="2"
          right="2"
          onClick={(e) => {
            if (resume.portfolios?.length === 0) return;
            e.stopPropagation();
            toggleExpand(); // Toggle the expanded state
          }}
        >
          <MdLink size={30} />
        </Box>
      </Tooltip>

      <Box width="108%" height="30%">
        <VStack align="start" mt="4">
          <Text fontWeight="bold" fontSize="lg" maxW={"70%"}>
            {resume.name}
          </Text>
          <Text mb={isExpanded ? 0 : 6} color="gray.500" fontSize="sm" mr="20px">
            {resume.degree} in {resume.major}
          </Text>
          {isExpanded && resume.portfolios && (
        <Box mb={8} maxWidth='100%'>
          <Text fontWeight="bold" fontSize="md">
            Portfolios:
          </Text>
          <VStack align="start" spacing={2} mt={2}>
            {resume.portfolios &&
                resume.portfolios.map((link) => {
                  const url = new URL(link);
                  let displayURL = url.hostname+url.pathname;
                  if (displayURL.startsWith("www.")) {
                    displayURL = displayURL.slice(4);
                  }
                return (
                    <Button
                        key={link}
                        backgroundColor={'gray.'+baseColor}
                        _hover={{ backgroundColor: 'gray.'+(parseInt(baseColor) > 500 ? parseInt(baseColor) - 100 : parseInt(baseColor) + 100) }}
                        color={'blue.500'}
                        border={'1px solid black'}
                        fontSize={'12px'}
                        size="sm"
                        maxWidth={'100%'}
                        wordBreak={'break-all'}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(link, '_blank');
                        }}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        justifyContent={'start'}
                        paddingInlineStart={1}
                        paddingInlineEnd={1}
                    >
                        {displayURL}
                    </Button>
                );
                })}
            {/* {resume.portfolios.map((link, index) => (
              <Button
                key={index}
                size="sm"
                variant="link"
                colorScheme="blue"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(link, "_blank");
                }}
              >
                {link}
              </Button>
            ))} */}
          </VStack>
        </Box>
      )}
          <Text position="absolute" bottom="4" left="4" color="gray.500" fontSize="sm">
            {resume.graduationYear}
          </Text>
        </VStack>
      </Box>

    </Box>
  );
};

export default ResumeGridBox;