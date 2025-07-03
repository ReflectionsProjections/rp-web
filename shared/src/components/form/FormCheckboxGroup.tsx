import {
  FormControl,
  FormLabel,
  CheckboxGroup,
  Checkbox,
  Input,
  Box,
  FormErrorMessage,
  VStack
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  options: string[];
  isRequired?: boolean;
  customLabel?: string;
};

const FormCheckboxGroup = <
  TValues extends Record<string, unknown> & Record<TFieldName, string[]>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  options,
  isRequired,
  customLabel
}: Props<TValues, TFieldName>) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => {
        const selected = field.value || [];

        const customValue = selected.find((value) => !options.includes(value));

        const showCustomInput = customValue !== undefined;

        const baseCheckboxValues = selected.filter((val) =>
          options.includes(val)
        );

        const checkboxValues = showCustomInput
          ? [...baseCheckboxValues, "__other__"]
          : baseCheckboxValues;

        const updateValues = (values: string[]) => {
          const base = values.filter((value) => value !== "__other__");

          void form.setFieldValue(
            name,
            values.includes("__other__")
              ? customValue
                ? [...base, customValue]
                : [...base, ""]
              : base
          );
        };

        return (
          <FormControl
            isInvalid={!!form.errors[name] && !!form.touched[name]}
            isRequired={isRequired}
          >
            <FormLabel>{label}</FormLabel>

            <CheckboxGroup
              value={checkboxValues}
              onChange={(values: string[]) => updateValues(values)}
            >
              <VStack align="left">
                {options.map((option) => (
                  <Checkbox key={option} value={option}>
                    {option}
                  </Checkbox>
                ))}
                {
                  <Checkbox key="__other__" value="__other__">
                    {customLabel}
                  </Checkbox>
                }
              </VStack>
            </CheckboxGroup>

            {showCustomInput && (
              <Box mt={2}>
                <Input
                  placeholder="Please specify"
                  value={customValue.slice(1) || ""}
                  onChange={(e) => {
                    const custom = `_${e.target.value}`;
                    void form.setFieldValue(name, [
                      ...baseCheckboxValues,
                      custom
                    ]);
                  }}
                />
              </Box>
            )}

            <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormCheckboxGroup;
