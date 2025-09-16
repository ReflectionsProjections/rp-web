import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Checkbox,
  Flex,
  Button,
  useToast
} from "@chakra-ui/react";
import { BasicAttendee } from "@/routes/pages/Checkin";
import { api, path, Tier, usePolling } from "@rp/shared";

const ITEMS = {
  TIER1: "T-Shirt",
  TIER2: "Keychain",
  TIER3: "Car Squishie",
  TIER4: "Beanie"
};

type MerchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAttendee: BasicAttendee | null;
};

const MerchModal: React.FC<MerchModalProps> = ({
  isOpen,
  onClose,
  selectedAttendee
}) => {
  const { data, update } = usePolling(
    path("/attendee/redeemable/:userId", {
      userId: selectedAttendee?.userId ?? ""
    })
  );
  const [merchToRedeem, setMerchToRedeem] = useState<
    Partial<Record<Tier, boolean>>
  >({});
  const toast = useToast();

  // Handle merch redemption
  const handleMerchRedemption = () => {
    if (!selectedAttendee) return;

    const itemsToRedeem = Object.entries(merchToRedeem)
      .filter(([, selected]) => selected)
      .map(([item]) => item as Tier);

    if (itemsToRedeem.length === 0) {
      onClose();
      return;
    }

    // Redeem each selected item
    const redeemPromises = itemsToRedeem.map((tier) => {
      return api.post("/attendee/redeem", {
        userId: selectedAttendee.userId,
        tier
      });
    });

    toast.promise(
      Promise.all(redeemPromises).then(() => update()),
      {
        success: {
          title: "Merch redeemed successfully!",
          description: `Redeemed: ${itemsToRedeem.map((tier) => ITEMS[tier]).join(", ")}`
        },
        error: { title: "Failed to redeem merch" },
        loading: { title: "Redeeming merch" }
      }
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Redeem Merch for {selectedAttendee?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {!!data?.redeemedTiers.length && (
            <>
              <Text mb={2} fontWeight="bold">
                Already Redeemed:
              </Text>
              <VStack align="start" spacing={2} mb={4}>
                {data.redeemedTiers.map((tier) => (
                  <Text key={tier} color="green.600">
                    ✓ {ITEMS[tier]}
                  </Text>
                ))}
              </VStack>
            </>
          )}

          {data?.redeemableTiers?.length ? (
            <>
              <Text mb={4}>
                This attendee is eligible for the following merch items. Select
                which items to redeem:
              </Text>

              <VStack align="start" spacing={3}>
                {data.redeemableTiers.map((tier) => (
                  <Checkbox
                    key={tier}
                    isChecked={merchToRedeem[tier]}
                    onChange={(e) =>
                      setMerchToRedeem((prev) => ({
                        ...prev,
                        [tier]: e.target.checked
                      }))
                    }
                  >
                    {ITEMS[tier]}
                  </Checkbox>
                ))}
              </VStack>
            </>
          ) : (
            <Text>
              {selectedAttendee?.name} has no merch items available for
              redemption.
            </Text>
          )}

          <Flex mt={6} gap={3}>
            {!!data?.redeemableTiers?.length && (
              <Button
                colorScheme="blue"
                onClick={() => void handleMerchRedemption()}
                isDisabled={
                  Object.values(merchToRedeem).length === 0 ||
                  Object.values(merchToRedeem).every((selected) => !selected)
                }
              >
                Redeem Selected
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                onClose();
              }}
            >
              {data?.redeemableTiers?.length ? "Skip Merch" : "Close"}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MerchModal;
