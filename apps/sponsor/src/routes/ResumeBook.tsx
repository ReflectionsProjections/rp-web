import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  ChakraProvider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSelectMultiple } from "react-icons/bi";
import { BsDownload, BsGrid, BsList } from "react-icons/bs";
import { TiDocumentDelete } from "react-icons/ti";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { majors } from "../components/majors";
import ResumeGrid from "./ResumeGrid";
import ResumeList from "./ResumeList";

import axios from "axios";

import api from "@/util/api";
import { path } from "@rp/shared";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export interface Resume {
  id: string;
  name: string;
  major: string | null;
  degree?: string;
  graduationYear: string | null;
  jobInterest: Array<string>;
  portfolios?: Array<string>;
}

// interface ResumeLink {
//     url: string;
// }

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
    let totalErrorCount = 0;

    try {
      const response = await api.post("/s3/download/batch", {
        userIds: selectedResumes
      });

      const { data: urls, errorCount } = response.data;
      totalErrorCount += errorCount;

      if (urls.length === 0) {
        showToast("No resumes available for download.");
        return;
      }

      if (urls.length === 1) {
        // Single resume - download directly
        try {
          const fileResponse = await axios.get<unknown, { data: Blob }>(
            urls[0] ?? "",
            {
              responseType: "blob"
            }
          );

          const userId = getFileNameFromUrl(urls[0] ?? "").replace(".pdf", "");
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
            const userId = getFileNameFromUrl(url ?? "").replace(".pdf", "");
            const resume = filteredResumes.find((r) => r.id == userId);
            if (resume === undefined) {
              throw new Error("Resume not found in filteredResumes");
            }

            const fileResponse = await axios.get<unknown, { data: Blob }>(
              url ?? "",
              { responseType: "blob" }
            );
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
    return (
      str
        .toLowerCase() // Convert the string to lowercase
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        .replace(/\s+(\w)/g, (_, c) => c.toUpperCase()) // Capitalize the first letter of each word after whitespace
        .replace(/\s+/g, "") // Remove any remaining whitespace
        .replace(/^\w/, (c) => c.toUpperCase())
    ); // Capitalize the first letter of the result
  };

  const getFileNameFromUrl = (url: string): string => {
    const parts = url.split("/");
    const temp = parts[parts.length - 1];
    return temp.substring(0, temp.indexOf("?"));
  };

  const getResumes = () => {
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
    api
      .post("/registration/filter/pagecount", requestBody)
      .then(function (response) {
        setPageSize(response.data.pagecount);
        if (page > response.data.pagecount) {
          setPage(1);
        }
      })
      .catch(() => {});

    api
      .post(path("/registration/filter/:page", { page }), requestBody)
      .then(function (response) {
        const fetchedResumes = response.data.registrants.map((item) => ({
          id: item.userId,
          name: item.name,
          major: item.major,
          degree: item.degree,
          graduationYear: item.graduation,
          jobInterest: item.jobInterest,
          portfolios: item.portfolios
        }));

        // console.log(fetchedResumes);

        // Use a Set to ensure unique resumes
        // const uniqueResumes = new Set([...resumes, ...fetchedResumes]);
        // setResumes(Array.from(uniqueResumes));
        // setFilteredResumes(Array.from(uniqueResumes));

        console.log("fetchedResumes", fetchedResumes);

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
      <ResumeBookHeader
        setShowList={setShowList}
        showList={showList}
        toggleColorMode={toggleColorMode}
        signOut={signOut}
        userName="User"
      />

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
              onClick={() => {
                void downloadResumes();
              }}
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
      <Box bgColor={"gray.200"} px={4}>
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
      </Box>
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

function ResumeBookHeader({
  setShowList = () => {},
  showList = true,
  signOut = () => {}
}: {
  setShowList?: (showList: boolean) => void;
  showList?: boolean;
  toggleColorMode?: () => void;
  signOut?: () => void;
  userName?: string;
}) {
  return (
    <Flex
      position="relative"
      h={16}
      alignItems={"center"}
      justifyContent={"flex-start"}
      padding="10px"
      transition="background-color 0.3s ease, color 0.3s ease"
      bgColor="gray.200"
      borderBottom={"1px solid"}
      borderBottomColor={"gray.300"}
      boxShadow={"0 2px 4px rgba(0, 0, 0, 0.1)"}
    >
      <HStack spacing={8} alignItems={"center"}>
        <Flex align="center" mr={2}>
          <Image src="/2024_rp_logo.svg" minHeight={30} maxH="100%" />
        </Flex>
      </HStack>
      <Text color="gray.800" fontFamily={"Roboto Slab"} fontSize="2xl">
        Reflections | Projections
      </Text>
      <Text
        color="gray.600"
        fontFamily={"Anonymous Pro"}
        fontSize="24px"
        textAlign="center"
        fontWeight={"bold"}
        ml={3}
      >
        Resume Book
      </Text>
      <Spacer />
      <Flex alignItems={"center"} zIndex="20" gap={4}>
        <ButtonGroup
          isAttached
          border="1px solid"
          borderColor="gray.400"
          borderRadius="7px"
          variant="outline"
        >
          <Tooltip label="List View" placement="bottom-start">
            <IconButton
              aria-label="List View"
              icon={<Icon as={BsList} boxSize={6} />}
              onClick={() => setShowList(true)}
              borderRightRadius={0}
              borderColor={showList ? "darkslategray" : "transparent"}
              _hover={{ borderColor: "gray", zIndex: 1 }}
              transition="border-color 0.3s ease"
              boxShadow={showList ? "md" : "none"}
            />
          </Tooltip>
          <Tooltip label="Grid View" placement="bottom-end">
            <IconButton
              aria-label="Grid View"
              icon={<Icon as={BsGrid} boxSize={6} />}
              onClick={() => setShowList(false)}
              borderLeftRadius={0}
              borderColor={showList ? "transparent" : "darkslategray"}
              _hover={{ borderColor: "gray", zIndex: 1 }}
              transition="border-color 0.3s ease"
              boxShadow={showList ? "md" : "none"}
            />
          </Tooltip>
        </ButtonGroup>
        {/* <IconButton
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
          /> */}
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
  );
}

export default ResumeBook;
