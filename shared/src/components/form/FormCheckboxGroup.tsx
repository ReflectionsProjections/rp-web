import {
  FormControl,
  CheckboxGroup,
  Checkbox,
  Input,
  FormErrorMessage,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import { FastField, Field, FieldProps } from "formik";

type Props<
  TValues,
  TFieldName extends keyof (TValues & string),
  TOtherName extends (keyof TValues & string) | undefined = undefined
> = {
  name: TFieldName;
  label: string;
  options: string[];
} & (TOtherName extends undefined
  ? { custom?: undefined }
  : { custom: { name: TOtherName; label: string } });

const FormCheckboxGroup = <
  TValues extends Record<string, unknown> & Record<TFieldName, string[]>,
  TFieldName extends keyof TValues & string,
  TOtherName extends (keyof TValues & string) | undefined = undefined
>({
  name,
  label,
  options,
  custom
}: Props<TValues, TFieldName, TOtherName>) => (
  <FastField name={name}>
    {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => {
      const updateValues = async (values: string[]) => {
        await form.setFieldValue(name, values);
        await form.setFieldTouched(name, true);
      };

      return (
        <FormControl
          isInvalid={
            (!!form.errors[name] || (custom && !!form.errors[custom.name])) &&
            !!form.touched[name]
          }
        >
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {label}
          </Text>

          <CheckboxGroup
            value={field.value}
            onChange={(values: string[]) => void updateValues(values)}
          >
            <VStack alignItems="start" gap={4}>
              <HStack
                alignItems="start"
                justifyContent="space-between"
                w="100%"
              >
                <VStack alignItems="start" gap={4} flex={1}>
                  {options
                    .slice(0, Math.ceil(options.length / 2))
                    .map((option, i) => (
                      <Checkbox
                        key={option}
                        value={option}
                        name={name}
                        id={`${name}-0-${i}`}
                      >
                        {option}
                      </Checkbox>
                    ))}
                </VStack>
                <VStack alignItems="start" gap={4} flex={1}>
                  {options
                    .slice(Math.ceil(options.length / 2))
                    .map((option, i) => (
                      <Checkbox
                        key={option}
                        value={option}
                        name={name}
                        id={`${name}-1-${i}`}
                      >
                        {option}
                      </Checkbox>
                    ))}
                </VStack>
              </HStack>
              {custom && (
                <HStack gap={4} w="100%">
                  <Checkbox
                    key={custom.label}
                    value={custom.label}
                    name={name}
                    flexShrink={0}
                    id={`${name}-other`}
                  >
                    {custom.label}
                  </Checkbox>
                  <Field name={custom.name}>
                    {({
                      field: customField
                    }: FieldProps<
                      TValues[TOtherName & keyof TValues],
                      TValues
                    >) => {
                      const showCustomInput = field.value?.includes(
                        custom.label
                      );

                      return (
                        <Input
                          {...customField}
                          id={custom.name}
                          placeholder={showCustomInput ? "Please specify" : ""}
                          _placeholder={{ color: "#CCCCCC" }}
                          variant={showCustomInput ? "outline" : "flushed"}
                          backgroundColor={
                            showCustomInput ? "#12131A" : "transparent"
                          }
                          py={0.5}
                          h="fit-content"
                          disabled={!showCustomInput}
                        />
                      );
                    }}
                  </Field>
                </HStack>
              )}
            </VStack>
          </CheckboxGroup>
          <FormErrorMessage>
            {(form.errors[name] as string) ??
              (custom ? form.errors[custom.name] : undefined)}
          </FormErrorMessage>
        </FormControl>
      );
    }}
  </FastField>
);

export default FormCheckboxGroup;
