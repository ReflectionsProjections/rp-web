import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox
} from "@chakra-ui/react";
import { FastField, FieldProps } from "formik";

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  isRequired?: boolean;
};

const FormCheckbox = <
  TValues extends Record<string, unknown> & Record<TFieldName, boolean>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  isRequired = false
}: Props<TValues, TFieldName>) => {
  return (
    <FastField name={name}>
      {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
        <FormControl
          isInvalid={!!form.errors[name] && !!form.touched[name]}
          isRequired={isRequired}
        >
          <Checkbox
            isChecked={!!field.value}
            onChange={(e) => {
              void form.setFieldValue(name, e.target.checked);
            }}
            onBlur={field.onBlur}
            name={field.name}
          >
            <FormLabel m={0} fontSize="xl">
              {label}
            </FormLabel>
          </Checkbox>
          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      )}
    </FastField>
  );
};

export default FormCheckbox;
