import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  checkboxLabel: string;
};

const FormRequiredCheckbox = <
  TValues extends Record<string, unknown> & Record<TFieldName, boolean>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  checkboxLabel
}: Props<TValues, TFieldName>) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
        <FormControl
          isInvalid={!!form.errors[name] && !!form.touched[name]}
          isRequired
        >
          {/* <FormLabel fontSize="xl" fontWeight="bold" mb={2}>{label}</FormLabel> */}
          <Checkbox
            isChecked={!!field.value}
            onChange={(e) => {
              void form.setFieldValue(name, e.target.checked);
            }}
            onBlur={field.onBlur}
            name={field.name}
          >
            <FormLabel m={0}>{checkboxLabel}</FormLabel>
          </Checkbox>
          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormRequiredCheckbox;
