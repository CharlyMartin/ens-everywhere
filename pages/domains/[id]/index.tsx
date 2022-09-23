import React from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertDescription,
  VStack,
  Button,
  Box,
  Flex,
  Text,
  Heading as H,
  Divider,
  AlertIcon,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";

import Heading from "../../../components/heading";
import Step from "../../../components/step";
import Link from "next/link";

export default function Register() {
  const { query } = useRouter();
  const [step, setStep] = React.useState<number>(1);
  const [year, setYear] = React.useState<number>(1);

  if (!query.id) {
    return "No domain provided";
  }

  return (
    <React.Fragment>
      <Heading domain={"Register: " + query.id + ".eth"} />
      <Message />

      <VStack mt={9} gap={6}>
        <Step
          step={1}
          title="Request to register"
          text="Your wallet will open and you will be asked to confirm the first of two transactions required for registration. If the second transaction is not processed within 7 days of the first, you will need to start again from step 1."
          status={getStatus(1)}
        >
          <Flex>
            <Box flexBasis="55%" pr={[12, 16, 24, 32]}>
              <Text fontSize="2xl" fontWeight="light" pb={2}>
                Registration period
              </Text>
              <Text>
                Choose the length you want to register the domain.{" "}
                <strong>
                  By increasing the length, you avoid having to pay gas fees
                  every year to renew.
                </strong>
              </Text>

              <Flex mt={6}>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  mr={1}
                  borderColor="gray.400"
                  onClick={() =>
                    setYear((prev) => {
                      if (prev == 1) return prev;
                      return prev - 1;
                    })
                  }
                >
                  -
                </Button>
                <InputGroup
                  size="md"
                  borderColor="gray.400"
                  flexGrow={1}
                  maxW="360px"
                >
                  <Input bg="white" type="number" value={year} />
                  <InputRightAddon bg="gray.50">
                    {year == 1 ? "Year" : "Years"}
                  </InputRightAddon>
                </InputGroup>
                <Button
                  colorScheme="blue"
                  ml={1}
                  onClick={() => setYear((prev) => prev + 1)}
                >
                  +
                </Button>
              </Flex>
            </Box>

            <Box flexBasis="45%" pl={[12, 16, 24, 32]}>
              <Box bg="gray.50" p={6}>
                <H fontSize="xl" pb={4}>
                  Fee Summary
                </H>

                <Flex justify="space-between" align="baseline" pb={2}>
                  <Text>ENS Registration fee</Text>
                  <Text>5.00 $</Text>
                </Flex>
                <Flex justify="space-between" align="baseline" pb={2}>
                  <Text>Estimated gas fee</Text>
                  <Text>3.00 $</Text>
                </Flex>
                <Flex justify="space-between" align="baseline">
                  <Text>Estimated bulk saving</Text>
                  <Text color="green.500">-0.75 $</Text>
                </Flex>

                <Divider borderColor="gray.300" my={4} borderWidth={1} />

                <Flex justify="space-between" align="baseline">
                  <Text>Estimated total</Text>
                  <Text>6.25 $</Text>
                </Flex>
              </Box>
              <Button
                colorScheme="blue"
                onClick={() => setStep(2)}
                w="100%"
                mt={2}
              >
                Confirm registration
              </Button>
            </Box>
          </Flex>
        </Step>

        <Step
          step={2}
          title="Wait for settlement"
          text="You wait while we bulk together the transactions and settle them on Ethereum."
          status={getStatus(2)}
        >
          <Box flexBasis="55%">
            <Text fontSize="2xl" fontWeight="light" pb={2}>
              1 hour, 20 min, 30 seconds
            </Text>
            <Text width="55%">
              Your transaction has been pooled together with other buyers, and
              is being sent to L1 for settlement. No action further action
              required on your side, come back to this page again once the timer
              is up to see the confirmation of your registration.
            </Text>
          </Box>
          <Button colorScheme="blue" onClick={() => setStep(3)} mt={4}>
            Done
          </Button>
        </Step>

        {step == 3 && (
          <Box w="100%" p={6}>
            <Text fontSize="2xl" fontWeight="light" pb={4}>
              Your registration is complete
            </Text>

            <Link href="/domains">
              <Button colorScheme="blue" as="a" cursor="pointer">
                Go to my domains
              </Button>
            </Link>
          </Box>
        )}
      </VStack>
    </React.Fragment>
  );

  function getStatus(s: number) {
    if (s === step) return "current";
    return step > s ? "done" : "todo";
  }
}

function Message() {
  return (
    <Alert
      status="info"
      p={6}
      rounded="md"
      bg="blue.50"
      borderColor="blue.100"
      borderWidth="1px"
    >
      <AlertIcon mr={6} />
      <AlertDescription fontSize="lg" color="blue.900">
        {
          "You are about to purchase a domain on Optimism. This means you still own your domain on Ethereum, but you'll benefit from cheaper gas fees and being able to trade your domain on Optimism."
        }
      </AlertDescription>
    </Alert>
  );
}
