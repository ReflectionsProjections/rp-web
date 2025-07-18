import { Box, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { Resume } from "../routes/ResumeBook/ResumeBook";

type PortfolioLinksProps = {
  isMediumScreen?: boolean;
  resume: Resume;
  showPlaceholders?: boolean;
};

const normalizeHostname = (host: string) => host.replace(/^www\./, "");

const ICONS: Record<string, React.ElementType> = {
  "github.com": FaGithub,
  "linkedin.com": FaLinkedin,
  other: FaGlobe
};

const ICON_COLORS: Record<string, string> = {
  "github.com": "gray.100",
  "linkedin.com": "gray.100",
  other: "gray.500"
};

const ICON_BACKGROUND: Record<string, string> = {
  "github.com": "gray.600",
  "linkedin.com": "blue.500",
  other: "gray.300"
};

const getIconForPortfolio = (portfolio: string): React.ReactElement => {
  const url = new URL(portfolio);
  const host = normalizeHostname(url.hostname);
  const IconComponent = ICONS[host] || ICONS["other"];
  return <IconComponent />;
};

const PortfolioLinks = ({
  resume,
  isMediumScreen,
  showPlaceholders = true
}: PortfolioLinksProps) => {
  const portfolios = useMemo(() => {
    return resume.portfolios?.sort((a, b) => {
      const aHost = normalizeHostname(new URL(a).hostname);
      const bHost = normalizeHostname(new URL(b).hostname);
      if (aHost === "linkedin.com") return -1;
      if (bHost === "linkedin.com") return 1;
      if (aHost === "github.com") return -1;
      if (bHost === "github.com") return 1;
      return aHost.localeCompare(bHost);
    });
  }, [resume.portfolios]);

  const placeholderCount = Math.max(0, 3 - (portfolios?.length ?? 0));

  return (
    <Flex display="flex" gap={1}>
      {portfolios?.map((portfolio) => {
        const host = normalizeHostname(new URL(portfolio).hostname);
        return (
          <Tooltip
            key={portfolio}
            label={host}
            placement="top"
            hasArrow
            bg="gray.700"
            color="white"
            fontSize="md"
            borderRadius="md"
            p={1}
            px={2}
            zIndex="999"
          >
            <IconButton
              aria-label={`Open ${host}`}
              icon={getIconForPortfolio(portfolio)}
              size={
                isMediumScreen
                  ? {
                      base: "35px",
                      lg: "40px"
                    }
                  : "md"
              }
              w={
                isMediumScreen
                  ? {
                      base: "35px",
                      lg: "40px"
                    }
                  : "40px"
              }
              height={
                isMediumScreen
                  ? {
                      base: "32px",
                      lg: "40px"
                    }
                  : "40px"
              }
              fontSize={
                isMediumScreen
                  ? {
                      base: "md",
                      lg: "xl"
                    }
                  : "20px"
              }
              variant="solid"
              backgroundColor={ICON_BACKGROUND[host] || "gray.400"}
              _hover={{
                backgroundColor: ICON_BACKGROUND[host] || "gray.500"
              }}
              color={ICON_COLORS[host] || "white"}
              onClick={(e) => {
                e.stopPropagation();
                window.open(portfolio, "_blank");
              }}
            />
          </Tooltip>
        );
      })}

      {showPlaceholders &&
        Array.from({ length: placeholderCount }, (_, i) => (
          <Box
            key={i}
            w={
              isMediumScreen
                ? {
                    base: "35px",
                    lg: "40px"
                  }
                : "40px"
            }
            height={
              isMediumScreen
                ? {
                    base: "32px",
                    lg: "40px"
                  }
                : "40px"
            }
            backgroundColor="gray.300"
            opacity={0.4}
            borderRadius="md"
          />
        ))}
    </Flex>
  );
};

export default PortfolioLinks;
