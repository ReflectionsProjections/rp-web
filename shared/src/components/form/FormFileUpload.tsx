import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { FastField, FieldProps } from "formik";
import { FiUpload } from "react-icons/fi";

export type UploadFile = {
  open: () => Promise<void>;
  name: string;
  file?: File;
};

type Props<TValues, TFieldName extends keyof TValues> = {
  name: TFieldName;
  label: string;
  isRequired?: boolean;
  accept?: string;
  helperText?: string;
};

const FileUpload = <
  TValues extends Record<string, unknown> &
    Record<TFieldName, UploadFile | null>,
  TFieldName extends keyof TValues & string
>({
  name,
  label,
  isRequired,
  accept = "*",
  helperText
}: Props<TValues, TFieldName>) => {
  const toast = useToast();

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

          <HStack>
            <Box position="relative">
              {!field.value && (
                <>
                  <Input
                    id={name}
                    type="file"
                    accept={accept}
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];

                      void form.setFieldValue(
                        name,
                        file
                          ? {
                              open: () => {
                                const fileUrl = URL.createObjectURL(file);
                                window.open(fileUrl, "_blank");
                              },
                              name: file.name,
                              file
                            }
                          : null
                      );
                    }}
                    onBlur={() => void form.setFieldTouched(name, true)}
                    hidden
                  />
                  <label htmlFor={name}>
                    <Button
                      as="span"
                      leftIcon={<Icon as={FiUpload} />}
                      variant="outline"
                      cursor="pointer"
                      color="#CCCCCC"
                      _hover={{ color: "black", backgroundColor: "white" }}
                      backgroundColor="#12131A"
                    >
                      Choose File
                    </Button>
                  </label>
                </>
              )}
            </Box>

            {field.value && (
              <Box
                display="flex"
                alignItems="center"
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
                px={3}
                py={1}
                cursor="pointer"
                onClick={() => {
                  if (field.value?.open) {
                    toast.promise(
                      (async () => {
                        await field.value!.open();
                      })(),
                      {
                        success: { title: "File opened successfully!" },
                        loading: { title: "Opening file..." },
                        error: { title: "Failed to open file" }
                      }
                    );
                  }
                }}
              >
                <Text mr={2} fontWeight="semibold">
                  {field.value.name}
                </Text>
                <IconButton
                  icon={<SmallCloseIcon />}
                  id={name}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    void form.setFieldValue(name, "");
                  }}
                  borderRadius="full"
                  px={2}
                  aria-label="Remove file"
                />
              </Box>
            )}
          </HStack>

          {helperText && (
            <FormHelperText mt={3} color="gray.300" fontSize="lg">
              {helperText}
            </FormHelperText>
          )}

          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      )}
    </FastField>
  );
};

export default FileUpload;
