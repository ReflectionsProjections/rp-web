import React from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue
} from "@chakra-ui/react";

// Types
interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string;
}

interface SponsorshipComponentProps {
  title?: string;
  subtitle?: string;
  benefits: BenefitItem[];
  ctaText?: string;
  ctaLink?: string;
  contactTitle?: string;
  contactDescription?: string;
}

// Components
const BenefitCard: React.FC<BenefitItem> = ({
  icon,
  title,
  description,
  bgColor
}) => {
  const colorValue = useColorModeValue("gray.100", "gray.700");
  const bg = bgColor || colorValue;
  return (
    <VStack
      spacing={4}
      bg={bg}
      p={8}
      borderRadius="lg"
      textAlign="center"
      align="center"
    >
      <Box fontSize="4xl">{icon}</Box>
      <Heading size="md">{title}</Heading>
      <Text color="gray.600">{description}</Text>
    </VStack>
  );
};

const ContactItem: React.FC<{ placeholder?: boolean }> = ({
  placeholder = true
}) => {
  return (
    <Flex
      bg="gray.300"
      borderRadius="full"
      h={24}
      w={24}
      align="center"
      justify="center"
    >
      {!placeholder && <Text>Contact Info</Text>}
    </Flex>
  );
};

const SponsorshipComponent: React.FC<SponsorshipComponentProps> = ({
  title = "Interested in Sponsoring?",
  subtitle = "Partnering with us offers unique visibility and engagement with our audience. Elevate your brand while supporting our mission.",
  benefits,
  ctaText = "Interest Form",
  ctaLink = "#",
  contactTitle = "Contact Us",
  contactDescription = "RP is a week-long ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod rum."
}) => {
  return (
    <Box maxW="6xl" mx="auto" px={4} py={8}>
      {/* Hero Section */}
      <Box textAlign="center" mb={12}>
        <Heading size="2xl" mb={4}>
          {title}
        </Heading>
        <Text maxW="2xl" mx="auto" fontSize="lg" color="gray.600">
          {subtitle}
        </Text>
      </Box>

      {/* Benefits Section */}
      <Grid templateColumns={["1fr", null, "repeat(3, 1fr)"]} gap={8} mb={12}>
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            bgColor={index === 1 ? "blue.50" : "gray.100"}
          />
        ))}
      </Grid>

      {/* CTA Section */}
      <Box textAlign="center" mb={16}>
        <Button
          as="a"
          href={ctaLink}
          bg="gray.600"
          _hover={{ bg: "gray.700" }}
          color="white"
          px={8}
          py={6}
          borderRadius="full"
        >
          {ctaText}
        </Button>
      </Box>

      {/* Contact Section - MATCHES DESIGN */}
      <Box mt={20}>
        <Heading size="2xl" textAlign="center" mb={16}>
          {contactTitle}
        </Heading>
        <Flex direction={["column", null, "row"]} gap={8} align="flex-start">
          <Box flex="1">
            <Text whiteSpace="pre-line">{contactDescription}</Text>
          </Box>
          <Box flex="2">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {[...Array<unknown>(6)].map((_, index) => (
                <Flex key={index} justify="center">
                  <ContactItem />
                </Flex>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SponsorshipComponent;
