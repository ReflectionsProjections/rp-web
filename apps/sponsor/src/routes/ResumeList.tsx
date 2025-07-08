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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaBook, FaGraduationCap, FaUniversity, FaUser } from "react-icons/fa";
import { FaArrowDownWideShort, FaArrowUpWideShort } from "react-icons/fa6";
import { Resume } from "./ResumeBook";
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

const ResizableColumn: React.FC<{
  width: number;
  onResize: (width: number) => void;
  onClick: () => void;
  children: React.ReactNode;
  canResize: boolean;
  baseColor: string;
}> = ({ width, onResize, onClick, children, canResize, baseColor }) => {
  const startXRef = useRef<number | null>(null);
  const selectViewColor = "gray." + (parseInt(baseColor) - 100);
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      startXRef.current = e.clientX;

      const handleMouseMove = (e: MouseEvent) => {
        if (startXRef.current !== null) {
          const diff = e.clientX - startXRef.current;
          onResize(Math.max(50, width + diff));
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [width, onResize]
  );

  return (
    <Box
      position="relative"
      display="flex"
      alignItems={"center"}
      gap={1.5}
      width={`${width}px`}
      minWidth="50px"
      cursor="default"
      onClick={onClick}
    >
      {children}
      {canResize ? (
        <Box
          position="absolute"
          right="-6px"
          top="0"
          height="100%"
          width="3px"
          cursor="col-resize"
          backgroundColor={"gray.500"}
          transition="all 0.3s"
          _hover={{
            backgroundColor: { selectViewColor },
            height: "120%",
            top: "-10%"
          }}
          onMouseDown={handleMouseDown}
          zIndex="1"
        />
      ) : null}
    </Box>
  );
};

const INITIAL_COLUMN_WIDTHS = {
  checkbox: 50,
  name: 175,
  major: 300,
  degree: 150,
  graduationYear: 300,
  actions: 400,
  data: 300
};

const MIN_COLUMN_WIDTHS = {
  checkbox: 50,
  name: 80,
  degree: 80,
  major: 100,
  graduationYear: 120,
  actions: 400,
  data: 300
};

export type SingleCol = keyof typeof INITIAL_COLUMN_WIDTHS;

type ColumnProps = {
  id: SingleCol;
  sortColId?: SingleCol;
  sortDirection?: "asc" | "desc";
  selectedSingleCol?: SingleCol;
  name: string;
  icon: React.ElementType;
  boxSize?: number;
  columnWidths: typeof INITIAL_COLUMN_WIDTHS;
  onResize: (id: SingleCol, width: number) => void;
  onSort: (col: SingleCol) => void;
  baseColor: string;
};

const Column = ({
  id,
  sortColId,
  sortDirection,
  name,
  icon,
  boxSize = 3,
  columnWidths,
  onResize,
  onSort,
  baseColor
}: ColumnProps) => {
  return (
    <GridItem
      _hover={{
        cursor: "pointer"
      }}
      onClick={() => {
        console.log("Clicked");
        console.log("sortDirection", sortDirection);
        if (onSort) {
          onSort(id);
        }
      }}
    >
      <ResizableColumn
        width={columnWidths[id]}
        onResize={(width) => onResize(id, width)}
        onClick={() => {
          if (onSort) {
            onSort(id);
          }
        }}
        canResize={true}
        baseColor={baseColor}
      >
        <Icon as={icon} boxSize={boxSize} color="gray.600" />
        <Text fontWeight="bold">{name}</Text>
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
      </ResizableColumn>
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
  const [columnWidths, setColumnWidths] = useState(INITIAL_COLUMN_WIDTHS);

  const navbarRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
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

    const handleScroll = () => {
      if (navbar) {
        const scrollY = window.scrollY;
        setIsSticky(scrollY > navbarTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarTop, baseColor]);

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    setColumnWidths(INITIAL_COLUMN_WIDTHS);
  }, []);

  const [isDragging] = useState(false);

  const handleResize = useCallback(
    (column: keyof typeof columnWidths, newWidth: number) => {
      setColumnWidths((prev) => ({
        ...prev,
        [column]: Math.max(newWidth, MIN_COLUMN_WIDTHS[column] || 50)
      }));
    },
    []
  );

  return (
    <VStack
      spacing="0"
      align="stretch"
      paddingTop={isSticky ? `${navbarRef.current?.offsetHeight}px` : "0px"}
      userSelect={isDragging ? "none" : "auto"}
    >
      <Box
        ref={navbarRef}
        position={isSticky ? "fixed" : "relative"}
        top={isSticky ? "0" : undefined}
        overflow="hidden"
        padding="4"
        background={bgColor}
        width="100%"
        zIndex="10"
        borderTopRadius={"lg"}
        bgColor="gray.300"
      >
        <Grid
          templateColumns={
            isLargerThan700
              ? `${columnWidths.checkbox}px ${columnWidths.name}px ${columnWidths.degree}px ${columnWidths.major}px ${columnWidths.graduationYear}px ${columnWidths.actions}px`
              : `${columnWidths.checkbox}px ${columnWidths.data}px ${columnWidths.actions}px`
          }
          gap={4}
          alignItems="center"
        >
          <GridItem></GridItem>
          {isLargerThan700 ? (
            <>
              <Column
                id="name"
                name="Name"
                sortColId={sortByColumn}
                sortDirection={sortDirection}
                icon={FaUser}
                columnWidths={columnWidths}
                onResize={handleResize}
                baseColor={baseColor}
                onSort={onSortByColumn}
              />
              <Column
                id="degree"
                name="Degree"
                sortColId={sortByColumn}
                sortDirection={sortDirection}
                icon={FaUniversity}
                columnWidths={columnWidths}
                onResize={handleResize}
                baseColor={baseColor}
                onSort={onSortByColumn}
              />
              <Column
                id="major"
                name="Major"
                sortColId={sortByColumn}
                sortDirection={sortDirection}
                icon={FaBook}
                columnWidths={columnWidths}
                onResize={handleResize}
                baseColor={baseColor}
                onSort={onSortByColumn}
              />
              <Column
                id="graduationYear"
                name="Graduation"
                sortColId={sortByColumn}
                sortDirection={sortDirection}
                icon={FaGraduationCap}
                boxSize={4}
                columnWidths={columnWidths}
                onResize={handleResize}
                baseColor={baseColor}
                onSort={onSortByColumn}
              />
            </>
          ) : (
            <GridItem>
              <ResizableColumn
                width={columnWidths.data}
                onResize={(width) => handleResize("data", width)}
                onClick={() => onSortByColumn("data")}
                canResize={true}
                baseColor={baseColor}
              >
                <Text>Data</Text>
              </ResizableColumn>
            </GridItem>
          )}
          <GridItem>
            <ResizableColumn
              width={columnWidths.actions}
              onResize={(width) => handleResize("actions", width)}
              onClick={() => onSortByColumn("actions")}
              canResize={false}
              baseColor={baseColor}
            >
              <Icon as={FaGraduationCap} boxSize={4} color="gray.600" />
              <Text fontWeight={"bold"}>Actions</Text>
            </ResizableColumn>
          </GridItem>
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
        <VStack
          w="100%"
          gap={0}
          maxH="70vh"
          overflowY="auto"
          borderBottomRadius={"lg"}
          border="1px solid"
          borderColor="gray.300"
        >
          {resumes.map((resume) => {
            return (
              <ResumeListBox
                resume={resume}
                key={resume.id}
                isSelected={selectedResumes.includes(resume.id)}
                columnWidths={columnWidths}
                isLargerThan700={isLargerThan700}
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
