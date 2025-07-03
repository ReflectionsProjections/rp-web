import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  HStack,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { RegistrationDraft, useFormAutosave } from "@rp/shared";
import PersonalInfo from "@/components/Registration/pages/PersonalInfo";
import {
  registrationSchema,
  RegistrationValues
} from "@/components/Registration/schema";

const Register = () => {
  const initialValues: RegistrationValues = {
    name: "",
    over18: false,
    dietaryRestrictions: [],
    allergies: [],
    school: "",
    educationLevel: "",
    major: "",
    graduationYear: "",
    opportunities: [],
    hasResume: false,
    personalLinks: [],
    gender: "",
    ethnicity: [],
    howDidYouHear: [],
    tags: []
  };

  const dietaryOptions = ["VEGAN", "DAIRY-FREE", "VEGETARIAN", "GLUTEN-FREE"];

  const allergyOptions = [
    "PEANUTS",
    "TREE NUTS (ALMONDS, WALNUTS, PECANS)",
    "DAIRY",
    "EGGS",
    "SOY",
    "SHELLFISH",
    "FISH",
    "SESAME"
  ];

  const opportunityOptions = [
    "SUMMER INTERNSHIP",
    "FULL TIME",
    "FALL INTERNSHIP",
    "SPRING INTERNSHIP"
  ];

  const genderOptions = [
    "Male",
    "Female",
    "Nonbinary/Non-conforming",
    "Other/Prefer not to respond"
  ];

  const ethnicityOptions = [
    "HISPANIC/LATINX",
    "BLACK/AFRICAN AMERICAN",
    "WHITE",
    "AMERICAN INDIAN/ALASKAN NATIVE",
    "PACIFIC ISLANDER",
    "ASIAN",
    "MIDDLE EASTERN"
  ];

  const heardAboutOptions = [
    "WORD OF MOUTH",
    "IN-CLASS MARKETING",
    "ON CAMPUS EVENTS",
    "INSTAGRAM",
    "EMAIL",
    "OTHER",
    "LINKEDIN",
    "FLYERS"
  ];

  // Simulate autofilled email from login
  // In real app, replace with actual user email
  const userEmail = "user@example.com";

  const [page, setPage] = useState(0);

  // <Field name="educationLevel">
  //     {({
  //       field,
  //       form
  //     }: FieldProps<
  //       RegistrationValues["educationLevel"],
  //       RegistrationValues
  //     >) => (
  //       <FormControl
  //         isInvalid={
  //           !!form.errors.educationLevel && form.touched.educationLevel
  //         }
  //         isRequired
  //       >
  //         <FormLabel>What is your highest level of education?</FormLabel>
  //         <Input {...field} placeholder="Education Level" />
  //         <FormErrorMessage>{form.errors.educationLevel}</FormErrorMessage>
  //       </FormControl>
  //     )}
  //   </Field>

  //   <Field name="major">
  //     {({
  //       field,
  //       form
  //     }: FieldProps<RegistrationValues["major"], RegistrationValues>) => (
  //       <FormControl
  //         isInvalid={!!form.errors.major && form.touched.major}
  //         isRequired
  //       >
  //         <FormLabel>What is your current (or intended) major?</FormLabel>
  //         <Input {...field} placeholder="Major" />
  //         <FormErrorMessage>{form.errors.major}</FormErrorMessage>
  //       </FormControl>
  //     )}
  //   </Field>

  //   <Field name="graduationYear">
  //     {({
  //       field,
  //       form
  //     }: FieldProps<
  //       RegistrationValues["graduationYear"],
  //       RegistrationValues
  //     >) => (
  //       <FormControl
  //         isInvalid={
  //           !!form.errors.graduationYear && form.touched.graduationYear
  //         }
  //         isRequired
  //       >
  //         <FormLabel>When do you expect to graduate?</FormLabel>
  //         <Select {...field} placeholder="Select year">
  //           {Array.from({ length: 10 }, (_, i) => {
  //             const year = (new Date().getFullYear() + i).toString();
  //             return (
  //               <option key={year} value={year}>
  //                 {year}
  //               </option>
  //             );
  //           })}
  //         </Select>
  //         <FormErrorMessage>{form.errors.graduationYear}</FormErrorMessage>
  //       </FormControl>
  //     )}
  //   </Field>

  //   <Field name="over18" type="checkbox">
  //     {({
  //       field,
  //       form
  //     }: FieldProps<RegistrationValues["over18"], RegistrationValues>) => (
  //       <FormControl
  //         isInvalid={!!form.errors.over18 && form.touched.over18}
  //         isRequired
  //       >
  //         <Checkbox {...{ ...field, value: undefined }}>
  //           I certify that I am at least 18 years old
  //         </Checkbox>
  //         <FormErrorMessage>{form.errors.over18}</FormErrorMessage>
  //       </FormControl>
  //     )}
  //   </Field>

  // const formPages = [
  //   // Page 0: Basic Info
  //   ({ values, setFieldValue, errors, touched }) => (
  //     <VStack spacing={5} align="stretch">
  //       <FormControl isInvalid={!!errors.name && touched.name} isRequired>
  //         <FormLabel>Name</FormLabel>
  //         <Field as={Input} name="name" />
  //         <FormErrorMessage>{errors.name}</FormErrorMessage>
  //       </FormControl>

  //       <FormControl
  //         isInvalid={!!errors.over18 && touched.over18}
  //         isRequired
  //       >
  //         <Field name="over18" type="checkbox">
  //           {({ field }) => (
  //             <Checkbox {...field} isChecked={field.value}>
  //               Are you over 18 years old?
  //             </Checkbox>
  //           )}
  //         </Field>
  //         <FormErrorMessage>{errors.over18}</FormErrorMessage>
  //       </FormControl>

  //       <FormControl
  //         isInvalid={!!errors.school && touched.school}
  //         isRequired
  //       >
  //         <FormLabel>What school do you go to?</FormLabel>
  //         <Field as={Input} name="school" />
  //         <FormErrorMessage>{errors.school}</FormErrorMessage>
  //       </FormControl>

  //       <FormControl
  //         isInvalid={!!errors.educationLevel && touched.educationLevel}
  //         isRequired
  //       >
  //         <FormLabel>What is your highest level of education?</FormLabel>
  //         <Field as={Input} name="educationLevel" />
  //         <FormErrorMessage>{errors.educationLevel}</FormErrorMessage>
  //       </FormControl>

  //       <FormControl
  //         isInvalid={!!errors.major && touched.major}
  //         isRequired
  //       >
  //         <FormLabel>What is your current (or intended) major?</FormLabel>
  //         <Field as={Input} name="major" />
  //         <FormErrorMessage>{errors.major}</FormErrorMessage>
  //       </FormControl>

  //       <FormControl
  //         isInvalid={!!errors.graduation && touched.graduation}
  //         isRequired
  //       >
  //         <FormLabel>When do you graduate?</FormLabel>
  //         <Field as={Input} name="graduation" />
  //         <FormErrorMessage>{errors.graduation}</FormErrorMessage>
  //       </FormControl>

  //       <Button colorScheme="teal" onClick={() => setPage(1)}>
  //         Next
  //       </Button>
  //     </VStack>
  //   ),
  //   // Page 1: Additional Info
  //   ({ values, setFieldValue, errors, touched }) => (
  //     <VStack spacing={5} align="stretch">
  //       <FormControl>
  //         <FormLabel>Do you have any dietary restrictions?</FormLabel>
  //         <Field name="dietaryRestrictions">
  //           {({ field }) => (
  //             <CheckboxGroup
  //               colorScheme="teal"
  //               value={field.value}
  //               onChange={(val) =>
  //                 setFieldValue("dietaryRestrictions", val)
  //               }
  //             >
  //               <Stack direction="row" wrap="wrap">
  //                 {dietaryOptions.map((opt) => (
  //                   <Checkbox key={opt} value={opt}>
  //                     {opt}
  //                   </Checkbox>
  //                 ))}
  //               </Stack>
  //             </CheckboxGroup>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <FormControl>
  //         <FormLabel>Do you have any allergies?</FormLabel>
  //         <Field name="allergies">
  //           {({ field }) => (
  //             <CheckboxGroup
  //               colorScheme="teal"
  //               value={field.value}
  //               onChange={(val) => setFieldValue("allergies", val)}
  //             >
  //               <Stack direction="column">
  //                 {allergyOptions.map((opt) => (
  //                   <Checkbox key={opt} value={opt}>
  //                     {opt}
  //                   </Checkbox>
  //                 ))}
  //               </Stack>
  //             </CheckboxGroup>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <FormControl>
  //         <FormLabel>What opportunities are you open to?</FormLabel>
  //         <Field name="opportunities">
  //           {({ field }) => (
  //             <CheckboxGroup
  //               colorScheme="teal"
  //               value={field.value}
  //               onChange={(val) => setFieldValue("opportunities", val)}
  //             >
  //               <Stack direction="row" wrap="wrap">
  //                 {opportunityOptions.map((opt) => (
  //                   <Checkbox key={opt} value={opt}>
  //                     {opt}
  //                   </Checkbox>
  //                 ))}
  //               </Stack>
  //             </CheckboxGroup>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <FormControl>
  //         <FormLabel>Upload your resume</FormLabel>
  //         <Input
  //           type="file"
  //           accept=".pdf,.doc,.docx"
  //           onChange={(event) => {
  //             setFieldValue(
  //               "resume",
  //               event.currentTarget.files?.[0] || null
  //             );
  //           }}
  //         />
  //         {values.resume && (
  //           <Text fontSize="sm" mt={1}>
  //             {values.resume.name}
  //           </Text>
  //         )}
  //       </FormControl>

  //       <FormControl>
  //         <FormLabel>Add up to 5 personal links!</FormLabel>
  //         <FieldArray name="personalLinks">
  //           {({ push, remove, form }) => (
  //             <VStack align="stretch" spacing={2}>
  //               {form.values.personalLinks.map(
  //                 (link: string, idx: number) => (
  //                   <HStack key={idx}>
  //                     <Field
  //                       as={Input}
  //                       name={`personalLinks[${idx}]`}
  //                       placeholder="https://your-link.com"
  //                     />
  //                     <IconButton
  //                       aria-label="Remove link"
  //                       icon={<DeleteIcon />}
  //                       size="sm"
  //                       onClick={() => remove(idx)}
  //                       isDisabled={
  //                         form.values.personalLinks.length === 1
  //                       }
  //                     />
  //                   </HStack>
  //                 )
  //               )}
  //               {form.values.personalLinks.length < 5 && (
  //                 <Button
  //                   leftIcon={<AddIcon />}
  //                   size="sm"
  //                   onClick={() => push("")}
  //                   variant="outline"
  //                 >
  //                   Add Link
  //                 </Button>
  //               )}
  //             </VStack>
  //           )}
  //         </FieldArray>
  //         <FormErrorMessage>
  //           {Array.isArray(errors.personalLinks) &&
  //             errors.personalLinks.find(Boolean)}
  //         </FormErrorMessage>
  //       </FormControl>

  //       <FormControl>
  //         <FormLabel>What is your gender?</FormLabel>
  //         <Field name="gender">
  //           {({ field }) => (
  //             <RadioGroup
  //               value={field.value}
  //               onChange={(val) => setFieldValue("gender", val)}
  //             >
  //               <Stack direction="row" wrap="wrap">
  //                 {genderOptions.map((opt) => (
  //                   <Radio key={opt} value={opt}>
  //                     {opt}
  //                   </Radio>
  //                 ))}
  //               </Stack>
  //             </RadioGroup>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <FormControl>
  //         <FormLabel>
  //           What is your ethnicity? (Select all that apply)
  //         </FormLabel>
  //         <Field name="ethnicity">
  //           {({ field }) => (
  //             <CheckboxGroup
  //               colorScheme="teal"
  //               value={field.value}
  //               onChange={(val) => setFieldValue("ethnicity", val)}
  //             >
  //               <Stack direction="column">
  //                 {ethnicityOptions.map((opt) => (
  //                   <Checkbox key={opt} value={opt}>
  //                     {opt}
  //                   </Checkbox>
  //                 ))}
  //               </Stack>
  //             </CheckboxGroup>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <FormControl>
  //         <Field name="puzzleBang" type="checkbox">
  //           {({ field }) => (
  //             <Checkbox {...field} isChecked={field.value}>
  //               I am interested in PuzzleBang
  //             </Checkbox>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <FormControl>
  //         <Field name="mechMania" type="checkbox">
  //           {({ field }) => (
  //             <Checkbox {...field} isChecked={field.value}>
  //               I am interested in MechMania
  //             </Checkbox>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <FormControl>
  //         <FormLabel>
  //           How did you learn about Reflections | Projections?
  //         </FormLabel>
  //         <Field name="heardAbout">
  //           {({ field }) => (
  //             <CheckboxGroup
  //               colorScheme="teal"
  //               value={field.value}
  //               onChange={(val) => setFieldValue("heardAbout", val)}
  //             >
  //               <Stack direction="column">
  //                 {heardAboutOptions.map((opt) => (
  //                   <Checkbox key={opt} value={opt}>
  //                     {opt}
  //                   </Checkbox>
  //                 ))}
  //               </Stack>
  //             </CheckboxGroup>
  //           )}
  //         </Field>
  //       </FormControl>

  //       <HStack>
  //         <Button onClick={() => setPage(0)}>Back</Button>
  //         <Button
  //           colorScheme="teal"
  //           type="submit"
  //           isLoading={values.isSubmitting}
  //           mt={4}
  //         >
  //           Submit
  //         </Button>
  //       </HStack>
  //     </VStack>
  //   ),
  // ];

  return (
    <Box p={6}>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input value={userEmail} isReadOnly disabled />
      </FormControl>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={registrationSchema}
        onSubmit={(values, actions) => {
          // handle submit
          actions.setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <RegisterForm />
      </Formik>
    </Box>
  );
};

const RegisterForm = () => {
  const toast = useToast();
  
  useFormAutosave<RegistrationValues>((values) => {
    console.log(values);
    toast({ title: "Form autosaved", status: "info" });
    //do autosave things
  });

  return (
    <Form>
      {/* {formPages[page]({
              values: { ...values, isSubmitting },
              setFieldValue,
              errors,
              touched,
            })} */}
      <PersonalInfo />
      {/* <Button onClick={() => console.log(props.values)}>Log Values</Button> */}
    </Form>
  );
};

export default Register;
