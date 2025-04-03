import { Badge, Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

type StaffType = {
  name: string;
  team: string;
}

type AttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  staff?: StaffType
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ isOpen, onClose, staff }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center">
            <Box>{staff?.name}</Box>
            {staff?.team && (
              <Badge ml={2} colorScheme="blue">{staff.team}</Badge>
            )}
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AttendanceModal