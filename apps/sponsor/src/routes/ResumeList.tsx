import useWindowWidth from "@/util/use-window-width-hook";
import {
  Box,
  Grid,
  GridItem,
  Icon,
  Skeleton,
  Stack,
  Text,
  useMediaQuery,
  VStack
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  FaBook,
  FaFileDownload,
  FaGraduationCap,
  FaUniversity,
  FaUser
} from "react-icons/fa";
import {
  FaArrowDownWideShort,
  FaArrowUpWideShort,
  FaUserTie
} from "react-icons/fa6";
import { Resume } from "./ResumeBook/ResumeBook";
import ResumeListBox from "./ResumeListBox";

interface ResumeListProps {
  loading: boolean;
  resumes: Resume[];
  selectedResumes: string[];
  openResume: (resume: Resume) => void;
  toggleResume: (resumeId: string) => void;
  baseColor: string;
  sortByColumn?: SingleCol;
  sortDirection: "asc" | "desc";
  onSortByColumn: (column: SingleCol) => void;
}

const TableColumn: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  return (
    <Box
      position="relative"
      display="flex"
      alignItems={"center"}
      gap={1.5}
      minWidth="50px"
      cursor="default"
      onClick={onClick}
      _hover={{
        color: "gray.600",
        cursor: "pointer"
      }}
    >
      {children}
    </Box>
  );
};

export type SingleCol =
  | "checkbox"
  | "name"
  | "major"
  | "degree"
  | "graduationYear"
  | "actions"
  | "data"
  | "links"
  | "resume";

type ColumnProps = {
  id: SingleCol;
  sortColId?: SingleCol;
  sortDirection?: "asc" | "desc";
  selectedSingleCol?: SingleCol;
  name: string;
  icon: React.ElementType;
  boxSize?: number;
  onSort?: (col: SingleCol) => void;
};

const Column = ({
  id,
  sortColId,
  sortDirection,
  name,
  icon,
  boxSize = 3,
  onSort
}: ColumnProps) => {
  return (
    <GridItem
      _groupHover={{
        cursor: onSort ? "pointer" : undefined
      }}
      onClick={() => {
        if (onSort) {
          onSort(id);
        }
      }}
    >
      <TableColumn
        onClick={() => {
          if (onSort) {
            onSort(id);
          }
        }}
      >
        <Icon
          as={icon}
          boxSize={boxSize}
          color="gray.600"
          _groupHover={{
            color: onSort ? "gray.400" : undefined
          }}
        />
        <Text
          fontWeight="bold"
          userSelect="none"
          fontSize={{
            base: "sm",
            lg: "md"
          }}
        >
          {name}
        </Text>
        {sortColId === id && (
          <Icon
            as={
              sortDirection === "asc"
                ? FaArrowUpWideShort
                : FaArrowDownWideShort
            }
            boxSize={4}
            color="gray.600"
            ml={2}
          />
        )}
      </TableColumn>
    </GridItem>
  );
};

const ResumeList: React.FC<ResumeListProps> = ({
  loading,
  resumes,
  selectedResumes,
  openResume,
  toggleResume,
  baseColor,
  sortByColumn,
  sortDirection,
  onSortByColumn
}) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navbarTop, setNavbarTop] = useState(0);

  // const viewColor = "gray."+baseColor;
  const bgColor =
    parseInt(baseColor) < 500
      ? "gray." + (parseInt(baseColor) - 100)
      : "gray." + (100 + parseInt(baseColor));
  // const selectViewColor = useColorModeValue("gray.300","gray.600")

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      setNavbarTop(navbar.offsetTop);
    }
  }, [navbarTop, baseColor]);

  const [screenIsLarge] = useMediaQuery("(min-width: 800px)");

  const width = useWindowWidth();
  const screenIsLargeButton = width >= 1200;

  return (
    <VStack
      id="resume-list"
      display="flex"
      flexDirection={"column"}
      spacing="0"
      paddingTop={"0px"}
      w="100%"
      maxW="100%"
      h="100%"
      maxH="100%"
      borderRadius={"lg"}
      border="1px solid"
      borderColor="gray.300"
      flex={1}
      align="flex-start"
      overflowX="auto"
    >
      <Box
        ref={navbarRef}
        position={"relative"}
        padding="10px"
        pr="20px"
        width="100%"
        minW="600px"
        zIndex="10"
        bgColor="gray.300"
      >
        <Grid
          templateColumns={
            screenIsLarge
              ? "80px 1fr 1fr 1.5fr 1fr 1.2fr 100px"
              : "60px minmax(0, 1.5fr) minmax(0, 1fr) 100px"
          }
          gap={4}
          alignItems="center"
        >
          <GridItem></GridItem>
          <>
            {screenIsLarge ? (
              <>
                <Column
                  id="name"
                  name="Name"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaUser}
                  onSort={onSortByColumn}
                />
                <Column
                  id="degree"
                  name="Degree"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaUniversity}
                  onSort={onSortByColumn}
                />
                <Column
                  id="major"
                  name="Major"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaBook}
                  onSort={onSortByColumn}
                />
                <Column
                  id="graduationYear"
                  name="Graduation"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaGraduationCap}
                  boxSize={4}
                  onSort={onSortByColumn}
                />
                <Column
                  id="links"
                  name="Links"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaGraduationCap}
                  boxSize={4}
                />
                <Column
                  id="resume"
                  name="Resume"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaUserTie}
                  boxSize={4}
                />
              </>
            ) : (
              <>
                <Column
                  id="name"
                  name="Student"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaUser}
                  onSort={onSortByColumn}
                />
                <Column
                  id="links"
                  name="Links"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaFileDownload}
                  boxSize={4}
                  onSort={onSortByColumn}
                />
                <Column
                  id="resume"
                  name="Resume"
                  sortColId={sortByColumn}
                  sortDirection={sortDirection}
                  icon={FaUserTie}
                  boxSize={4}
                />
              </>
            )}
          </>
        </Grid>
      </Box>
      {loading ? (
        <Stack spacing={1} mt={1}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              height="80px" // roughly the height of a ResumeListBox row
              borderRadius="lg"
            />
          ))}
        </Stack>
      ) : (
        <VStack w="100%" gap={0} minW="600px" h="100%" overflowY="auto">
          {resumes.map((resume) => {
            return (
              <ResumeListBox
                resume={resume}
                key={resume.id}
                isSelected={selectedResumes.includes(resume.id)}
                screenIsLarge={screenIsLarge}
                screenIsLargeButton={screenIsLargeButton}
                openResume={openResume}
                toggleResume={toggleResume}
                baseColor={baseColor}
                bgColor={bgColor}
              />
            );
          })}
        </VStack>
      )}
    </VStack>
  );
};

export default ResumeList;
