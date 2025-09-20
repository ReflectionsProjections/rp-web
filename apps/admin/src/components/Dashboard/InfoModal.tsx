import { useMirrorStyles } from "@/styles/Mirror";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  UseDisclosureReturn
} from "@chakra-ui/react";
import { Display } from "@rp/shared";

export default function InfoModal({
  display: { id, metadata, lastUpdate },
  time,
  identify,
  reload,
  messageModalDisclosure
}: {
  display: Display;
  time: number;
  identify: () => void;
  reload: () => void;
  messageModalDisclosure: UseDisclosureReturn;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mirrorStyle = useMirrorStyles();

  return (
    <>
      <Button variant="outline" colorScheme="teal" onClick={onOpen}>
        Info
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent sx={mirrorStyle}>
          <ModalHeader>Display #{id} Info</ModalHeader>
          <ModalBody>
            {metadata ? (
              <Stack spacing={2}>
                <Text>
                  Last updated: {Math.round((time - lastUpdate) / 1000)}s ago
                </Text>
                <Text>Device unix time: {metadata.unixTime}</Text>
                <Text>
                  Resolution: {metadata.screenWidth}x{metadata.screenHeight}
                </Text>
                <Text>Device Pixel Ratio: {metadata.devicePixelRatio}</Text>
                <Text>Platform: {metadata.platform}</Text>
                <Text>User Agent: {metadata.userAgent}</Text>
              </Stack>
            ) : (
              <Text>Display metadata is unavailable</Text>
            )}
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Stack flexDirection={"row"} spacing={2}>
              <Button variant="outline" colorScheme="blue" onClick={identify}>
                Identify
              </Button>
              <Button variant="outline" colorScheme="green" onClick={reload}>
                Reload
              </Button>
              <Button
                variant="outline"
                colorScheme="orange"
                onClick={() => {
                  onClose();
                  messageModalDisclosure.onOpen();
                }}
              >
                Message
              </Button>
              <Button
                textAlign={"center"}
                variant={"outline"}
                colorScheme="red"
                onClick={onClose}
              >
                Close
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
