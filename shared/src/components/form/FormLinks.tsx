import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
  Text,
  Icon
} from "@chakra-ui/react";
import { Field, FieldArray, FieldProps } from "formik";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const LINK_ROW_HEIGHT = 56;
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
        <FormLabel fontSize="xl" fontWeight="bold" mb={2}>
          {label}{" "}
          <Text as="span" fontSize="sm" color="#CCCCCC">
            (max {maxLinks})
          </Text>
        </FormLabel>

        <FieldArray name={name}>
          {({
            push,
            remove
          }: {
            push: (this: void, value: string) => void;
            remove: (this: void, index: number) => void;
          }) => {
            const minHeight = LINK_ROW_HEIGHT * maxLinks;

            return (
              <VStack align="start" gap={4} minH={`${minHeight}px`}>
                <HStack>
                  <Button
                    onClick={() => push("https://github.com/")}
                    isDisabled={
                      field.value.length >= maxLinks ||
                      field.value.some((link) =>
                        link.startsWith("https://github.com/")
                      )
                    }
                    size="sm"
                    gap={2}
                  >
                    <Icon as={FaGithub} />
                    GitHub
                  </Button>

                  <Button
                    onClick={() => push("https://linkedin.com/in/")}
                    isDisabled={
                      field.value.length >= maxLinks ||
                      field.value.some((link) =>
                        link.startsWith("https://linkedin.com/in/")
                      )
                    }
                    size="sm"
                    gap={2}
                  >
                    <Icon as={FaLinkedin} />
                    LinkedIn
                  </Button>
                </HStack>

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
                      <HStack
                        key={index}
                        align="center"
                        w="min(500px, 50vw)"
                        gap={4}
                      >
                        {(index < field.value.length ||
                          field.value.length === maxLinks) &&
                          (specialPrefix === "https://github.com/" ? (
                            <Icon
                              as={FaGithub}
                              boxSize={5}
                              color="gray.500"
                              backgroundColor="#ffffff"
                              borderRadius="full"
                            />
                          ) : specialPrefix === "https://linkedin.com/in/" ? (
                            <Icon
                              as={FaLinkedin}
                              boxSize={5}
                              color="blue.500"
                              backgroundColor="#ffffff"
                            />
                          ) : (
                            <Icon
                              as={FaGlobe}
                              boxSize={5}
                              color="gray.400"
                              backgroundColor="#ffffff"
                              borderRadius="full"
                            />
                          ))}
                        <HStack w="100%">
                          {specialPrefix && <Text>{specialPrefix}</Text>}
                          <Input
                            value={
                              specialPrefix
                                ? link.replace(specialPrefix, "")
                                : link
                            }
                            onChange={(e) => {
                              const updated = [...field.value];

                              if (specialPrefix) {
                                updated[index] = specialPrefix + e.target.value;
                              } else {
                                updated[index] = e.target.value;
                                if (e.target.value === "github.com") {
                                  updated[index] = "https://github.com/";
                                } else if (e.target.value === "linkedin.com") {
                                  updated[index] = "https://linkedin.com/in/";
                                }
                              }

                              void form.setFieldValue(name, updated);
                            }}
                            placeholder={
                              specialPrefix ? "username" : "example.com"
                            }
                            _placeholder={{ color: "#CCCCCC" }}
                            flex="1"
                            isInvalid={isInvalid}
                            variant="flushed"
                            w="100%"
                            height="fit-content"
                          />
                        </HStack>
                        {index < field.value.length && (
                          <IconButton
                            aria-label="Remove"
                            icon={<DeleteIcon />}
                            onClick={() => remove(index)}
                            size="sm"
                          />
                        )}
                      </HStack>

                      <FormErrorMessage>
                        {inputError as string}
                      </FormErrorMessage>
                    </>
                  );
                })}
              </VStack>
            );
          }}
        </FieldArray>
      </FormControl>
    )}
  </Field>
);

export default FormLinks;
