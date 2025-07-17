import {
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
  RadioGroup,
  Radio,
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

const FormRadioGroup = <
  TValues extends Record<string, unknown> & Record<TFieldName, string>,
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
        const value = field.value;
        const isCustom = !options.includes(value) && value !== "";
        const radioValue = isCustom ? "other__" : value;

        return (
          <FormControl
            isInvalid={!!form.errors[name] && !!form.touched[name]}
            isRequired={isRequired}
          >
            <FormLabel>{label}</FormLabel>

            <RadioGroup
              {...field}
              value={radioValue}
              onChange={(value) => {
                void form.setFieldValue(
                  name,
                  value === "other__" ? "_" : value
                );
              }}
            >
              <VStack align="left">
                {options.map((option) => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ))}
                {customLabel && (
                  <Radio key="other__" value="other__">
                    {customLabel}
                  </Radio>
                )}
              </VStack>
            </RadioGroup>

            {radioValue === "other__" && (
              <Box mt={2}>
                <Input
                  {...field}
                  placeholder="Please specify"
                  value={value !== "other__" ? value.slice(1) : ""}
                  onChange={(e) => {
                    const custom = `_${e.target.value}`;
                    void form.setFieldValue(name, custom);
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

export default FormRadioGroup;
