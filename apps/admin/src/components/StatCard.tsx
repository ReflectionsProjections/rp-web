import api from "@/util/api";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Transformer, usePolling } from "@rp/shared";
import { GettablePaths } from "@rp/shared/src/api/type-wrapper";
import { AnimatedCounter } from "@rp/shared";

type StatCardProps<T extends GettablePaths> = {
  label: string;
  endpoint: T;
  transformer: Transformer<T>;
  interval?: number;
};

const StatCard = <T extends GettablePaths>({
  label,
  endpoint,
  transformer,
  interval
}: StatCardProps<T>) => {
  const { data, error, isLoading } = usePolling(
    api,
    endpoint,
    transformer,
    interval
  );

  return (
    <Stat
      borderRadius="2xl"
      p={2}
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="whiteAlpha.300"
      boxShadow="md"
      backdropFilter="blur(12px)"
      position="relative"
      _before={{
        content: `""`,
        position: "absolute",
        inset: 0,
        borderRadius: "2xl",
        bgGradient: "linear(to-tr, purple.400, cyan.400)",
        opacity: 0.15,
        filter: "blur(12px)",
        zIndex: -1
      }}
    >
      <StatLabel>{label}</StatLabel>
      <StatNumber>
        {isLoading || error ? (
          "—"
        ) : (
          <AnimatedCounter value={(data ?? 0).toString()} />
        )}
      </StatNumber>
    </Stat>
  );
};

export default StatCard;
