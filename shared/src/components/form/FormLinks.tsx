import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
  Text
} from "@chakra-ui/react";
import { Field, FieldArray, FieldProps } from "formik";
import { DeleteIcon } from "@chakra-ui/icons";

const PLATFORM_PREFIX = ["https://github.com/", "https://linkedin.com/in/"];

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  maxLinks?: number;
};

const FormLinks = <
  TValues extends Record<string, unknown> & Record<TFieldName, string[]>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  maxLinks = 5
}: Props<TValues, TFieldName>) => (
  <Field name={name}>
    {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
      <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
        <FormLabel>{label}</FormLabel>

        <FieldArray name={name}>
          {({
            push,
            remove
          }: {
            push: (this: void, value: string) => void;
            remove: (this: void, index: number) => void;
          }) => (
            <VStack align="start" spacing={3}>
              {(field.value.length < maxLinks
                ? [...field.value, ""]
                : field.value
              ).map((link, index) => {
                const specialPrefix = PLATFORM_PREFIX.find((prefix) =>
                  link.startsWith(prefix)
                );

                const inputError = form.errors[name]?.[index];
                const touchedValue = form.touched[name];
                const inputTouched =
                  Array.isArray(touchedValue) && touchedValue[index];
                const isInvalid = !!inputError && !!inputTouched;

                return (
                  <>
                    <HStack key={index} w="100%">
                      {specialPrefix ? (
                        <>
                          <Text fontSize="sm" color="gray.500">
                            {specialPrefix}
                          </Text>
                          <Input
                            value={link.replace(specialPrefix, "")}
                            onChange={(e) => {
                              const updated = [...field.value];
                              updated[index] = specialPrefix + e.target.value;
                              void form.setFieldValue(name, updated);
                            }}
                            placeholder="username"
                            flex="1"
                            isInvalid={isInvalid}
                          />
                        </>
                      ) : (
                        <Input
                          value={link}
                          onChange={(e) => {
                            const updated = [...field.value];
                            updated[index] = e.target.value;
                            void form.setFieldValue(name, updated);
                          }}
                          placeholder="https://example.com"
                          flex="1"
                          isInvalid={isInvalid}
                        />
                      )}
                      {index < field.value.length && (
                        <IconButton
                          aria-label="Remove"
                          icon={<DeleteIcon />}
                          onClick={() => remove(index)}
                          size="sm"
                        />
                      )}
                    </HStack>
                    <FormErrorMessage>{inputError as string}</FormErrorMessage>
                  </>
                );
              })}

              <HStack>
                <Button
                  onClick={() => push("https://github.com/")}
                  isDisabled={field.value.length >= maxLinks}
                  size="sm"
                  variant="ghost"
                >
                  GitHub
                </Button>

                <Button
                  onClick={() => push("https://linkedin.com/in/")}
                  isDisabled={field.value.length >= maxLinks}
                  size="sm"
                  variant="ghost"
                >
                  LinkedIn
                </Button>
              </HStack>

              <Text fontSize="sm" color="gray.500">
                Max {maxLinks} links
              </Text>
            </VStack>
          )}
        </FieldArray>
      </FormControl>
    )}
  </Field>
);

export default FormLinks;
