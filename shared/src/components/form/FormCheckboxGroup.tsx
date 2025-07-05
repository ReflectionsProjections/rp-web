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
          ? [...baseCheckboxValues, "other__"]
          : baseCheckboxValues;

        const updateValues = async (values: string[]) => {
          const base = values.filter((value) => value !== "other__");

          await form.setFieldValue(
            name,
            values.includes("other__")
              ? customValue
                ? [...base, customValue]
                : [...base, ""]
              : base
          );
          await form.setFieldTouched(name, true);
        };

        return (
          <FormControl
            isInvalid={!!form.errors[name] && !!form.touched[name]}
            isRequired={isRequired}
          >
            <FormLabel>{label}</FormLabel>

            <CheckboxGroup
              value={checkboxValues}
              onChange={(values: string[]) => void updateValues(values)}
            >
              <VStack align="left">
                {options.map((option) => (
                  <Checkbox key={option} value={option} isRequired={false}>
                    {option}
                  </Checkbox>
                ))}
                {
                  <Checkbox key="other__" value="other__" isRequired={false}>
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
                  isRequired={true}
                  onChange={(e) => {
                    const custom = `_${e.target.value}`;
                    void (async () => {
                      await form.setFieldValue(name, [
                        ...baseCheckboxValues,
                        custom
                      ]);
                      await form.setFieldTouched(name, true);
                    })();
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
