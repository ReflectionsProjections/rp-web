import {
  Box,
  Flex,
  FormControl,
  HStack,
  Input,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  TagCloseButton,
  TagLabel
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { Config } from "../config";

interface MultiSelectDropdownProps {
  id: string;
  width: string;
  options: string[];
  displayedOptions?: Record<string, string>;
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholderText?: string | null;
}

type TagListProps = {
  selectedOptions: string[];
  handleRemove: (option: string) => void;
};

function TagList({ selectedOptions, handleRemove }: TagListProps) {
  return (
    <Flex gap={2} wrap="wrap">
      {selectedOptions.map((option) => (
        <Tag key={option} size="md" variant="solid" colorScheme="teal">
          <TagLabel>{option}</TagLabel>
          <TagCloseButton onClick={() => handleRemove(option)} />
        </Tag>
      ))}
    </Flex>
  );
}

function MultiSelectDropdown({
  id,
  width,
  options,
  selectedOptions,
  displayedOptions,
  onSelectionChange,
  placeholderText = "Select"
}: MultiSelectDropdownProps) {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(
    options.slice(0, Config.MAX_DROPDOWN_OPTIONS)
  );

  const fuse = new Fuse(options, {
    keys: [""],
    threshold: 0.3 // Lower threshold means more results
  });

  const resetFilter = () => {
    let newOptions;

    if (query.trim() === "") {
      newOptions = options
        .filter(
          (option) =>
            option.toLowerCase().includes(query.toLowerCase()) &&
            !selectedOptions.includes(option) // Omit already selected options
        )
        .slice(0, Config.MAX_DROPDOWN_OPTIONS);
    } else {
      // Apply fuzzy search if the user has started typing
      const fuzzyResults = fuse.search(query).map((result) => result.item);
      newOptions = fuzzyResults
        .filter((option) => !selectedOptions.includes(option)) // Omit already selected options
        .slice(0, Config.MAX_DROPDOWN_OPTIONS);
    }

    setFilteredOptions(newOptions);
  };

  const handleSelect = (option: string) => {
    if (!selectedOptions.includes(option)) {
      const newSelectedOptions = [...selectedOptions, option];
      onSelectionChange(newSelectedOptions);
      setQuery("");
      resetFilter();
      setIsOpen(false);
    }
  };

  const handleRemove = (option: string) => {
    const newSelectedOptions = selectedOptions.filter(
      (selected) => selected !== option
    );
    resetFilter();
    onSelectionChange(newSelectedOptions);
  };

  useEffect(() => {
    resetFilter();
  }, [query, selectedOptions, options]); // Dependencies include query, selectedOptions, and options

  return (
    <FormControl
      width={{
        base: "100%",
        lg: width
      }}
    >
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        autoFocus={false}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box>
            <HStack
              //   onClick={() => setIsOpen(!isOpen)}
              p={2}
              borderRadius="md"
              wrap="wrap"
              spacing={1}
              minHeight="40px"
              bgColor={"gray.200"}
            >
              <TagList
                selectedOptions={selectedOptions}
                handleRemove={handleRemove}
              />
              <Input
                autoComplete="off"
                id={id}
                value={query}
                variant="unstyled"
                flex="1"
                placeholder={
                  selectedOptions.length === 0 ? `${placeholderText}` : ""
                }
                _placeholder={{ color: "gray.600" }}
                onChange={(e) => {
                  setQuery(e.target.value);
                  resetFilter();
                  setIsOpen(true);
                }}
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)}
              />
            </HStack>
          </Box>
        </PopoverTrigger>
        <PopoverContent
          bgColor={"gray.100"}
          minWidth="200px"
          width={width}
          maxWidth="90vw"
          zIndex="999"
          maxH="3xl"
          overflowY="auto"
          boxShadow={"md"}
        >
          <PopoverBody>
            <List
              onMouseDown={(event) => {
                event.preventDefault();
              }}
            >
              {filteredOptions.map((option) => (
                <ListItem
                  key={option}
                  onClick={() => handleSelect(option)}
                  cursor="pointer"
                  _hover={{ backgroundColor: `gray.400` }}
                  borderRadius="4px"
                  padding="8px"
                >
                  {displayedOptions ? displayedOptions[option] : option}
                </ListItem>
              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}

export default MultiSelectDropdown;
