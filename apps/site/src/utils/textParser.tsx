import { Text, Link } from "@chakra-ui/react";
import { ReactNode } from "react";

export const parseRichText = (text: string): ReactNode => {
  // First, handle bold text by splitting and processing
  const boldParts = text.split(/(\*\*.*?\*\*)/);

  const processedParts = boldParts.map((part, index) => {
    // Check if this part is bold text
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);

      // Check if the bold text contains a link
      if (boldText.includes("[") && boldText.includes("](")) {
        return (
          <Text as="span" key={`bold-${index}`} fontWeight="bold">
            {processLinks(boldText, index)}
          </Text>
        );
      }

      return (
        <Text as="span" key={`bold-${index}`} fontWeight="bold">
          {boldText}
        </Text>
      );
    }

    // For non-bold parts, process links
    if (part.includes("[") && part.includes("](")) {
      return processLinks(part, index);
    }

    return part;
  });

  return processedParts;
};

const processLinks = (text: string, parentIndex: number): ReactNode => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let linkIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the link
    parts.push(
      <Link
        key={`link-${parentIndex}-${linkIndex}`}
        href={match[2]}
        color="blue.300"
        textDecoration="underline"
        _hover={{ color: "blue.200" }}
        isExternal
      >
        {match[1]}
      </Link>
    );

    lastIndex = match.index + match[0].length;
    linkIndex++;
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
};
