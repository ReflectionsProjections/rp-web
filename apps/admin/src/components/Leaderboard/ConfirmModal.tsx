import api from "@/util/api";
import {
    Box,
    Button,
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
import LeaderboardStats from "./LeaderboardStats";
import { LeaderboardUser } from "@rp/shared";

const ConfirmButton: React.FC<{
    disabled: boolean;
    leaderboardUsers: LeaderboardUser[];
    effectiveNumberAwards: number;
    updatedLeaderboardPreview: LeaderboardUser[];
    updateLeaderboard: () => void;
}> = ({ disabled, leaderboardUsers, effectiveNumberAwards, updatedLeaderboardPreview, updateLeaderboard }) => {
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
                            <LeaderboardStats leaderboardUsers={leaderboardUsers} effectiveNumberAwards={effectiveNumberAwards} updatedLeaderboardPreview={updatedLeaderboardPreview} showExtendedStats />
                        </Box>
                    </ModalBody>
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
