import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";
import { FastField, FieldProps } from "formik";

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
};

const FormTextField = <
  TValues extends Record<string, unknown> & Record<TFieldName, string>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  placeholder,
  isRequired,
  type,
  maxLength
}: Props<TValues, TFieldName>) => {
  return (
    <FastField name={name}>
      {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
        <FormControl
          isInvalid={!!form.errors[name] && !!form.touched[name]}
          isRequired={isRequired}
        >
          <FormLabel fontSize="2xl" fontWeight="bold" mb={2} htmlFor={name}>
            {label}
          </FormLabel>

          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            _placeholder={{ color: "#CCCCCC" }}
            backgroundColor="#12131A"
            maxLength={maxLength}
          />

          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      )}
    </FastField>
  );
};

export default FormTextField;
