import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";
import { Resume } from "./ResumeBook";
import { FaLink } from "react-icons/fa6";
import { MdList } from "react-icons/md";

type PortfolioLinksProps = {
  isExpanded: boolean;
  isLargerThan700: boolean;
  resume: Resume;
  baseColor: string;
  onCollapse: () => void;
  onExpand: () => void;
};

const PortfolioLinks = ({
  isLargerThan700,
  isExpanded,
  resume,
  baseColor,
  onCollapse,
  onExpand
}: PortfolioLinksProps) => {
  return (
    <Popover
      placement="bottom"
      closeOnBlur
      onClose={onCollapse}
      isOpen={isExpanded}
      onOpen={onExpand}
    >
      <PopoverTrigger>
        <Button
          isDisabled={resume.portfolios?.length === 0}
          backgroundColor="green.500"
          color="white"
          size="md"
          _hover={{ backgroundColor: "green.300" }}
          onClick={(e) => {
            e.stopPropagation();
            if (isExpanded) {
              onCollapse();
            } else {
              onExpand();
            }
          }}
          leftIcon={isLargerThan700 ? <FaLink /> : undefined}
        >
          {isLargerThan700 ? `Portfolio Links` : <MdList />}
          <Text fontWeight={"normal"} ml={2} color="gray.200" fontSize="sm">
            {resume.portfolios?.length}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        p={3}
        zIndex="999"
        w="fit-content"
        maxW="400px"
        boxShadow="lg"
        border="2px solid"
        borderColor={"gray.200"}
      >
        <PopoverBody>
          <Flex wrap="wrap" justify="flex-start" gap={2}>
            {resume.portfolios?.map((link) => {
              const url = new URL(link);
              const displayURL = url.hostname;
              return (
                <Button
                  key={link}
                  minWidth="120px"
                  backgroundColor={"gray." + baseColor}
                  _hover={{
                    backgroundColor:
                      "gray." +
                      (parseInt(baseColor) > 500
                        ? parseInt(baseColor) - 100
                        : parseInt(baseColor) + 100)
                  }}
                  color={"blue.500"}
                  fontSize={"14px"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(link, "_blank");
                  }}
                >
                  {displayURL}
                </Button>
              );
            })}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PortfolioLinks;
