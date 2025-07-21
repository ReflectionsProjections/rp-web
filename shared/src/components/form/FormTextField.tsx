import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute;
};

const FormTextField = <
  TValues extends Record<string, unknown> & Record<TFieldName, string>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  placeholder,
  isRequired,
  type
}: Props<TValues, TFieldName>) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
        <FormControl
          isInvalid={!!form.errors[name] && !!form.touched[name]}
          isRequired={isRequired}
        >
          <FormLabel fontSize="xl" fontWeight="bold" mb={2}>
            {label}
          </FormLabel>

          <Input {...field} type={type} placeholder={placeholder} />

          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormTextField;
