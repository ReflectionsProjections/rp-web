import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Icon,
  Image,
  IconButton,
  Text,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useToast,
  useColorMode,
  useColorModeValue,
  Input,
  Center,
  ButtonGroup,
  useMediaQuery
} from "@chakra-ui/react";
import ResumeGrid from "./ResumeGrid";
import ResumeList from "./ResumeList";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { majors } from "../components/majors";
import { BsGrid, BsList, BsDownload } from "react-icons/bs";
import { BiSelectMultiple } from "react-icons/bi";
import { TiDocumentDelete } from "react-icons/ti";

import axios from "axios";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Config } from "../config";
import { FaMoon, FaSun } from "react-icons/fa";

interface Resume {
  id: string;
  name: string;
  major: string;
  degree: string;
  graduationYear: string;
  jobInterest: Array<string>;
  portfolios?: Array<string>;
}

// interface ResumeLink {
//     url: string;
// }

interface ResumeIDs {
  userId: string;
  name: string;
  major: string;
  degree: string;
  graduation: string;
  jobInterest: Array<string>;
  portfolios?: Array<string>;
}

export function ResumeBook() {
  const toast = useToast();
  const { toggleColorMode } = useColorMode();

  // const resumes: Resume[] = [
  // { id: '1', name: 'Finn the Human', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Professional Furry', graduationYear: '2022'},
  // { id: '2', name: 'Jake the Dog', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Backend', graduationYear: '2023'},
  // { id: '3', name: 'Princess Bubblegum', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Frontend', graduationYear: '2024'},
  // { id: '4', name: 'Marceline the Vampire Queen', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Fullstack', graduationYear: '2025'},
  // { id: '5', name: 'BMO', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'DevOps', graduationYear: '2026'},
  // { id: '6', name: 'Princess Lumpy Space', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Designer', graduationYear: '2027'},
  // { id: '7', name: 'Ice King', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Manager', graduationYear: '2028'},
  // { id: '8', name: 'SpongeBob SquarePants', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'CEO', graduationYear: '2029'},
  // { id: '9', name: 'Patrick Star', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'CTO', graduationYear: '2030'},
  // { id: '10', name: 'Squidward Tentacles', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Sales', graduationYear: '2031'},
  // { id: '11', name: 'Mr. Krabs', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Marketing', graduationYear: '2032'},
  // { id: '12', name: 'Sandy Cheeks', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Pirate', graduationYear: '2033'},
  // { id: '13', name: 'Plankton', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Musician', graduationYear: '2034'},
  // { id: '14', name: 'Gary the Snail', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Rapper', graduationYear: '2035'},
  // { id: '15', name: 'Pearl Krabs', imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png', major: 'Singer', graduationYear: '2036'},
  // Add more resumes here
  // ];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
  const [showList, setShowList] = useState(true);
  const [selectedResumes, setSelectedResumes] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isMediumScreen] = useMediaQuery("(min-width: 960px)");
  const viewColor = useColorModeValue("200", "700");
  // const selectViewColor = useColorModeValue("gray.300","gray.600");
  const degreeTypes = [
    "Bachelor's",
    "Master's",
    "PhD",
    "Professional (JD/MD)",
    "Other"
  ];
  const years = [
    "Dec 2024",
    "May 2025",
    "Dec 2025",
    "May 2026",
    "Dec 2026",
    "May 2027",
    "Dec 2027",
    "May 2028",
    "Dec 2028",
    "May 2029",
    "Dec 2029"
  ];
  const jobInterests = [
    "SUMMER INTERNSHIP",
    "FALL INTERNSHIP",
    "SPRING INTERNSHIP",
    "FULL TIME"
  ];
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedJobInterests, setSelectedJobInterests] = useState<string[]>(
    []
  );

  const showToast = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true
    });
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPageValue = e.target.value;

    // Allow the input to be empty (to handle backspace)
    if (newPageValue === "") {
      setPage(page); // Set to a temporary state while the user is typing
      return;
    }

    const newPage = Number(newPageValue);

    // Validate the new page value before setting it
    if (newPage >= 1 && newPage <= pageSize) {
      setPage(newPage);
    }
  };
  const handleNext = () => {
    if (page < pageSize) {
      setPage(page + 1);
    }
  };

  // Function to handle the Previous button
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // const filterResumes = useCallback(() => {
  //     let filtered = resumes;
  //     if (selectedYears.length > 0) {
  //         filtered = filtered.filter(resume => selectedYears.includes(resume.graduationYear?.toLowerCase()));
  //     }
  //     if (selectedDegrees.length > 0) {
  //         filtered = filtered.filter(resume => selectedDegrees.includes(resume.degree?.toLowerCase()));
  //     }
  //     if (selectedMajors.length > 0) {
  //         filtered = filtered.filter(resume => selectedMajors.includes(resume.major?.toLowerCase()));
  //     }
  //     if (selectedJobInterests.length > 0) {
  //         filtered = filtered.filter(resume => resume.jobInterest.some(job => selectedJobInterests.includes(job.toLowerCase())));
  //     }
  //     setFilteredResumes(filtered);
  // }, [selectedYears, selectedMajors, selectedDegrees, selectedJobInterests, resumes]);

  const toggleResume = (id: string) => {
    setSelectedResumes((prev) =>
      prev.includes(id)
        ? prev.filter((resumeId) => resumeId !== id)
        : [...prev, id]
    );
  };

  const selectAllResumes = () => {
    if (selectedResumes.length === filteredResumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(filteredResumes.map((resume) => resume.id));
    }
  };

  // const downloadFileFromS3 = async (s3Url: string) => {
  //     try {
  //       const response = await axios.get(s3Url, {
  //         responseType: 'blob' // Ensure the response is a Blob
  //       });

  //       // Extract the filename from the Content-Disposition header or generate one
  //       const contentDisposition = response.headers['content-disposition'];
  //       let filename = 'downloaded-file';
  //       if (contentDisposition) {
  //         const filenameMatch = contentDisposition.match(/filename="(.+)"/);
  //         if (filenameMatch.length === 2) {
  //           filename = filenameMatch[1];
  //         }
  //       }

  //       saveAs(response.data, filename);
  //     } catch (error) {
  //         showToast("Failed to download resume. Please try again later.");
  //     //   console.error('Error downloading the file:', error);
  //     }
  // };

  const downloadResumes = async () => {
    const jwt = localStorage.getItem("jwt");
    let totalErrorCount = 0;

    try {
      const response = await axios.post(
        Config.API_BASE_URL + "/s3/download/batch/",
        { userIds: selectedResumes },
        {
          headers: {
            Authorization: jwt,
            "Content-Type": "application/json"
          }
        }
      );

      const { data: urls, errorCount } = response.data;
      totalErrorCount += errorCount;

      if (urls.length === 0) {
        showToast("No resumes available for download.");
        return;
      }

      if (urls.length === 1) {
        // Single resume - download directly
        try {
          const fileResponse = await axios.get(urls[0], {
            responseType: "blob"
          });
          const userId = getFileNameFromUrl(urls[0]).replace(".pdf", "");
          const resume = filteredResumes.find((r) => r.id == userId);

          if (resume === undefined) {
            throw new Error("Resume not found in filteredResumes");
          }

          const fileName = cleanUpName(resume.name) + ".pdf";
          saveAs(fileResponse.data, fileName);
        } catch (error) {
          totalErrorCount++;
          console.error("Error downloading single resume:", error);
        }
      } else {
        // Multiple resumes - create a zip file
        const zip = new JSZip();
        const failedDownloads = [];

        for (const url of urls) {
          try {
            const userId = getFileNameFromUrl(url).replace(".pdf", "");
            const resume = filteredResumes.find((r) => r.id == userId);
            if (resume === undefined) {
              throw new Error("Resume not found in filteredResumes");
            }

            const fileResponse = await axios.get(url, { responseType: "blob" });
            const fileName = cleanUpName(resume.name) + ".pdf";

            zip.file(fileName, fileResponse.data);
          } catch (error) {
            totalErrorCount++;
            failedDownloads.push(url);
            console.error("Error downloading resume:", url, error);
          }
        }

        if (Object.keys(zip.files).length > 0) {
          try {
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "resumes.zip");
          } catch (error) {
            console.error("Error generating zip file:", error);
            showToast(
              "Failed to create zip file. Some resumes may not have been downloaded."
            );
          }
        } else {
          showToast("No resumes were successfully downloaded.");
          return;
        }

        if (failedDownloads.length > 0) {
          console.log("Failed downloads:", failedDownloads);
        }
      }

      if (totalErrorCount > 0) {
        showToast(`${totalErrorCount} resume(s) could not be downloaded.`);
      }
    } catch (error) {
      console.error("Error in batch download request:", error);
      showToast(
        "Failed to initiate resume download(s). Please try again later."
      );
    }
  };

  const cleanUpName = (str: string): string => {
    return str
      .toLowerCase() // Convert the string to lowercase
      .replace(/\s+(\w)/g, (_, c) => c.toUpperCase()) // Capitalize the first letter of each word after whitespace
      .replace(/\s+/g, "") // Remove any remaining whitespace
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter of the result
  };

  const getFileNameFromUrl = (url: string): string => {
    const parts = url.split("/");
    const temp = parts[parts.length - 1];
    return temp.substring(0, temp.indexOf("?"));
  };

  const getResumes = async () => {
    const jwt = localStorage.getItem("jwt");

    const requestBody: {
      graduations?: string[];
      degrees?: string[];
      majors?: string[];
      jobInterests?: string[];
    } = {
      // filter: {
      //     hasResume: true
      // },
      // projection: [
      //     { userId: 1 },
      //     { name: 1 },
      //     { major: 1 },
      //     { graduation: 1 },
      //     { degree: 1},
      //     { jobInterest: 1 },
      //     { university: 1 },
      //     { dietaryRestrictions: 1 },
      //     { hasResume: 1 }
      // ]
      // graduations: selectedYears,
      // degrees: selectedDegrees,
      // majors: selectedMajors,
      // jobInterests: selectedJobInterests
    };

    if (selectedYears.length > 0) {
      requestBody["graduations"] = [...selectedYears];
    }
    if (selectedDegrees.length > 0) {
      requestBody["degrees"] = selectedDegrees;
    }
    if (selectedMajors.length > 0) {
      requestBody["majors"] = selectedMajors;
    }
    if (selectedJobInterests.length > 0) {
      requestBody["jobInterests"] = selectedJobInterests;
    }

    const headers = {
      Authorization: jwt
    };

    // axios.get(Config.API_BASE_URL + "/registration/filter", { headers, requestBody })

    const params = new URLSearchParams();
    // params.append('filter', JSON.stringify(requestBody.filter));
    // params.append('projection', JSON.stringify(requestBody.projection));
    if (selectedYears.length > 0) {
      params.append("graduations", JSON.stringify(requestBody.graduations));
    }
    if (selectedDegrees.length > 0) {
      params.append("degrees", JSON.stringify(requestBody.degrees));
    }
    if (selectedMajors.length > 0) {
      params.append("majors", JSON.stringify(requestBody.majors));
    }
    if (selectedJobInterests.length > 0) {
      params.append("jobInterests", JSON.stringify(requestBody.jobInterests));
    }

    setResumes([]);
    setFilteredResumes([]);

    // axios.get(Config.API_BASE_URL + "/registration/filter/pagecount", { headers, params })
    // .then(function (response) {
    //     console.log(response.data);
    //     setPageSize(response.data.pagecount);
    // })
    axios
      .post(
        Config.API_BASE_URL + "/registration/filter/pagecount",
        requestBody,
        { headers }
      )
      .then(function (response) {
        setPageSize(response.data.pagecount);
        if (page > response.data.pagecount) {
          setPage(1);
        }
      });

    axios
      .post(Config.API_BASE_URL + "/registration/filter/" + page, requestBody, {
        headers
      })
      .then(function (response) {
        const fetchedResumes = response.data.registrants.map(
          (item: ResumeIDs) => ({
            id: item.userId,
            name: item.name,
            major: item.major,
            degree: item.degree,
            graduationYear: item.graduation,
            jobInterest: item.jobInterest,
            portfolios: item.portfolios
          })
        );

        // console.log(fetchedResumes);

        // Use a Set to ensure unique resumes
        // const uniqueResumes = new Set([...resumes, ...fetchedResumes]);
        // setResumes(Array.from(uniqueResumes));
        // setFilteredResumes(Array.from(uniqueResumes));
        setResumes(fetchedResumes);
        setFilteredResumes(fetchedResumes);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
        showToast(
          `Error ${error}: Failed to fetch resumes - please sign in again`
        );
      });
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };

    handleResize();

    if (resumes.length === 0) {
      getResumes();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getResumes();
  }, [
    page,
    selectedYears,
    selectedDegrees,
    selectedMajors,
    selectedJobInterests
  ]);

  // useEffect(() => {
  //     // filterResumes();
  //     getResumes();
  // }, []);

  return (
    <ChakraProvider>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding="10px"
        transition="background-color 0.3s ease, color 0.3s ease"
      >
        {/* <IconButton
                    size={'lg'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                /> */}
        <HStack spacing={8} alignItems={"center"}>
          <Flex align="center" mr={2} maxWidth={50}>
            <Image
              src="/2024_rp_logo.svg"
              minHeight={50}
              maxH="100%"
              _hover={{
                filter: "brightness(30%)",
                transition: "filter 0.2s ease-in-out",
                cursor: "pointer"
              }}
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </Flex>
        </HStack>
        <Text color="white" fontFamily={"Nunito"}>
          Resume Book
        </Text>
        <Flex alignItems={"center"} zIndex="20">
          <ButtonGroup
            isAttached
            border={"1px solid darkslategray"}
            borderRadius={"7px"}
            variant="outline"
          >
            <IconButton
              color="white"
              aria-label="List View"
              icon={<Icon as={BsList} boxSize={6} />}
              onClick={() => setShowList(true)}
              _hover={{ border: "1px solid gray" }}
              mr={2}
              backgroundColor="transparent" //gray.'+(parseInt(viewColor)-100) : 'gray.'+viewColor}
              border={showList ? "1px solid white" : "1px solid transparent"}
              transition="border-color 0.3s ease"
            />
            <IconButton
              color="white"
              aria-label="Grid View"
              icon={<Icon as={BsGrid} boxSize={6} />}
              onClick={() => setShowList(false)}
              _hover={{ border: "1px solid gray" }}
              backgroundColor="transparent" //{showList ? 'gray.'+viewColor : 'gray.'+(parseInt(viewColor)-100)}
              border={showList ? "1px solid transparent" : "1px solid white"}
              transition="border-color 0.3s ease"
            />
          </ButtonGroup>
          <IconButton
            isRound={true}
            fontSize="26px"
            marginX={4}
            aria-label="Toggle Light/Dark Mode"
            icon={useColorModeValue(<FaMoon />, <FaSun />)}
            onClick={toggleColorMode}
            variant="link"
            _hover={{ color: "gray.500" }}
            bg="#0F1130"
            color="#F7FAFC"
            size="sm"
            transition="color 0.3s ease, background-color 0.3s ease"
          />
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar bg="pink.600" size={"sm"} />
            </MenuButton>
            <MenuList>
              {/* <MenuItem onClick={printToken}>Print {userName} JWT</MenuItem> */}
              {/* <MenuItem onClick={toggleColorMode}>Toggle Light/Dark Mode</MenuItem> */}
              {/* <MenuItem onClick={getResumes}>Refresh Resumes</MenuItem> */}
              {/* <MenuDivider /> */}
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Box
        bg={useColorModeValue("gray.200", "gray.700")}
        p={4}
        transition="background-color 0.3s ease, color 0.3s ease"
      >
        <Flex
          justify="space-between"
          align="center"
          direction={isMediumScreen ? "row" : "column"}
        >
          <Flex
            align="flex-start"
            minWidth="150px"
            alignItems="center"
            gap={"0.5vw"}
          >
            <MultiSelectDropdown
              id="major-dropdown"
              width="auto"
              options={majors}
              selectedOptions={selectedMajors}
              onSelectionChange={(newSelectedMajors) =>
                setSelectedMajors(newSelectedMajors)
              }
              baseColor={viewColor}
              placeholderText="Filter Major(s)"
            />
            <MultiSelectDropdown
              id="degree-dropdown"
              width="auto"
              options={degreeTypes}
              selectedOptions={selectedDegrees}
              onSelectionChange={(newSelectedDegrees) =>
                setSelectedDegrees(newSelectedDegrees)
              }
              baseColor={viewColor}
              placeholderText="Filter Degree(s)"
            />
            <MultiSelectDropdown
              id="year-dropdown"
              width="20%"
              options={years}
              selectedOptions={selectedYears}
              onSelectionChange={(newSelectedYears) =>
                setSelectedYears(newSelectedYears)
              }
              baseColor={viewColor}
              placeholderText="Filter Year(s)"
            />
            <MultiSelectDropdown
              id="job-dropdown"
              width="20%"
              options={jobInterests}
              selectedOptions={selectedJobInterests}
              onSelectionChange={(newSelectedJobInterests) =>
                setSelectedJobInterests(newSelectedJobInterests)
              }
              baseColor={viewColor}
              placeholderText="Filter Job Interest(s)"
            />
          </Flex>
          <Flex p={2}>
            <Button
              onClick={selectAllResumes}
              mr={2}
              backgroundColor={
                selectedResumes.length === filteredResumes.length
                  ? "salmon"
                  : "blue.300"
              }
              color={"white"}
              border="1px solid transparent"
              _hover={{
                border: "1px solid black",
                backgroundColor: `${selectedResumes.length === filteredResumes.length ? "red.200" : "blue.200"}`,
                color: "black"
              }}
              transition="border background-color color 0.3s ease"
            >
              {isMobile ? (
                selectedResumes.length === filteredResumes.length ? (
                  <TiDocumentDelete />
                ) : (
                  <BiSelectMultiple />
                )
              ) : selectedResumes.length === filteredResumes.length ? (
                "Deselect All"
              ) : (
                "Select All"
              )}
            </Button>
            <Button
              mr={2}
              onClick={downloadResumes}
              border="1px solid transparent"
              _hover={{
                border: "1px solid black",
                backgroundColor: "gray.300",
                color: "black"
              }}
              backgroundColor={
                parseInt(viewColor) < 500
                  ? "gray." + (parseInt(viewColor) + 300)
                  : "gray." + (parseInt(viewColor) - 200)
              }
              color={"white"}
              isDisabled={selectedResumes.length < 1}
              transition="border background-color color 0.3s ease"
            >
              {isMobile ? <BsDownload /> : "Download"}
            </Button>
            {/* <Button>Button 3</Button> */}
          </Flex>
        </Flex>
      </Box>
      {showList ? (
        <ResumeList
          resumes={filteredResumes}
          selectedResumes={selectedResumes}
          toggleResume={toggleResume}
          baseColor={viewColor}
        />
      ) : (
        <ResumeGrid
          resumes={filteredResumes}
          selectedResumes={selectedResumes}
          toggleResume={toggleResume}
          baseColor={viewColor}
        />
      )}
      <Box>
        <Center mt={4}>
          <HStack spacing={4}>
            <Button onClick={handlePrevious} isDisabled={page === 1}>
              Previous
            </Button>
            <HStack spacing={2}>
              <Input
                color="white"
                value={page}
                onChange={handlePageChange}
                type="number"
                max={pageSize}
                min={1}
                width="50px"
                textAlign="center"
              />
              <Text color="white">/ {pageSize}</Text>
            </HStack>
            <Button onClick={handleNext} isDisabled={page === pageSize}>
              Next
            </Button>
          </HStack>
        </Center>

        <Text fontSize="sm" textAlign="center" color="gray.500" mt={4}>
          © 2024 Reflections | Projections
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default ResumeBook;
