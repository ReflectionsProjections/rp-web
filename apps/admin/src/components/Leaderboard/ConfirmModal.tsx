import api from "@/util/api";
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
  previewNumberAwards: number;
  effectiveNumberAwards: number;
  updatedLeaderboardPreview: LeaderboardUser[];
  updateLeaderboard: () => void;
}> = ({
  disabled,
  leaderboardUsers,
  previewNumberAwards,
  effectiveNumberAwards,
  updatedLeaderboardPreview,
  updateLeaderboard
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleConfirmNumberAwards = () => {
    setIsSubmitting(true);
    onClose();
    toast.promise(
      api
        //.post("/attendees/awardMerch", { awardMerchPostData })
        .post("/checkin/scan/merch", { qrCode: "todo(): implement api call" })
        .then(() => {
          updateLeaderboard();
          onClose();
        })
        .finally(() => {
          setIsSubmitting(false);
        }),
      {
        success: {
          title: `Successfully awarded merch to ${effectiveNumberAwards} attendees`
        },
        error: { title: `Failed awarding merch. Try again soon!` },
        loading: { title: `Awarding merch...` }
      }
    );
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
                previewNumberAwards={previewNumberAwards}
                effectiveNumberAwards={effectiveNumberAwards}
                updatedLeaderboardPreview={updatedLeaderboardPreview}
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
              onClick={handleConfirmNumberAwards}
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
