import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  useMediaQuery,
  useToast,
  Icon
} from "@chakra-ui/react";
import ResumeListBox from "./ResumeListBox";
import { Resume } from "./ResumeBook";
import api from "@/util/api";
import { path } from "@rp/shared";
import { FaBook, FaGraduationCap, FaUniversity, FaUser } from "react-icons/fa";

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
      display="flex"
      alignItems={"center"}
      gap={2}
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
          backgroundColor={"blue.400"}
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
    graduationYear: 300,
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

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    setColumnWidths({
      checkbox: 75,
      name: 200,
      major: 200,
      degree: 150,
      graduationYear: 200,
      actions: 100,
      data: 100
    });
  }, []);

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
    api
      .get(path("/s3/download/user/:userId", { userId: id }))
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
        overflow="hidden"
        padding="4"
        background={bgColor}
        boxShadow="md"
        width="100%"
        zIndex="10"
        borderTopRadius={"lg"}
        bgColor="gray.300"
        fontFamily={"Anonymous Pro"}
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
          <GridItem></GridItem>
          {isLargerThan700 ? (
            <>
              <GridItem>
                <ResizableColumn
                  width={columnWidths.name}
                  onResize={(width) => handleResize("name", width)}
                  canResize={true}
                  baseColor={baseColor}
                >
                  <Icon as={FaUser} boxSize={4} />
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
                  <Icon as={FaUniversity} boxSize={4} />
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
                  <Icon as={FaBook} boxSize={4} />
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
                  <Icon as={FaGraduationCap} boxSize={4} />
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
