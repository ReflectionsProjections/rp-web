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
import { FastField, Field, FieldProps } from "formik";

type Props<
  TValues,
  TFieldName extends keyof TValues & string,
  TOtherName extends (keyof TValues & string) | undefined = undefined
> = {
  name: TFieldName;
  label: string;
  options: string[];
  isRequired?: boolean;
} & (TOtherName extends undefined
  ? { custom?: undefined }
  : { custom: { name: TOtherName; label: string } });

const FormRadioGroup = <
  TValues extends Record<string, unknown> & Record<TFieldName, string>,
  TFieldName extends keyof TValues & string,
  TOtherName extends (keyof TValues & string) | undefined = undefined
>({
  name,
  label,
  options,
  isRequired,
  custom
}: Props<TValues, TFieldName, TOtherName>) => (
  <FastField name={name}>
    {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
      <FormControl
        isInvalid={
          (!!form.errors[name] || (custom && !!form.errors[custom.name])) &&
          !!form.touched[name]
        }
        isRequired={isRequired}
      >
        <FormLabel fontSize="2xl" fontWeight="bold" mb={2}>
          {label}
        </FormLabel>

        <RadioGroup
          {...field}
          onChange={(val) => void form.setFieldValue(name, val)}
          id={name}
        >
          <VStack alignItems="start" gap={4}>
            <HStack alignItems="start" justifyContent="space-between" w="100%">
              <VStack alignItems="start" gap={4} flex={1}>
                {options
                  .slice(0, Math.ceil(options.length / 2))
                  .map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
              </VStack>
              <VStack alignItems="start" gap={4} flex={1}>
                {options.slice(Math.ceil(options.length / 2)).map((option) => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ))}
              </VStack>
            </HStack>
            {custom && (
              <HStack gap={4} w="100%">
                <Radio
                  key={custom.label}
                  value={custom.label}
                  flexShrink={0}
                  id={`${name}-other`}
                >
                  {custom.label}
                </Radio>
                <Field name={custom.name} id={custom.name}>
                  {({
                    field: customField
                  }: FieldProps<
                    TValues[TOtherName & keyof TValues],
                    TValues
                  >) => {
                    const showCustomInput = field.value === custom.label;

                    return (
                      <Input
                        {...customField}
                        h="fit-content"
                        placeholder={showCustomInput ? "Please specify" : ""}
                        _placeholder={{ color: "#CCCCCC" }}
                        disabled={!showCustomInput}
                        variant={showCustomInput ? "outline" : "flushed"}
                        backgroundColor={
                          showCustomInput ? "#12131A" : "transparent"
                        }
                        py={0.5}
                        maxLength={100}
                      />
                    );
                  }}
                </Field>
              </HStack>
            )}
          </VStack>
        </RadioGroup>
        <FormErrorMessage>
          {(form.errors[name] as string) ??
            (custom ? form.errors[custom.name] : undefined)}
        </FormErrorMessage>
      </FormControl>
    )}
  </FastField>
);

export default FormRadioGroup;
