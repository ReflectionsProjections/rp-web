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

const FormSelectMenu = <
  TValues extends Record<string, unknown> & Record<TFieldName, string>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  options,
  placeholder,
  isRequired
}: Props<TValues, TFieldName>) => (
  <Field name={name}>
    {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => {
      const selectedOption =
        options.find((option) => option.value === field.value) ?? null;

      return (
        <FormControl
          isInvalid={!!form.errors[name] && !!form.touched[name]}
          isRequired={isRequired}
        >
          <FormLabel>{label}</FormLabel>

          <Select<SelectOption>
            name={field.name}
            value={selectedOption}
            onChange={(option) =>
              void form.setFieldValue(name, option?.value ?? "")
            }
            onBlur={() => void form.setFieldTouched(name, true)}
            options={options}
            placeholder={placeholder}
            chakraStyles={{
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

          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      );
    }}
  </Field>
);

export default FormSelectMenu;
