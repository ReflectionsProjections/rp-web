import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { Select } from "chakra-react-select";

type SelectOption = {
  label: string;
  value: string;
};

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  isRequired?: boolean;
};

const FormMultiSelectMenu = <
  TValues extends Record<string, unknown> & Record<TFieldName, string[]>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  options,
  placeholder,
  isRequired
}: Props<TValues, TFieldName>) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => {
        const selectedOptions = options.filter((opt) =>
          field.value?.includes(opt.value)
        );

        return (
          <FormControl
            isInvalid={!!form.errors[name] && !!form.touched[name]}
            isRequired={isRequired}
          >
            <FormLabel fontSize="xl" fontWeight="bold" mb={2}>
              {label}
            </FormLabel>

            <Select<SelectOption, true>
              name={field.name}
              isMulti
              value={selectedOptions}
              onChange={(selected) =>
                void form.setFieldValue(
                  name,
                  selected ? selected.map((opt) => opt.value) : []
                )
              }
              onBlur={() => void form.setFieldTouched(name, true)}
              options={options}
              placeholder={placeholder}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              chakraStyles={{
                placeholder: (provided) => ({
                  ...provided,
                  color: "#CCCCCC"
                }),
                menuList: (provided) => ({
                  ...provided,
                  backgroundColor: "#360b0bff",
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
                  backgroundColor: "#430C0C",
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

            <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormMultiSelectMenu;
