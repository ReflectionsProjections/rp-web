import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  VStack
} from "@chakra-ui/react";
import { majors } from "@rp/shared";
import { FaFilter } from "react-icons/fa";
import { DEGREE_TYPES, JOB_INTERESTS, YEARS } from "./constants";

export type FilterModalProps = {
  isMediumScreen: boolean;
  filtering: {
    selectedMajors: string[];
    majorToMajorWithCount: Record<string, string>;
    selectedDegrees: string[];
    degreesWithCounts: Record<string, string>;
    selectedYears: string[];
    yearsWithCounts: Record<string, string>;
    selectedJobInterests: string[];
    jobInterestsWithCounts: Record<string, string>;
    setSelectedMajors: (majors: string[]) => void;
    setSelectedDegrees: (degrees: string[]) => void;
    setSelectedYears: (years: string[]) => void;
    setSelectedJobInterests: (jobInterests: string[]) => void;
  };
};

export function FilterModal(props: FilterModalProps) {
  const handleClear = () => {
    props.filtering.setSelectedMajors([]);
    props.filtering.setSelectedDegrees([]);
    props.filtering.setSelectedYears([]);
    props.filtering.setSelectedJobInterests([]);
  };

  const anySelectedFilters =
    props.filtering.selectedMajors.length > 0 ||
    props.filtering.selectedDegrees.length > 0 ||
    props.filtering.selectedYears.length > 0 ||
    props.filtering.selectedJobInterests.length > 0;
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          leftIcon={
            props.isMediumScreen ? (
              <FaFilter opacity={anySelectedFilters ? 1 : 0.5} />
            ) : undefined
          }
          colorScheme="blue"
          variant="solid"
        >
          {props.isMediumScreen ? (
            "Filter"
          ) : (
            <FaFilter opacity={anySelectedFilters ? 1 : 0.5} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={30}>
        <VStack spacing={4} p={4}>
          <MultiSelectDropdown
            id="major-dropdown"
            width="100%"
            options={majors}
            selectedOptions={props.filtering.selectedMajors}
            displayedOptions={props.filtering.majorToMajorWithCount}
            onSelectionChange={props.filtering.setSelectedMajors}
            placeholderText="Filter Major(s)"
          />
          <MultiSelectDropdown
            id="degree-dropdown"
            width="100%"
            options={DEGREE_TYPES}
            selectedOptions={props.filtering.selectedDegrees}
            displayedOptions={props.filtering.degreesWithCounts}
            onSelectionChange={props.filtering.setSelectedDegrees}
            placeholderText="Filter Degree(s)"
          />
          <MultiSelectDropdown
            id="year-dropdown"
            width="100%"
            options={YEARS}
            selectedOptions={props.filtering.selectedYears}
            displayedOptions={props.filtering.yearsWithCounts}
            onSelectionChange={props.filtering.setSelectedYears}
            placeholderText="Filter Year(s)"
          />
          <MultiSelectDropdown
            id="job-dropdown"
            width="100%"
            options={JOB_INTERESTS}
            selectedOptions={props.filtering.selectedJobInterests}
            displayedOptions={props.filtering.jobInterestsWithCounts}
            onSelectionChange={props.filtering.setSelectedJobInterests}
            placeholderText="Filter Role Interest(s)"
          />
          <Button
            colorScheme="red"
            variant="outline"
            onClick={handleClear}
            width="100%"
            fontSize="md"
          >
            Clear Filters
          </Button>
        </VStack>
      </PopoverContent>
    </Popover>
  );
}
