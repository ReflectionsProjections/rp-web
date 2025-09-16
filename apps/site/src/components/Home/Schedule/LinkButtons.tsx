import { Box, Button, Icon, Wrap, WrapItem } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { parseLinks, LinkData } from "./link-utils";

export function LinkButtonsGrid({ linkData }: { linkData: LinkData }) {
  return (
    <Box>
      <Wrap spacing={3}>
        {linkData.items.map((item, index) => (
          <WrapItem key={index}>
            <Button
              as="a"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="solid"
              bg="white"
              color="black"
              borderColor="gray.300"
              _hover={{
                bg: "gray.100",
                color: "black",
                borderColor: "gray.400",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              transition="all 0.2s ease"
              rightIcon={<Icon as={FaExternalLinkAlt} boxSize={3} />}
            >
              {item.text}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

export default function LinkButtons({ description }: { description: string }) {
  const linkData = parseLinks(description);

  if (!linkData) {
    return null;
  }

  return <LinkButtonsGrid linkData={linkData} />;
}
