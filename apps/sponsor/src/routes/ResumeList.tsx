import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import ResumeListBox from "./ResumeListBox";
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

interface ResumeListProps {
  resumes: Resume[];
  selectedResumes: string[];
  toggleResume: (id: string) => void;
  baseColor: string;
}

const ResizableColumn: React.FC<{
  width: number;
  onResize: (width: number) => void;
  children: React.ReactNode;
  canResize: boolean;
  baseColor: string;
}> = ({ width, onResize, children, canResize, baseColor }) => {
  const startXRef = useRef<number | null>(null);
  const viewColor = "gray." + baseColor;
  const selectViewColor = "gray." + (parseInt(baseColor) - 100);
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      startXRef.current = e.clientX;

      const handleMouseMove = (e: MouseEvent) => {
        if (startXRef.current !== null) {
          const diff = e.clientX - startXRef.current;
          onResize(Math.max(50, width + diff));
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [width, onResize]
  );

  return (
    <Box
      position="relative"
      display="inline-block"
      width={`${width}px`}
      minWidth="50px"
      cursor="default"
    >
      {children}
      {canResize ? (
        <Box
          position="absolute"
          right="-6px"
          top="0"
          height="100%"
          width="3px"
          cursor="col-resize"
          backgroundColor={viewColor}
          transition="all 0.3s"
          _hover={{
            backgroundColor: { selectViewColor },
            height: "120%",
            top: "-10%"
          }}
          onMouseDown={handleMouseDown}
          zIndex="1"
        />
      ) : null}
    </Box>
  );
};

const ResumeList: React.FC<ResumeListProps> = ({
  resumes,
  selectedResumes,
  toggleResume,
  baseColor
}) => {
  const [columnWidths, setColumnWidths] = useState({
    checkbox: 50,
    name: 175,
    major: 300,
    degree: 150,
    graduationYear: 150,
    actions: 150,
    data: 300
  });

  const navbarRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [navbarTop, setNavbarTop] = useState(0);
  // const viewColor = "gray."+baseColor;
  const bgColor =
    parseInt(baseColor) < 500
      ? "gray." + (parseInt(baseColor) - 100)
      : "gray." + (100 + parseInt(baseColor));
  // const selectViewColor = useColorModeValue("gray.300","gray.600")

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      setNavbarTop(navbar.offsetTop);
    }

    const handleScroll = () => {
      if (navbar) {
        const scrollY = window.scrollY;
        setIsSticky(scrollY > navbarTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarTop, baseColor]);

  const [isLargerThan2560] = useMediaQuery("(min-width: 2560px)");
  const [isLargerThan1800] = useMediaQuery("(min-width: 1800px)");
  const [isLargerThan1550] = useMediaQuery("(min-width: 1550px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan960] = useMediaQuery("(min-width: 960px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [isLargerThan400] = useMediaQuery("(min-width: 400px)");
  const [isLargerThan330] = useMediaQuery("(min-width: 330px)");

  useEffect(() => {
    if (isLargerThan2560) {
      setColumnWidths({
        checkbox: 50,
        name: 600,
        major: 600,
        degree: 500,
        graduationYear: 500,
        actions: 250,
        data: 300
      });
    } else if (isLargerThan1800) {
      setColumnWidths({
        checkbox: 50,
        name: 475,
        major: 350,
        degree: 300,
        graduationYear: 250,
        actions: 250,
        data: 300
      });
    } else if (isLargerThan1550) {
      setColumnWidths({
        checkbox: 50,
        name: 425,
        major: 300,
        degree: 200,
        graduationYear: 200,
        actions: 250,
        data: 300
      });
    } else if (isLargerThan1280) {
      setColumnWidths({
        checkbox: 50,
        name: 300,
        major: 300,
        degree: 150,
        graduationYear: 100,
        actions: 200,
        data: 300
      });
    } else if (isLargerThan960) {
      setColumnWidths({
        checkbox: 50,
        name: 150,
        major: 200,
        degree: 120,
        graduationYear: 100,
        actions: 205,
        data: 300
      });
    } else if (isLargerThan700) {
      setColumnWidths({
        checkbox: 50,
        name: 125,
        major: 120,
        degree: 80,
        graduationYear: 90,
        actions: 110,
        data: 300
      });
    } else if (isLargerThan550) {
      setColumnWidths({
        checkbox: 50,
        name: 100,
        major: 150,
        degree: 100,
        graduationYear: 100,
        actions: 100,
        data: 300
      });
    } else if (isLargerThan400) {
      setColumnWidths({
        checkbox: 50,
        name: 100,
        major: 150,
        degree: 100,
        graduationYear: 100,
        actions: 60,
        data: 220
      });
    } else if (isLargerThan330) {
      setColumnWidths({
        checkbox: 50,
        name: 125,
        major: 200,
        degree: 150,
        graduationYear: 100,
        actions: 60,
        data: 150
      });
    } else {
      setColumnWidths({
        checkbox: 50,
        name: 125,
        major: 200,
        degree: 150,
        graduationYear: 100,
        actions: 60,
        data: 100
      });
    }
  }, [
    isLargerThan1800,
    isLargerThan1550,
    isLargerThan1280,
    isLargerThan960,
    isLargerThan700,
    isLargerThan550,
    isLargerThan400,
    isLargerThan330
  ]);

  const [isDragging] = useState(false);

  const handleResize = useCallback(
    (column: keyof typeof columnWidths, newWidth: number) => {
      setColumnWidths((prev) => ({
        ...prev,
        [column]: newWidth
      }));
    },
    []
  );

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
        // console.log(response.data.url);
        window.open(response.data.url, "_blank");
      })
      .catch(function (error) {
        console.log(error);
        showToast("Failed to open resume. Please try again later.");
      });
  };

  return (
    <VStack
      spacing="0"
      align="stretch"
      paddingTop={isSticky ? `${navbarRef.current?.offsetHeight}px` : "0px"}
      userSelect={isDragging ? "none" : "auto"}
    >
      <Box
        ref={navbarRef}
        position={isSticky ? "fixed" : "relative"}
        top={isSticky ? "0" : undefined}
        borderWidth="1px"
        overflow="hidden"
        padding="4"
        background={bgColor}
        boxShadow="md"
        width="100%"
        zIndex="10"
      >
        <Grid
          templateColumns={
            isLargerThan700
              ? `${columnWidths.checkbox}px ${columnWidths.name}px ${columnWidths.degree}px ${columnWidths.major}px ${columnWidths.graduationYear}px ${columnWidths.actions}px`
              : `${columnWidths.checkbox}px ${columnWidths.data}px ${columnWidths.actions}px`
          }
          gap={4}
          alignItems="center"
        >
          <GridItem>
            <Text fontWeight="bold">Select</Text>
          </GridItem>
          {isLargerThan700 ? (
            <>
              <GridItem>
                <ResizableColumn
                  width={columnWidths.name}
                  onResize={(width) => handleResize("name", width)}
                  canResize={true}
                  baseColor={baseColor}
                >
                  <Text fontWeight="bold">Name</Text>
                </ResizableColumn>
              </GridItem>
              <GridItem>
                <ResizableColumn
                  width={columnWidths.degree}
                  onResize={(width) => handleResize("degree", width)}
                  canResize={true}
                  baseColor={baseColor}
                >
                  <Text fontWeight="bold">Degree</Text>
                </ResizableColumn>
              </GridItem>
              <GridItem>
                <ResizableColumn
                  width={columnWidths.major}
                  onResize={(width) => handleResize("major", width)}
                  canResize={true}
                  baseColor={baseColor}
                >
                  <Text fontWeight="bold">Major</Text>
                </ResizableColumn>
              </GridItem>
              <GridItem>
                <ResizableColumn
                  width={columnWidths.graduationYear}
                  onResize={(width) => handleResize("graduationYear", width)}
                  canResize={true}
                  baseColor={baseColor}
                >
                  <Text fontWeight="bold">Graduation</Text>
                </ResizableColumn>
              </GridItem>
            </>
          ) : (
            <GridItem>
              <ResizableColumn
                width={columnWidths.data}
                onResize={(width) => handleResize("data", width)}
                canResize={true}
                baseColor={baseColor}
              >
                <Text fontWeight="bold">Data</Text>
              </ResizableColumn>
            </GridItem>
          )}
          <GridItem>
            <ResizableColumn
              width={columnWidths.actions}
              onResize={(width) => handleResize("actions", width)}
              canResize={false}
              baseColor={baseColor}
            >
              <Text fontWeight="bold">Actions</Text>
            </ResizableColumn>
          </GridItem>
        </Grid>
      </Box>

      {/* {isSticky && (
        <Box height={`${navbarRef.current?.offsetHeight}px`} />
      )} */}

      {resumes.map((resume) => {
        return (
          <ResumeListBox
            resume={resume}
            key={resume.id}
            isSelected={selectedResumes.includes(resume.id)}
            columnWidths={columnWidths}
            isLargerThan700={isLargerThan700}
            toggleResume={toggleResume}
            openResume={openResume}
            baseColor={baseColor}
            bgColor={bgColor}
          />
        );
        // const isSelected = selectedResumes.includes(resume.id);
        // const [isExpanded, setIsExpanded] = useState(false);
        // const isExpanded = true;

        // const toggleExpand = () => {
        //   setIsExpanded(!isExpanded);
        // };
        // return (
        //   <Box
        //   key={resume.id}
        //   borderWidth='2px'
        //   padding='10px'
        //   background={isSelected ? 'blue.' + baseColor : bgColor}
        //   borderRadius="lg"
        //   overflow="hidden"
        //   marginTop='1'
        //   boxShadow="md"
        //   position="relative"
        //   cursor="pointer"
        //   transition="all 0.2s ease"
        //   _hover={{ background: isSelected ? 'blue.' + (parseInt(baseColor) + 100) : 'gray.' + (parseInt(baseColor) > 500 ? parseInt(baseColor) - 100 : parseInt(baseColor) + 100), boxShadow: 'lg' }}
        //   borderColor={isSelected ? 'blue.500' : 'gray.' + baseColor}
        //   onClick={() => toggleResume(resume.id)}
        // >
        //   <Grid templateColumns={
        //       isLargerThan700
        //       ? `${columnWidths.checkbox}px ${columnWidths.name}px ${columnWidths.major}px ${columnWidths.graduationYear}px ${columnWidths.actions}px`
        //       : `${columnWidths.checkbox}px ${columnWidths.data}px ${columnWidths.actions}px`
        //   } gap={4} alignItems="center">
        //     <GridItem>
        //       <Checkbox
        //         size="lg"
        //         isChecked={isSelected}
        //         onChange={() => toggleResume(resume.id)}
        //       />
        //     </GridItem>
        //     {isLargerThan700 ? (
        //       <>
        //         <GridItem>
        //           <HStack spacing={2}>
        //             <Text fontWeight="bold" fontSize="lg">{resume.name}</Text>
        //             <Button
        //               backgroundColor='blue.500'
        //               color='white'
        //               size="sm"
        //               onClick={(e) => {
        //                 e.stopPropagation();
        //                 openResume(resume.id);
        //               }}
        //             >
        //               {isLargerThan550 ? '>' : <MdOpenInNew />}
        //             </Button>
        //           </HStack>
        //         </GridItem>
        //         <GridItem>
        //           <Text color="gray.500" fontSize="sm">{resume.major}</Text>
        //         </GridItem>
        //         <GridItem>
        //           <Text color="gray.500" fontSize="sm">{resume.graduationYear}</Text>
        //         </GridItem>
        //       </>
        //     ) : (
        //       <GridItem>
        //         <VStack align="start" spacing={1}>
        //           <Text fontWeight="bold" fontSize="lg">{resume.name}</Text>
        //           <Text color="gray.500" fontSize="sm">{resume.major}</Text>
        //           <Text color="gray.500" fontSize="sm">{resume.graduationYear}</Text>
        //         </VStack>
        //       </GridItem>
        //     )}
        //     <GridItem zIndex='5'>
        //       <HStack spacing={2}>
        //         <Button
        //           backgroundColor='blue.500'
        //           color='white'
        //           size="sm"
        //           onClick={(e) => {
        //             e.stopPropagation();
        //             openResume(resume.id);
        //           }}
        //         >
        //           {isLargerThan550 ? 'Open Resume' : <MdOpenInNew />}
        //         </Button>
        //         <Button
        //           backgroundColor='blue.500'
        //           color='white'
        //           size="sm"
        //           onClick={(e) => {
        //             e.stopPropagation();
        //             toggleExpand(); // Toggle the expanded state
        //           }}
        //         >
        //           {isLargerThan550 ? 'Portfolio Links' : <MdOpenInNew />}
        //         </Button>
        //       </HStack>
        //     </GridItem>
        //   </Grid>

        //   {/* Conditionally render additional buttons if expanded */}
        //   {isExpanded && (
        //     <HStack spacing={2} marginTop={2}>
        //       <Button
        //         backgroundColor='blue.500'
        //         color='white'
        //         size="sm"
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           // Handle additional button 1 click
        //         }}
        //       >
        //         Additional Button 1
        //       </Button>
        //       <Button
        //         backgroundColor='blue.500'
        //         color='white'
        //         size="sm"
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           // Handle additional button 2 click
        //         }}
        //       >
        //         Additional Button 2
        //       </Button>
        //       <Button
        //         backgroundColor='blue.500'
        //         color='white'
        //         size="sm"
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           // Handle additional button 3 click
        //         }}
        //       >
        //         Additional Button 3
        //       </Button>
        //       <Button
        //         backgroundColor='blue.500'
        //         color='white'
        //         size="sm"
        //         onClick={(e) => {
        //           e.stopPropagation();
        //           // Handle additional button 4 click
        //         }}
        //       >
        //         Additional Button 4
        //       </Button>
        //     </HStack>
        //   )}
        // </Box>
        // );
      })}
    </VStack>
  );
};

export default ResumeList;
