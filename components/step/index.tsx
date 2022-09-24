import React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  FlexProps,
  Collapse,
} from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";

type Props = {
  step: number;
  title: string;
  text: string;
  status: "todo" | "done" | "current";
} & FlexProps;

export default function Step(props: Props) {
  const { title, text, step, status, children } = props;

  return (
    <Box
      w="100%"
      bg="gray.100"
      borderColor="gray.200"
      borderWidth={3}
      rounded="md"
      opacity={status == "todo" ? 0.6 : 1}
    >
      <Flex align="center" p={6}>
        <Box pr={6} flexShrink={0}>
          {status == "current" && (
            <Flex
              align="center"
              justify="center"
              borderColor="blue.500"
              borderWidth={3}
              rounded="full"
              bg="blue.500"
              w="48px"
              h="48px"
            >
              <Text fontWeight="bold" color="white" fontSize="xl">
                {step}
              </Text>
            </Flex>
          )}

          {status == "todo" && (
            <Flex
              align="center"
              justify="center"
              borderColor="gray.500"
              borderWidth={3}
              rounded="full"
              w="48px"
              h="48px"
            >
              <Text fontWeight="bold" color="gray.500" fontSize="lg">
                {step}
              </Text>
            </Flex>
          )}

          {status == "done" && (
            <Box as={AiFillCheckCircle} color="green.500" w="48px" h="48px" />
          )}
        </Box>

        <Box>
          <Heading size="md" pb={1}>
            {title}
          </Heading>
          <Text>{text}</Text>
        </Box>
      </Flex>

      <Collapse in={status == "current"}>
        <Box bg="white" p={10}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
