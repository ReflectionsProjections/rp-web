import React from "react";
import { SimpleGrid, Box, useToast } from "@chakra-ui/react";
import ResumeGridBox from "./ResumeGridBox";
import axios from "axios";
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

interface ResumeGridProps {
  resumes: Resume[];
  selectedResumes: string[];
  toggleResume: (id: string) => void;
  baseColor: string;
}

const ResumeGrid: React.FC<ResumeGridProps> = ({
  resumes,
  selectedResumes,
  toggleResume,
  baseColor
}) => {
  const bgColor =
    parseInt(baseColor) < 500
      ? "gray." + (parseInt(baseColor) - 100)
      : "gray." + (100 + parseInt(baseColor));
  const toast = useToast();

  const showToast = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true
    });
  };

  const openResume = (id: string) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .get(Config.API_BASE_URL + "/s3/download/user/" + id, {
        headers: {
          Authorization: jwt
        }
      })
      .then(function (response) {
        window.open(response.data.url, "_blank");
        // console.log(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
        showToast("Failed to open resume. Please try again later.");
      });
  };

  return (
    <Box padding="4">
      {/* <Text fontSize="2xl" mb="4">Resumes</Text> */}
      <SimpleGrid columns={{ sm: 2, md: 4, lg: 6 }} spacing="6">
        {resumes.map((resume) => {
          const isSelected = selectedResumes.includes(resume.id);
          return (
            // <Box
            //     key={resume.id}
            //     onClick={() => toggleResume(resume.id)}
            //     borderWidth="3px"
            //     borderRadius="lg"
            //     overflow="hidden"
            //     padding="4"
            //     // background={isSelected ? 'blue.200' : 'gray.'+baseColor}
            //     boxShadow="md"
            //     position="relative"
            //     cursor="pointer"
            //     borderColor={isSelected ? 'blue.500' : 'gray.'+baseColor}
            //     transition='all 0.2s'
            //     background={isSelected ? 'blue.'+baseColor : bgColor}
            //     _hover={{ background: isSelected ? 'blue.'+baseColor : 'gray.'+(parseInt(baseColor) > 500 ? parseInt(baseColor)-100 : parseInt(baseColor)+100), transform: 'scale(1.05)', borderColor: 'black', borderWidth: '3px'}}
            //     //   _hover={{ borderColor: 'black', borderWidth: '2px' }}
            //     >
            //     <Tooltip label='Open Resume' fontSize='md'>
            //       <Box padding='2px' borderRadius='5px' bg="transparent" _hover={{ bg: 'blue.300' }} transition="background-color 0.3s ease" position="absolute" top="2" right="2" onClick={(e) => {e.stopPropagation(); openResume(resume.id);}}>
            //           <MdOpenInNew size={30} />
            //       </Box>
            //     </Tooltip>

            //     <Tooltip label='Show Links' fontSize='md'>
            //       <Box padding='2px' borderRadius='5px' bg="transparent" _hover={{ bg: 'green.300' }} transition="background-color 0.3s ease" position="absolute" bottom="2" right="2" onClick={(e) => {e.stopPropagation(); openResume(resume.id);}}>
            //           <MdList size={30} />
            //       </Box>
            //     </Tooltip>
            //     <Box width='108%' height='30%'>
            //         <VStack align="start" mt="4">
            //             <Text fontWeight="bold" fontSize="lg" maxW={'70%'}>{resume.name}</Text>
            //             <Text mb={6} color="gray.500" fontSize="sm" mr='20px'>{resume.major}</Text>
            //             <Text position="absolute" bottom="4" left="4" color="gray.500" fontSize="sm">{resume.graduationYear}</Text>
            //         </VStack>
            //     </Box>
            // </Box>
            <ResumeGridBox
              resume={resume}
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
