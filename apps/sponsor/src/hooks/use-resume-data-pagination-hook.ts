import {
  DEGREE_TYPES,
  JOB_INTERESTS,
  MAJORS,
  RESUMES_PER_PAGE,
  YEARS
} from "@/routes/ResumeBook/constants";
import { Resume } from "@/routes/ResumeBook/ResumeBook";
import { SingleCol } from "@/routes/ResumeBook/ResumeList";
import { useEffect, useMemo, useState } from "react";
import { useResumeSelectionAndDownloadHook } from "./use-resume-selection-and-download-hook";
import moment from "moment";
import { api } from "@rp/shared";

export function useResumeDataPaginationHook({
  onToast
}: {
  onToast: (message: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [displayedPage, setDisplayedPage] = useState("1");
  const [resumes, setResumes] = useState<Resume[]>([]);

  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedJobInterests, setSelectedJobInterests] = useState<string[]>(
    []
  );

  const [queryName, setQueryName] = useState("");
  const [sortByColumn, setSortByColumn] = useState<SingleCol | undefined>(
    undefined
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
          let aValue:
            | moment.Moment
            | string
            | string[]
            | number
            | null
            | undefined = a[filterBy.sortCol as keyof Resume];
          let bValue:
            | moment.Moment
            | string
            | string[]
            | number
            | null
            | undefined = b[filterBy.sortCol as keyof Resume];

          if (filterBy.sortCol === "graduationYear") {
            aValue = moment(aValue as string);
            bValue = moment(bValue as string);
          }

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
          } else if (moment.isMoment(aValue) && moment.isMoment(bValue)) {
            return filterBy.sortDirection === "asc"
              ? aValue.diff(bValue)
              : bValue.diff(aValue);
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

    return MAJORS.reduce(
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

    return DEGREE_TYPES.reduce(
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
    return YEARS.reduce(
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

    return JOB_INTERESTS.reduce(
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
    return Math.ceil(allFilteredResumes.length / RESUMES_PER_PAGE);
  }, [allFilteredResumes.length]);

  const startIndex = (page - 1) * RESUMES_PER_PAGE;
  const endIndex = Math.min(
    startIndex + RESUMES_PER_PAGE,
    allFilteredResumes.length
  );

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

  const resetPage = () => {
    setPage(1);
    setDisplayedPage("1");
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
              degree: registrant.educationLevel,
              graduationYear: registrant.graduationYear,
              jobInterest: registrant.opportunities,
              portfolios: registrant.personalLinks
            }) as Resume
        );
        setResumes(resumes);
        setLoading(false);
      })
      .catch(function (error) {
        onToast(
          `Error ${error}: Failed to fetch resumes - please sign in again`
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getResumes();
  }, []);

  useEffect(() => {
    // Reset the page
    setPage(1);
    setDisplayedPage("1");

    // Reset the selected resumes when filters change
    resumeSelectionAndDownloadHook.resetSelectedResumes();
  }, [selectedMajors, selectedDegrees, selectedYears, selectedJobInterests]);

  const filteredResumes = useMemo(() => {
    const startIndex = (page - 1) * RESUMES_PER_PAGE;
    const endIndex = startIndex + RESUMES_PER_PAGE;
    return allFilteredResumes.slice(startIndex, endIndex);
  }, [page, allFilteredResumes]);

  const resumeSelectionAndDownloadHook = useResumeSelectionAndDownloadHook({
    allFilteredResumes,
    filteredResumes
  });

  return {
    loading,
    resumeData: {
      resumes,
      allFilteredResumes,
      filteredResumes
    },
    pagination: {
      startIndex,
      endIndex,
      page,
      displayedPage,
      pageSize,
      setPage,
      setDisplayedPage,
      handlePageChange,
      handleNext,
      handlePrevious,
      resetPage
    },
    sorting: {
      sortByColumn,
      sortDirection,
      handleToggleSort
    },
    filtering: {
      queryName,
      selectedMajors,
      selectedYears,
      selectedDegrees,
      majorToMajorWithCount,
      degreesWithCounts,
      yearsWithCounts,
      selectedJobInterests,
      jobInterestsWithCounts,
      setQueryName,
      setSelectedMajors,
      setSelectedDegrees,
      setSelectedYears,
      setSelectedJobInterests
    },
    selection: {
      selectedResumes: resumeSelectionAndDownloadHook.selectedResumes,
      toggleResume: resumeSelectionAndDownloadHook.toggleResume,
      selectAllResumes: resumeSelectionAndDownloadHook.selectAllResumes
    },
    exportResumes: {
      handleDownloadResumes:
        resumeSelectionAndDownloadHook.handleDownloadResumes,
      downloadResumesCSV: resumeSelectionAndDownloadHook.downloadResumesCSV
    }
  };
}
