import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  Radio,
  HStack,
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
            <FormLabel fontSize="xl" fontWeight="bold" mb={2}>
              {label}
            </FormLabel>

            <RadioGroup
              {...field}
              // pl={4}
              value={radioValue}
              onChange={(value) => {
                void form.setFieldValue(
                  name,
                  value === "other__" ? "_" : value
                );
              }}
            >
              <VStack alignItems="start" gap={4}>
                <HStack
                  alignItems="start"
                  justifyContent="space-between"
                  w="100%"
                >
                  <VStack alignItems="start" gap={4} flex={1}>
                    {options
                      .filter((_, i) => i % 2 === 0)
                      .map((option) => (
                        <Radio key={option} value={option}>
                          {option}
                        </Radio>
                      ))}
                  </VStack>
                  <VStack alignItems="start" gap={4} flex={1}>
                    {options
                      .filter((_, i) => i % 2 === 1)
                      .map((option) => (
                        <Radio key={option} value={option}>
                          {option}
                        </Radio>
                      ))}
                  </VStack>
                </HStack>
                {customLabel && (
                  <HStack gap={4} w="100%">
                    <Radio key="other__" value="other__" flexShrink={0}>
                      {customLabel}
                    </Radio>
                    <Input
                      {...field}
                      variant="flushed"
                      h="fit-content"
                      placeholder={
                        radioValue === "other__" ? "Please specify" : ""
                      }
                      _placeholder={{ color: "#CCCCCC" }}
                      disabled={radioValue !== "other__"}
                      value={
                        radioValue === "other__" && value !== "other__"
                          ? value.slice(1)
                          : ""
                      }
                      onChange={(e) => {
                        const custom = `_${e.target.value}`;
                        void form.setFieldValue(name, custom);
                      }}
                    />
                  </HStack>
                )}
              </VStack>
            </RadioGroup>
            <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormRadioGroup;
