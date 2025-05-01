import rpLogo from "../../assets/rp_logo.svg";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
  Heading,
  Text,
  Grid,
  CardFooter,
  Flex,
  Skeleton,
  Switch,
  useToast
  // Checkbox,
} from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import moment from "moment-timezone";
//import { Config } from "../../config.ts";
import React, { useEffect } from "react";
import api from "../../util/api.ts";
import { QRCode } from "react-qrcode-logo";
import { Meeting, path, TeamName } from "@rp/shared";

const readable = "MMMM Do YYYY, h:mm a";

const enum Team {
  Content = "CONTENT",
  Corporate = "CORPORATE",
  Design = "DESIGN",
  Dev = "DEV",
  Full = "FULL TEAM",
  Marketing = "MARKETING",
  Ops = "OPERATIONS"
}

function convertToCST(date: string) {
  return moment.utc(date).tz("America/Chicago");
}

function Meetings() {
  const [meetings, setMeetings] = React.useState<Meeting[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMeeting, setNewMeeting] = React.useState({
    committeeType: Team.Full,
    startTime: ""
  });
  const toast = useToast();

  const showToast = (message: string, error: boolean) => {
    toast({
      title: message,
      status: error ? "error" : "success",
      duration: 9000,
      isClosable: true
    });
  };

  const createMeeting = () => {
    const meetingUTC = {
      ...newMeeting,
      startTime: moment(newMeeting.startTime).utc().format()
    };

    api
      .post("/meetings", meetingUTC)
      .then(() => {
        getMeetings();
        setNewMeeting({
          committeeType: Team.Full,
          startTime: ""
        });
        onClose(); // Close the modal after creating the meeting
      })
      .catch((err) => {
        console.log(err);
        showToast("Error creating meeting", true);
      });
    // Note: api util handles authorization/headers/response/etc
  };

  function getMeetings() {
    api
      .get("/meetings")
      .then(function (response) {
        setMeetings(response.data);
      })
      .catch((err) => {
        console.log(err);
        showToast("Error fetching meetings", true);
      });
  }

  function EditModal({ meeting }: { meeting: Meeting }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedValues, setUpdatedValues] = React.useState(meeting);

    React.useEffect(() => {
      setUpdatedValues(meeting);
    }, [meeting, isOpen]);

    const handleSave = () => {
      const updatedValuesUTC = {
        ...updatedValues,
        startTime: moment(updatedValues.startTime).utc().format()
      };

      const { meetingId, ...valuesWithoutMeetingId } = updatedValuesUTC;
      api
        .put(path("/meetings/:meetingId", { meetingId }), {
          ...valuesWithoutMeetingId
        })
        .then(() => {
          getMeetings();
          onClose();
        })
        .catch((err) => {
          console.log(err);
          showToast("Error updating meeting", true);
        });
    };

    return (
      <>
        <Button
          leftIcon={<EditIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={onOpen}
        >
          Edit
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit meeting</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Select
                defaultValue={meeting.committeeType}
                mb={4}
                onChange={(e) =>
                  setUpdatedValues({
                    ...updatedValues,
                    committeeType: e.target.value as Team
                  })
                }
              >
                <option value={Team.Full}>Full Team</option>
                <option value={Team.Dev}>Dev</option>
                <option value={Team.Design}>Design</option>
                <option value={Team.Content}>Content</option>
                <option value={Team.Corporate}>Corporate</option>
                <option value={Team.Marketing}>Marketing</option>
                <option value={Team.Ops}>Operations</option>
              </Select>
              <Input
                type="datetime-local"
                defaultValue={convertToCST(meeting.startTime).format(
                  "yyyy-MM-DDTHH:mm"
                )}
                mb={4}
                onChange={(e) =>
                  setUpdatedValues({
                    ...updatedValues,
                    startTime: moment(e.target.value).format()
                  })
                }
              />
              <br />
              <Stack alignItems={"center"}>
                <Text fontStyle={"italic"}>
                  edit meeting attendance through Attendance page
                </Text>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  const deleteMeeting = (meetingId: string) => {
    api
      .delete(path("/meetings/:meetingId", { meetingId }))
      .then(() => {
        getMeetings();
      })
      .catch((err) => {
        console.log(err);
        showToast("Error deleting meeting", true);
      });
  };

  function MeetingCard({
    meeting
  }: {
    meeting: { meetingId: string; committeeType: TeamName; startTime: string };
  }) {
    const {
      isOpen: isDeleteOpen,
      onOpen: onOpenDelete,
      onClose: onCloseDelete
    } = useDisclosure();
    const {
      isOpen: isQrCodeOpen,
      onOpen: onOpenQrCode,
      onClose: onCloseQrCode
    } = useDisclosure();
    const qrCodeRef = React.useRef<QRCode>(null);
    const [qrCodeIsFullURL, setQrCodeIsFullURL] = React.useState(true);

    const confirmDelete = () => {
      deleteMeeting(meeting.meetingId);
      onCloseDelete();
    };

    function copyQrCode() {
      if (!qrCodeRef.current) {
        return;
      }
      console.log(qrCodeRef.current);
      const canvas = (
        qrCodeRef.current as unknown as {
          canvasRef: { current: HTMLCanvasElement };
        }
      ).canvasRef.current;
      console.log(canvas);
      canvas.toBlob((blob) => {
        if (blob) {
          console.log(blob);
          navigator.clipboard
            .write([new ClipboardItem({ "image/png": blob })])
            .then(() => {
              alert("Success!");
            })
            .catch(() => {
              alert("Failed to copy QR code.");
            });
        }
      }, "image/png");
    }

    function downloadQrCode() {
      if (!qrCodeRef.current) {
        return;
      }
      qrCodeRef.current.download(
        "png",
        `QR_${qrCodeIsFullURL ? "URL" : "APP"}_ ` +
          `${meeting.committeeType}_${convertToCST(meeting.startTime).format("MM/DD/YYYY")}.png`
      );
    }

    return (
      <Card maxWidth="sm" key={meeting.meetingId}>
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">
              {" "}
              {meeting.committeeType +
                " " +
                convertToCST(meeting.startTime).format("MM/DD")}
            </Heading>
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={
                {
                  [Team.Full]: "pink",
                  [Team.Dev]: "blue",
                  [Team.Design]: "blue",
                  [Team.Content]: "blue",
                  [Team.Corporate]: "blue",
                  [Team.Marketing]: "blue",
                  [Team.Ops]: "blue"
                }[meeting.committeeType]
              }
            >
              {meeting.committeeType + " !"}
            </Badge>
            <Text>{convertToCST(meeting.startTime).format(readable)}</Text>
          </Stack>
        </CardBody>

        <CardFooter>
          <Flex justifyContent="space-between" width="100%">
            <EditModal meeting={meeting} />
            <Button colorScheme="gray" mx="5" onClick={onOpenQrCode}>
              QR
            </Button>
            <Button colorScheme="red" onClick={onOpenDelete}>
              Delete
            </Button>
          </Flex>
        </CardFooter>
        {/* QR CODE MODAL */}
        <Modal isOpen={isQrCodeOpen} onClose={onCloseQrCode} isCentered>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent alignItems="center">
            <ModalHeader>
              Attendance:{" "}
              {meeting.committeeType +
                " " +
                convertToCST(meeting.startTime).format("MM/DD/YYYY")}
            </ModalHeader>
            <QRCode
              ref={qrCodeRef}
              logoImage={rpLogo}
              logoPadding={0.05}
              logoPaddingStyle="circle"
              value={
                qrCodeIsFullURL
                  ? `admin.reflectionsprojections.org/attendance?meetingId=${meeting.meetingId}`
                  : meeting.meetingId
              }
              size={
                window.innerWidth > 400
                  ? window.screen.width * 0.25
                  : window.innerWidth * 0.9
              }
            />
            <Text mt="2" fontSize="small">
              scan with {qrCodeIsFullURL ? "camera" : "R|P app"}
            </Text>
            <Flex mt="3" justifyContent="center" alignItems="center">
              <Text
                position="absolute"
                mr="24"
                fontSize={!qrCodeIsFullURL ? "lg" : "unset"}
                fontWeight={!qrCodeIsFullURL ? "bold" : "normal"}
              >
                APP
              </Text>
              <Switch
                alignSelf="center"
                defaultChecked={qrCodeIsFullURL}
                onChange={() => setQrCodeIsFullURL(!qrCodeIsFullURL)}
              />
              <Text
                position="absolute"
                ml="24"
                fontSize={qrCodeIsFullURL ? "lg" : "unset"}
                fontWeight={qrCodeIsFullURL ? "bold" : "normal"}
              >
                URL
              </Text>
            </Flex>
            <Flex justifyContent="center" gap="5" width="100%">
              <Button colorScheme="blue" m="5" onClick={copyQrCode}>
                Copy
              </Button>
              <Button colorScheme="blue" m="5" onClick={downloadQrCode}>
                Download
              </Button>
            </Flex>
          </ModalContent>
        </Modal>
        {/* DELETE MEETING MODAL */}
        <Modal isOpen={isDeleteOpen} onClose={onCloseDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this meeting?</ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                Delete
              </Button>
              <Button onClick={onCloseDelete}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    );
  }

  useEffect(() => {
    getMeetings();
  }, []); // load in meetings on load

  // overall return! (Meetings page)
  return (
    <Box flex="1" minW="70vw" p={4}>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Meetings</Heading>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new meeting</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Select
              value={newMeeting.committeeType}
              onChange={(e) =>
                setNewMeeting({
                  ...newMeeting,
                  committeeType: e.target.value as Team
                })
              }
              mb={4}
            >
              <option value={Team.Full}>Full Team</option>
              <option value={Team.Dev}>Dev</option>
              <option value={Team.Design}>Design</option>
              <option value={Team.Content}>Content</option>
              <option value={Team.Corporate}>Corporate</option>
              <option value={Team.Marketing}>Marketing</option>
              <option value={Team.Ops}>Operations</option>
            </Select>
            <Input
              type="datetime-local"
              value={newMeeting.startTime}
              onChange={(e) =>
                setNewMeeting({ ...newMeeting, startTime: e.target.value })
              }
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createMeeting}>
              Create meeting
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <br />
      {/* {meetings.length === 0 ? <Button leftIcon={<RepeatIcon />} colorScheme="gray" onClick={getMeetings}>Refresh</Button> : */}
      <Grid
        templateColumns={{
          base: "repeat(1, fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        }}
        justifyItems="center"
        gap={6}
      >
        {/* \/ accesses `meetings` object -> state dependency :)*/}
        {meetings && meetings.length
          ? meetings
              .sort((a: Meeting, b: Meeting) =>
                b.startTime.localeCompare(a.startTime)
              )
              .map(
                (meeting: {
                  meetingId: string;
                  committeeType: TeamName;
                  startTime: string;
                }) => <MeetingCard meeting={meeting} key={meeting.meetingId} />
              )
          : Array.from({ length: 8 }).map((_value, i) => (
              <Skeleton key={i}>
                <MeetingCard
                  meeting={{
                    meetingId: "blank",
                    committeeType: Team.Full,
                    startTime: "blank"
                  }}
                />
              </Skeleton>
            ))}
      </Grid>
      <Button
        onClick={onOpen}
        colorScheme="gray"
        position="fixed"
        bottom="20px"
        left="20px"
        borderRadius="md"
        p={4}
        zIndex="1000"
        bg="gray.300"
        width="30px"
        height="30px"
      >
        <AddIcon />
      </Button>
    </Box>
  );
}

export default Meetings;
