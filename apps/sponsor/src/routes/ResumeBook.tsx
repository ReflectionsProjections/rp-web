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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { BiSelectMultiple } from "react-icons/bi";
import { BsDownload, BsGrid, BsList } from "react-icons/bs";
import { TiDocumentDelete } from "react-icons/ti";
import MultiSelectDropdown from "../components/MultiSelectDropdown";
import { majors as allMajors } from "../components/majors";
import ResumeGrid from "./ResumeGrid";
import ResumeList, { SingleCol } from "./ResumeList";

import { Config } from "@/config";
import api from "@/util/api";
import { downloadResumes } from "@/util/download-functions";
import { saveAs } from "file-saver";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ResumePopupModal from "./ResumePopupModal";

export interface Resume {
  id: string;
  name: string;
  major: string | null;
  degree?: string;
  graduationYear: string | null;
  jobInterest: Array<string>;
  portfolios?: Array<string>;
}

const RESULTS_PER_PAGE = 20;

export function ResumeBook() {
  const { resumeId } = useParams<{ resumeId?: string }>();

  const toast = useToast();
  const { toggleColorMode } = useColorMode();

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [displayedPage, setDisplayedPage] = useState("1");

  const [resumes, setResumes] = useState<Resume[]>([]);
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

  const [sortByColumn, setSortByColumn] = useState<SingleCol | undefined>(
    undefined
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [queryName, setQueryName] = useState("");

  const handleToggleSort = (column: SingleCol) => {
    if (sortByColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection("asc");
        setSortByColumn(undefined);
      }
    } else {
      setSortByColumn(column);
      setSortDirection("asc");
    }
  };

  const { onOpen, onClose } = useDisclosure();
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const navigate = useNavigate();
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

  const getResumesFiltered = (filterBy: {
    major: boolean;
    degree: boolean;
    graduationYear: boolean;
    jobInterest: boolean;
    filterName?: string;
    sortCol?: SingleCol;
    sortDirection?: "asc" | "desc";
  }) => {
    const lowerCasedSelectedMajors = new Set(
      selectedMajors.map((major) => major.toLowerCase())
    );
    const lowerCasedSelectedDegrees = new Set(
      selectedDegrees.map((degree) => degree.toLowerCase())
    );
    const lowerCasedSelectedYears = new Set(
      selectedYears.map((year) => year.toLowerCase())
    );
    const lowerCasedSelectedJobInterests = new Set(
      selectedJobInterests.map((jobInterest) => jobInterest.toLowerCase())
    );

    return resumes
      .filter((resume) => {
        const matchesMajor =
          selectedMajors.length === 0 ||
          (resume.major &&
            lowerCasedSelectedMajors.has(resume.major.toLowerCase()));

        const matchesDegree =
          selectedDegrees.length === 0 ||
          (resume.degree &&
            lowerCasedSelectedDegrees.has(resume.degree.toLowerCase()));

        const matchesYear =
          selectedYears.length === 0 ||
          (resume.graduationYear &&
            lowerCasedSelectedYears.has(resume.graduationYear.toLowerCase()));

        const matchesJobInterest =
          selectedJobInterests.length === 0 ||
          (resume.jobInterest &&
            resume.jobInterest.some((interest) =>
              lowerCasedSelectedJobInterests.has(interest.toLowerCase())
            ));

        return (
          (matchesMajor || !filterBy.major) &&
          (matchesDegree || !filterBy.degree) &&
          (matchesYear || !filterBy.graduationYear) &&
          (matchesJobInterest || !filterBy.jobInterest) &&
          (filterBy.filterName
            ? resume.name
                .toLowerCase()
                .includes(filterBy.filterName.toLowerCase())
            : true)
        );
      })
      .sort((a, b) => {
        if (filterBy.sortCol) {
          const aValue = a[filterBy.sortCol as keyof Resume];
          const bValue = b[filterBy.sortCol as keyof Resume];

          if (aValue === null || aValue === undefined) return 1;
          if (bValue === null || bValue === undefined) return -1;

          if (typeof aValue === "string" && typeof bValue === "string") {
            return filterBy.sortDirection === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          } else if (typeof aValue === "number" && typeof bValue === "number") {
            return filterBy.sortDirection === "asc"
              ? aValue - bValue
              : bValue - aValue;
          }
        }
        return 0;
      });
  };

  const allFilteredResumes = useMemo(() => {
    return getResumesFiltered({
      major: true,
      degree: true,
      graduationYear: true,
      jobInterest: true,
      sortCol: sortByColumn,
      sortDirection: sortDirection,
      filterName: queryName
    });
  }, [
    resumes,
    selectedMajors,
    selectedDegrees,
    selectedYears,
    selectedJobInterests,
    sortByColumn,
    sortDirection,
    queryName
  ]);

  const [initialized, setInitialized] = useState(false);

  // TODO: Remove

  useEffect(() => {
    setIsMobile(false);
  }, []);

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
        console.log("selectedResume", selectedResume);
        if (!selectedResume) {
          toast({
            title: "Resume not found",
            status: "error",
            duration: 9000,
            isClosable: true
          });
          return;
        }
        handleOpenResume(selectedResume);
      }

      setInitialized(true);
    }
  }, [resumeId, resumes]);

  const majorToMajorWithCount = useMemo(() => {
    const filteredResumes = getResumesFiltered({
      major: false,
      degree: true,
      graduationYear: true,
      jobInterest: true
    });

    const majorCounts = filteredResumes.reduce(
      (acc, resume) => {
        if (resume.major) {
          acc[resume.major] = (acc[resume.major] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return allMajors.reduce(
      (acc, major) => ({
        ...acc,
        [major]: `${major} (${majorCounts[major] || 0})`
      }),
      {} as Record<string, string>
    );
  }, [allFilteredResumes]);

  const degreesWithCounts = useMemo(() => {
    const filteredResumes = getResumesFiltered({
      major: true,
      degree: false,
      graduationYear: true,
      jobInterest: true
    });

    const degreeCounts = filteredResumes.reduce(
      (acc, resume) => {
        if (resume.degree) {
          acc[resume.degree] = (acc[resume.degree] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return degreeTypes.reduce(
      (acc, degree) => ({
        ...acc,
        [degree]: `${degree} (${degreeCounts[degree] || 0})`
      }),
      {} as Record<string, string>
    );
  }, [allFilteredResumes]);

  const yearsWithCounts = useMemo(() => {
    const filteredResumes = getResumesFiltered({
      major: true,
      degree: true,
      graduationYear: false,
      jobInterest: true
    });

    const yearCounts = filteredResumes.reduce(
      (acc, resume) => {
        if (resume.graduationYear) {
          acc[resume.graduationYear] = (acc[resume.graduationYear] || 0) + 1;
        }

        return acc;
      },
      {} as Record<string, number>
    );
    return years.reduce(
      (acc, year) => ({
        ...acc,
        [year]: `${year} (${yearCounts[year] || 0})`
      }),
      {} as Record<string, string>
    );
  }, [allFilteredResumes]);

  const jobInterestsWithCounts = useMemo(() => {
    const filteredResumes = getResumesFiltered({
      major: true,
      degree: true,
      graduationYear: true,
      jobInterest: false
    });

    const jobInterestCounts = filteredResumes.reduce(
      (acc, resume) => {
        if (resume.jobInterest) {
          resume.jobInterest.forEach((interest) => {
            acc[interest] = (acc[interest] || 0) + 1;
          });
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return jobInterests.reduce(
      (acc, interest) => {
        const interestCapitalCased = interest
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        return {
          ...acc,
          [interest]: `${interestCapitalCased} (${jobInterestCounts[interest] || 0})`
        };
      },
      {} as Record<string, string>
    );
  }, [allFilteredResumes]);

  const pageSize = useMemo(() => {
    return Math.ceil(allFilteredResumes.length / RESULTS_PER_PAGE);
  }, [allFilteredResumes.length]);

  const filteredResumes = useMemo(() => {
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    return allFilteredResumes.slice(startIndex, endIndex);
  }, [page, allFilteredResumes]);

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
    setDisplayedPage(newPageValue);

    // Allow the input to be empty (to handle backspace)
    if (newPageValue === "") {
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
      setDisplayedPage((page + 1).toString());
    }
  };

  // Function to handle the Previous button
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      setDisplayedPage((page - 1).toString());
    }
  };

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

  const handleDownloadResumes = async () => {
    await downloadResumes(filteredResumes, selectedResumes);
  };

  const downloadResumesCSV = (selected: boolean = false) => {
    const csvContent = [
      "Name,Major,Degree,Graduation Year,Job Interest,Portfolios,Resume Link"
    ]
      .concat(
        allFilteredResumes
          .filter((resume) => {
            if (selected) {
              return selectedResumes.includes(resume.id);
            }
            return true;
          })
          .map((resume) => {
            const portfolios = resume.portfolios
              ? resume.portfolios.join("; ")
              : "";
            return [
              resume.name,
              resume.major || "",
              resume.degree || "",
              resume.graduationYear || "",
              resume.jobInterest.join("; "),
              portfolios,
              `${Config.RESUME_BOOK_URL}/resume-book/${resume.id}/download`
            ].join(",");
          })
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "resumes.csv");
  };

  const getResumes = () => {
    setLoading(true);
    setResumes([]);
    api
      .get("/registration/all")
      .then(function (response) {
        const resumes = response.data.registrants.map(
          (registrant) =>
            ({
              id: registrant.userId,
              name: registrant.name,
              major: registrant.major,
              degree: registrant.degree,
              graduationYear: registrant.graduation,
              jobInterest: registrant.jobInterest,
              portfolios: registrant.portfolios
            }) as Resume
        );
        setResumes(resumes);
        setLoading(false);
      })
      .catch(function (error) {
        showToast(
          `Error ${error}: Failed to fetch resumes - please sign in again`
        );
        setLoading(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  const handleNextResume = () => {
    const currentIndex = allFilteredResumes.findIndex(
      (r) => r.id === selectedResume?.id
    );
    if (currentIndex < allFilteredResumes.length - 1) {
      const nextResume = allFilteredResumes[currentIndex + 1];
      handleOpenResume(nextResume);
    } else {
      showToast("No more resumes to view.");
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
      showToast("No previous resume to view.");
    }
  };

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

  useEffect(() => {
    getResumes();
  }, []);

  useEffect(() => {
    // Reset the page
    setPage(1);
    setDisplayedPage("1");

    // Reset the selected resumes when filters change
    setSelectedResumes([]);
  }, [selectedMajors, selectedDegrees, selectedYears, selectedJobInterests]);

  return (
    <ChakraProvider>
      <Flex flexDirection={"column"} h="100vh" bgColor="gray.200">
        <ResumeBookHeader
          setShowList={setShowList}
          showList={showList}
          toggleColorMode={toggleColorMode}
          signOut={signOut}
          userName="User"
        />
        <Box bgColor={"gray.200"}>
          <Box
            bg={"gray.200"}
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
                <HStack
                  //   onClick={() => setIsOpen(!isOpen)}
                  p={2}
                  borderRadius="md"
                  wrap="wrap"
                  spacing={1}
                  minHeight="40px"
                  bgColor={"gray.300"}
                >
                  <Input
                    autoComplete="off"
                    value={queryName}
                    variant="unstyled"
                    flex="1"
                    placeholder={"Search by name..."}
                    _placeholder={{ color: "gray.600" }}
                    onChange={(e) => {
                      setQueryName(e.target.value);
                      setPage(1);
                      setDisplayedPage("1");
                    }}
                  />
                </HStack>
                <MultiSelectDropdown
                  id="major-dropdown"
                  width="auto"
                  options={allMajors}
                  selectedOptions={selectedMajors}
                  displayedOptions={majorToMajorWithCount}
                  onSelectionChange={(newSelectedMajors) =>
                    setSelectedMajors(newSelectedMajors)
                  }
                  placeholderText="Filter Major(s)"
                />
                <MultiSelectDropdown
                  id="degree-dropdown"
                  width="auto"
                  options={degreeTypes}
                  selectedOptions={selectedDegrees}
                  displayedOptions={degreesWithCounts}
                  onSelectionChange={(newSelectedDegrees) =>
                    setSelectedDegrees(newSelectedDegrees)
                  }
                  placeholderText="Filter Degree(s)"
                />
                <MultiSelectDropdown
                  id="year-dropdown"
                  width="20%"
                  options={years}
                  selectedOptions={selectedYears}
                  displayedOptions={yearsWithCounts}
                  onSelectionChange={(newSelectedYears) =>
                    setSelectedYears(newSelectedYears)
                  }
                  placeholderText="Filter Year(s)"
                />
                <MultiSelectDropdown
                  id="job-dropdown"
                  width="25%"
                  options={jobInterests}
                  selectedOptions={selectedJobInterests}
                  displayedOptions={jobInterestsWithCounts}
                  onSelectionChange={(newSelectedJobInterests) =>
                    setSelectedJobInterests(newSelectedJobInterests)
                  }
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

                <Popover>
                  <PopoverTrigger>
                    <Button
                      mr={2}
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
                      transition="border background-color color 0.3s ease"
                    >
                      Download
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    p={3}
                    zIndex="999"
                    w="fit-content"
                    maxW="400px"
                    boxShadow="lg"
                    border="2px solid"
                    borderColor={"gray.200"}
                    gap={2}
                  >
                    <Button
                      mr={2}
                      onClick={() => {
                        void handleDownloadResumes();
                      }}
                      border="1px solid transparent"
                      _hover={{
                        border: "1px solid black",
                        backgroundColor: "gray.300",
                        color: "black"
                      }}
                      backgroundColor={"blue.500"}
                      color={"white"}
                      isDisabled={selectedResumes.length < 1}
                      transition="border background-color color 0.3s ease"
                      w="100%"
                    >
                      {isMobile ? <BsDownload /> : "Download selected PDFs"}
                    </Button>
                    <Button
                      onClick={() => {
                        void downloadResumesCSV(true);
                      }}
                      border="1px solid transparent"
                      _hover={{
                        border: "1px solid black",
                        backgroundColor: "gray.300",
                        color: "black"
                      }}
                      backgroundColor={"blue.500"}
                      color={"white"}
                      isDisabled={selectedResumes.length < 1}
                      transition="border background-color color 0.3s ease"
                      w="100%"
                    >
                      {isMobile ? <BsDownload /> : "Download selected CSV"}
                    </Button>
                    <Button
                      onClick={() => {
                        void downloadResumesCSV(false);
                      }}
                      border="1px solid transparent"
                      _hover={{
                        border: "1px solid black",
                        backgroundColor: "gray.300",
                        color: "black"
                      }}
                      backgroundColor={"blue.500"}
                      color={"white"}
                      transition="border background-color color 0.3s ease"
                      w="100%"
                    >
                      {isMobile ? <BsDownload /> : "Download all filtered CSV"}
                    </Button>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
          </Box>
          <Box bgColor={"gray.200"} px={4}>
            {filteredResumes.length > 0 || loading ? (
              showList ? (
                <ResumeList
                  loading={loading}
                  resumes={filteredResumes}
                  selectedResumes={selectedResumes}
                  openResume={handleOpenResume}
                  toggleResume={toggleResume}
                  baseColor={viewColor}
                  sortDirection={sortDirection}
                  sortByColumn={sortByColumn}
                  onSortByColumn={handleToggleSort}
                />
              ) : (
                <ResumeGrid
                  resumes={filteredResumes}
                  selectedResumes={selectedResumes}
                  toggleResume={toggleResume}
                  baseColor={viewColor}
                />
              )
            ) : (
              <Center
                minH="60vh"
                border="2px solid"
                borderColor="gray.300"
                borderRadius="2xl"
              >
                <VStack>
                  <Icon
                    as={FaMagnifyingGlass}
                    boxSize={100}
                    color="gray.400"
                    mb={4}
                    opacity={0.5}
                  />
                  <Text fontSize="2xl" color="gray.500">
                    No resumes matched this criteria.
                  </Text>
                </VStack>
              </Center>
            )}
          </Box>
          <Box bgColor="gray.200">
            {filteredResumes.length > 0 && (
              <Center py={4}>
                <HStack spacing={4}>
                  <Button
                    onClick={handlePrevious}
                    isDisabled={page === 1}
                    bgColor="blue.500"
                    color="white"
                  >
                    Previous
                  </Button>
                  <HStack spacing={2}>
                    <Input
                      value={displayedPage}
                      onChange={handlePageChange}
                      type="string"
                      max={pageSize}
                      width="50px"
                      textAlign="center"
                      bgColor="white"
                      px={1}
                    />
                    <Text fontSize="md" fontWeight={"normal"}>
                      / {pageSize}
                    </Text>
                  </HStack>
                  <Button
                    onClick={handleNext}
                    isDisabled={page === pageSize}
                    bgColor="blue.500"
                    color="white"
                  >
                    Next
                  </Button>
                </HStack>
              </Center>
            )}
          </Box>
          <Text fontSize="sm" textAlign="center" color="gray.500" mt={4} pb={4}>
            © 2025 Reflections | Projections
          </Text>
        </Box>
      </Flex>
      <ResumePopupModal
        resume={selectedResume}
        onClose={handleCloseResume}
        isLargerThan700={isMediumScreen}
        baseColor={viewColor}
        onNext={handleNextResume}
        onPrevious={handlePreviousResume}
        numPrevious={numPrevious}
        numNext={numNext}
      />
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
      borderBottom={"2px solid"}
      borderBottomColor={"gray.300"}
    >
      <HStack spacing={8} alignItems={"center"}>
        <Flex align="center" mr={2}>
          <Image src="/2024_rp_logo.svg" minHeight={30} maxH="100%" />
        </Flex>
      </HStack>
      <Text color="gray.800" fontFamily={"Roboto Slab"} fontSize="2xl">
        Reflections | Projections
      </Text>
      <Text color="gray.600" fontSize="24px" textAlign="center" ml={3}>
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
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default ResumeBook;
