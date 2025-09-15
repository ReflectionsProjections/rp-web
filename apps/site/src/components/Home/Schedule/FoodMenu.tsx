import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Text,
  Badge,
  HStack
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface FoodItem {
  imageUrl?: string;
  name: string;
  dietaryRestrictions: string[];
}

interface FoodMenuData {
  items: FoodItem[];
  menuUrl?: string;
}

export function parseFoodMenu(description: string): FoodMenuData | null {
  if (!description.includes(":food:")) {
    return null;
  }

  const lines = description.split("\n");
  const foodStartIndex = lines.findIndex((line) => line.trim() === ":food:");

  if (foodStartIndex === -1) {
    return null;
  }

  const items: FoodItem[] = [];
  let menuUrl: string | undefined;

  for (let i = foodStartIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith(":")) {
      if (line.startsWith(":menu:")) {
        menuUrl = line.replace(":menu:", "").trim();
      }
      break;
    }

    if (!line) continue;

    const parts = line.split("|").map((part) => part.trim());
    if (parts.length >= 2) {
      let imageUrl: string | undefined;
      let name: string;
      let restrictions: string;

      if (parts.length === 3) {
        // Format: imageUrl | name | restrictions
        [imageUrl, name, restrictions] = parts;
      } else {
        // Format: name | restrictions (no image)
        [name, restrictions] = parts;
      }

      const dietaryRestrictions = restrictions.split(",").map((r) => r.trim());

      items.push({
        imageUrl,
        name,
        dietaryRestrictions
      });
    }
  }

  return items.length > 0 ? { items, menuUrl } : null;
}

function getDietaryBadgeColor(restriction: string): string {
  const lowerRestriction = restriction.toLowerCase();

  if (lowerRestriction.includes("veg")) return "green";
  if (lowerRestriction.includes("contains")) return "orange";

  return "gray";
}

export function FoodMenuGrid({ foodMenu }: { foodMenu: FoodMenuData }) {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily="ProRacing"
          color="white"
        >
          Food Menu
        </Text>
        {foodMenu.menuUrl && (
          <Link
            href={foodMenu.menuUrl}
            isExternal
            color="blue.300"
            _hover={{ color: "blue.200" }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Text fontFamily={"Magistral"}>Full Menu</Text>
            <Icon as={FaExternalLinkAlt} boxSize={3} />
          </Link>
        )}
      </Flex>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)"
        }}
        gap={4}
        mb={6}
      >
        {foodMenu.items.map((item, index) => (
          <GridItem key={index}>
            <Box
              bg="whiteAlpha.200"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)" }}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                width="100%"
                height="160px"
                objectFit="cover"
                fallback={
                  <Box width="100%" height="160px" bg="rgba(41, 41, 41, 0.9)" />
                }
              />
              <Box p={4}>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  fontFamily="Magistral"
                  color="white"
                  mb={2}
                >
                  {item.name}
                </Text>
                <HStack flexWrap="wrap" rowGap={2.5}>
                  {item.dietaryRestrictions.map((restriction, idx) => (
                    <Badge
                      key={idx}
                      fontFamily={"Magistral"}
                      colorScheme={getDietaryBadgeColor(restriction)}
                      variant="solid"
                      fontSize="xs"
                      px={2}
                      py={1}
                    >
                      {restriction}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default function FoodMenu({ description }: { description: string }) {
  const foodMenu = parseFoodMenu(description);

  if (!foodMenu) {
    return null;
  }

  return <FoodMenuGrid foodMenu={foodMenu} />;
}
