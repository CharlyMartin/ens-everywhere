import { Flex, Box, Heading as H, Divider } from "@chakra-ui/react";
// import cn from "classnames";

type Props = {
  domain: string;
  // status?: "available" | "unavailable" | "owned";
  // children?: React.ReactNode;
};

export default function Heading(props: Props) {
  const { domain } = props;

  return (
    <Box>
      <Flex justify="space-between" align="center" pt={10}>
        {/* <Flex align="flex-end"> */}
        <H size="xl" pr={3} lineHeight="none">
          {domain}
        </H>

        {/* {status && (
            <Badge
              fontSize="0.85rem"
              colorScheme={cn(
                status == "available" && "green",
                status == "unavailable" && "red",
                status == "owned" && "blue"
              )}
            >
              {status}
            </Badge>
          )}
        </Flex>
        {children && <Flex align="center">{children}</Flex>} */}
      </Flex>

      <Divider borderColor="gray.300" my={4} borderWidth={1} />
    </Box>
  );
}
