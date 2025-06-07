import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  useToast,
  Flex,
  ModalHeader,
  Switch
} from "@chakra-ui/react";
import { Meeting } from "@rp/shared";
import React from "react";
import { QRCode } from "react-qrcode-logo";
import { Moment } from "moment";
import rpLogo from "../../assets/rp_logo.svg";

type QrModalProps = {
  meeting: Meeting;
  startCST: Moment;
};

const QrModal: React.FC<QrModalProps> = ({ meeting, startCST }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const qrCodeRef = React.useRef<QRCode>(null);
  const [qrCodeIsFullURL, setQrCodeIsFullURL] = React.useState(true);
  const toast = useToast();

  function copyQrCode() {
    if (!qrCodeRef.current) {
      return;
    }

    const canvas = (
      qrCodeRef.current as unknown as {
        canvasRef: { current: HTMLCanvasElement };
      }
    ).canvasRef.current;

    canvas.toBlob((blob) => {
      if (blob) {
        toast.promise(
          navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]),
          {
            success: { title: "QR code copied to clipboard" },
            error: { title: "Failed to copy QR code" },
            loading: { title: "Copying QR code..." }
          }
        );
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
        `${meeting.committeeType}_${startCST.format("MM/DD/YYYY")}.png`
    );
  }

  return (
    <>
      <Button colorScheme="gray" variant="solid" onClick={onOpen}>
        QR
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>
            {`Attendance: ${meeting.committeeType} ${startCST.format("MM/DD/YYYY")}`}
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
    </>
  );
};

export default QrModal;
