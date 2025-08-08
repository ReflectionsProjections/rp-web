import { Card, CardProps } from "@chakra-ui/react";

const Section = (props: CardProps) => {
  return (
    <Card bg="transparent" boxShadow="none" border="1px solid" {...props} />
  );
};

export default Section;
