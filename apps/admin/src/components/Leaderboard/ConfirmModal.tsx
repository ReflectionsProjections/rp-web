import {
  Box,
  Button,
  Card,
  CardBody,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { ExtendedLeaderboardStats } from "./LeaderboardStats";
import { LeaderboardUser } from "@rp/shared";

const ConfirmButton: React.FC<{
  disabled: boolean;
  leaderboardUsers: LeaderboardUser[];
  effectiveNumberAwards: number;
  minimumPointsThreshold: number;
  selectedDate: string;
  updateLeaderboard: () => Promise<void>;
}> = ({
  disabled,
  leaderboardUsers,
  effectiveNumberAwards,
  minimumPointsThreshold,
  updateLeaderboard
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleConfirmNumberAwards = async () => {
    setIsSubmitting(true);
    onClose();
    try {
      await updateLeaderboard();
      toast({
        title: `Successfully awarded merch to ${effectiveNumberAwards} attendees`,
        status: "success",
        duration: 3000,
        isClosable: true
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed awarding merch. Try again soon!";
      toast({
        title: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        isDisabled={disabled}
        size="md"
        aria-label="Submit Leaderboard"
        type="button"
        isLoading={isSubmitting}
      >
        Confirm
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Give Out Today's Prizes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <ExtendedLeaderboardStats
                leaderboardUsers={leaderboardUsers}
                effectiveNumberAwards={effectiveNumberAwards}
                minimumPointsThreshold={minimumPointsThreshold}
              />
            </Box>
          </ModalBody>
          <Card bg="rgba(252, 129, 129, 0.8)" m={4}>
            <CardBody>
              <Text as="b" fontSize="sm">
                Once you click confirm here, this action can't be undone! <br />
                Make sure you only submit this form once per day! <br />
              </Text>
            </CardBody>
          </Card>
          {/* add can't undo + once per day warnings */}
          <ModalFooter>
            <Button
              aria-label="Confirm Submit Leaderboard"
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={() => void handleConfirmNumberAwards()}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmButton;
