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
            <FormLabel>{label}</FormLabel>

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
            />

            <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormMultiSelectMenu;
