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
          />

          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      );
    }}
  </Field>
);

export default FormSelectMenu;
