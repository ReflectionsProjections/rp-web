import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Text
} from "@chakra-ui/react";
import { FastField, FieldProps } from "formik";
import { FiUpload } from "react-icons/fi";

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
  <FastField name={name}>
    {({ field, form }: FieldProps<TValues[TFieldName], TValues>) => (
      <FormControl
        isInvalid={!!form.errors[name] && !!form.touched[name]}
        isRequired={isRequired}
      >
        <FormLabel fontSize="2xl" fontWeight="bold" mb={2} htmlFor={undefined}>
          {label}
        </FormLabel>

        <HStack>
          <Box position="relative">
            {!field.value && (
              <>
                <Input
                  id={name}
                  type="file"
                  accept="*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    void form.setFieldValue(name, file?.name ?? "");
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
            >
              <Text mr={2} fontWeight="semibold">
                {field.value}
              </Text>
              <IconButton
                icon={<SmallCloseIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={() => {
                  void form.setFieldValue(name, "");
                }}
                borderRadius="full"
                px={2}
                aria-label="Remove file"
              />
            </Box>
          )}
        </HStack>

        <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
      </FormControl>
    )}
  </FastField>
);

export default FileUpload;
