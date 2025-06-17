import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import {
  FormControl,
  Input,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
  HStack
} from "@chakra-ui/react";
import { Config } from "../config";

interface MultiSelectDropdownProps {
  id: string;
  width: string;
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
  baseColor: string;
  placeholderText?: string | null;
}

function MultiSelectDropdown({
  id,
  width,
  options,
  selectedOptions,
  onSelectionChange,
  baseColor,
  placeholderText = "Select"
}: MultiSelectDropdownProps) {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(
    options.slice(0, Config.MAX_DROPDOWN_OPTIONS)
  );

  const bgColor =
    parseInt(baseColor) < 500
      ? "gray." + (parseInt(baseColor) - 100)
      : "gray." + (100 + parseInt(baseColor));

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
    <FormControl width={width} zIndex="15">
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        autoFocus={false}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box zIndex="15">
            <HStack
              //   onClick={() => setIsOpen(!isOpen)}
              p={2}
              border="1px solid"
              borderColor={parseInt(baseColor) > 500 ? `gray.600` : `gray.400`}
              borderRadius="md"
              wrap="wrap"
              spacing={1}
              minHeight="40px"
              bgColor={bgColor}
            >
              {selectedOptions.map((option) => (
                <Tag
                  key={option}
                  size="sm"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="teal"
                >
                  <TagLabel>{option.toUpperCase()}</TagLabel>
                  <TagCloseButton onClick={() => handleRemove(option)} />
                </Tag>
              ))}
              <Input
                autoComplete="off"
                id={id}
                value={query}
                variant="unstyled"
                flex="1"
                placeholder={
                  selectedOptions.length === 0 ? `${placeholderText}` : ""
                }
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
          bgColor={bgColor}
          minWidth="200px"
          width={width}
          maxWidth="90vw"
          zIndex="30"
          maxH="3xl"
          overflowY="auto"
        >
          <PopoverArrow bgColor={bgColor} />
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
                  {option}
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
