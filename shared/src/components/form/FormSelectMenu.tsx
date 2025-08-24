import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { FastField, FieldProps } from "formik";
import { Select, MultiValue, SingleValue } from "chakra-react-select";
import { useState, useMemo, useCallback, useEffect } from "react";

type SelectOption = {
  label: string;
  value: string;
};

interface OptimizedSelectProps<TValues, TFieldName extends keyof TValues> {
  name: TFieldName;
  options: SelectOption[];
  placeholder?: string;
  pageSize: number;
  isMulti?: boolean;
  field: FieldProps<TValues[TFieldName], TValues>["field"];
  form: FieldProps<TValues[TFieldName], TValues>["form"];
}

const OptimizedSelect = <
  TValues extends Record<string, unknown>,
  TFieldName extends keyof TValues & string
>({
  name,
  options,
  placeholder,
  pageSize,
  isMulti = false,
  field,
  form
}: OptimizedSelectProps<TValues, TFieldName>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(pageSize);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const displayedOptions = useMemo(() => {
    return filteredOptions.slice(0, displayCount);
  }, [filteredOptions, displayCount]);

  const selectedOption = useMemo(() => {
    if (isMulti) {
      const values = Array.isArray(field.value)
        ? (field.value as string[])
        : [];
      return options.filter((option) => values.includes(option.value));
    } else {
      return options.find((option) => option.value === field.value) ?? null;
    }
  }, [options, field.value, isMulti]);

  const hasMore = filteredOptions.length > displayedOptions.length;

  const handleMenuScrollToBottom = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => prev + pageSize);
    }
  }, [hasMore, pageSize]);

  useEffect(() => {
    setDisplayCount(pageSize);
  }, [searchTerm, pageSize]);

  const isSearchable = options.length > 20;

  const handleChange = useCallback(
    (selectedValue: MultiValue<SelectOption> | SingleValue<SelectOption>) => {
      if (isMulti) {
        const values = Array.isArray(selectedValue)
          ? (selectedValue as readonly SelectOption[]).map(
              (option) => option.value
            )
          : [];
        void form.setFieldValue(name, values);
      } else {
        const value =
          selectedValue && !Array.isArray(selectedValue)
            ? (selectedValue as SelectOption).value
            : "";
        void form.setFieldValue(name, value);
      }
    },
    [form, name, isMulti]
  );

  return (
    <Select<SelectOption, typeof isMulti>
      name={name}
      value={selectedOption}
      onChange={handleChange}
      onBlur={() => void form.setFieldTouched(name, true)}
      onInputChange={(inputValue) => setSearchTerm(inputValue)}
      maxMenuHeight={300}
      options={displayedOptions}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isMulti={isMulti}
      filterOption={() => true}
      captureMenuScroll={true}
      onMenuScrollToBottom={handleMenuScrollToBottom}
      noOptionsMessage={() =>
        searchTerm ? "No options match your search" : "No options available"
      }
      loadingMessage={() => "Loading more options..."}
      chakraStyles={{
        container: (provided) => ({
          ...provided,
          backgroundColor: "#12131A"
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#CCCCCC"
        }),
        menuList: (provided) => ({
          ...provided,
          backgroundColor: "#2D2D2D",
          color: "whiteAlpha.900",
          border: "none"
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
          color: "whiteAlpha.900",
          cursor: "pointer"
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: "#2D2D2D",
          color: "white"
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "white"
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "white",
          ":hover": {
            backgroundColor: "gray.600",
            color: "white"
          }
        })
      }}
    />
  );
};

type FormSelectMenuProps<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  isRequired?: boolean;
  pageSize?: number;
  isMulti?: boolean;
};

const FormSelectMenu = <
  TValues extends Record<string, unknown>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  options,
  placeholder,
  isRequired,
  pageSize = 100,
  isMulti = false
}: FormSelectMenuProps<TValues, TFieldName>) => (
  <FastField name={name}>
    {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
      <FormControl
        isInvalid={!!form.errors[name] && !!form.touched[name]}
        isRequired={isRequired}
      >
        <FormLabel fontSize="2xl" fontWeight="bold" mb={2}>
          {label}
        </FormLabel>
        <OptimizedSelect
          name={name}
          options={options}
          placeholder={placeholder}
          pageSize={pageSize}
          isMulti={isMulti}
          field={field}
          form={form}
        />
        <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
      </FormControl>
    )}
  </FastField>
);

export default FormSelectMenu;
