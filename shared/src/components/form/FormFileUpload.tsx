import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Text
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  isRequired?: boolean;
};

const FileUpload = <
  TValues extends Record<string, unknown> & Record<TFieldName, string>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  isRequired
}: Props<TValues, TFieldName>) => (
  <Field name={name}>
    {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
      <FormControl
        isInvalid={!!form.errors[name] && !!form.touched[name]}
        isRequired={isRequired}
      >
        <FormLabel>{label}</FormLabel>

        <Input
          type="file"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];

            if (!file) {
              void form.setFieldValue(name, "");
            } else {
              void form.setFieldValue(name, file.name);
            }
          }}
          onBlur={() => {
            void form.setFieldTouched(name, true);
          }}
        />

        {field.value && (
          <Box mt={2}>
            <Text fontSize="sm" color="gray.600">
              Uploaded: {field.value}
            </Text>
          </Box>
        )}

        <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export default FileUpload;
