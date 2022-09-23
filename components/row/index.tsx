import React from "react";
import { Flex, FlexProps, Text, Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode[];
} & FlexProps;

export default function Row(props: Props) {
  const { children, ...rest } = props;

  if (!children) return null;

  return (
    <Flex justify="space-between" align="baseline" {...rest}>
      <Box flexBasis="20%">{children[0]}</Box>
      <Box flexBasis="25%">{children[1]}</Box>
      <Box flexBasis="15%">{children[2]}</Box>
      <Box flexBasis="40%">{children[3]}</Box>
    </Flex>
  );
}
