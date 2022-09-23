import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  InputGroup,
  InputRightAddon,
  Text,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const [domain, setDomain] = React.useState<string>("");
  const [available, setAvailable] = React.useState<boolean>();

  const { push } = useRouter();

  return (
    <Box pt={24}>
      <Heading size="4xl">
        Register your native L2 <br /> ENS domain
      </Heading>

      <br />
      <br />

      <Flex as="form" onSubmit={handleSubmit}>
        <Box w="100%" maxW="640px">
          <InputGroup
            size="lg"
            borderColor="gray.300"
            flexGrow={1}
            fontSize="xl"
            width="100%"
          >
            <Input
              bg="white"
              value={domain}
              onChange={(e) => setDomain(e.target.value.toLowerCase())}
              placeholder="Search names or addresses"
              fontSize="xl"
              h="72px"
            />
            <InputRightAddon h="72px" bg="gray.100" fontSize="xl">
              .eth
            </InputRightAddon>
          </InputGroup>

          <Divider borderColor="gray.200" my={3} borderWidth={1} />

          <Flex align="center" justify="space-between">
            {typeof available == "boolean" && available && (
              <React.Fragment>
                <Text fontSize="xl" color="green.400" fontWeight="bold">
                  {domain}.eth is available!
                </Text>
                <Link href={`/domains/${domain}`}>
                  <Button as="a" size="lg" colorScheme="blue" cursor="pointer">
                    Register on L2
                  </Button>
                </Link>
              </React.Fragment>
            )}

            {typeof available == "boolean" && !available && (
              <React.Fragment>
                <Text fontSize="xl" color="gray.500" fontWeight="bold">
                  {domain}.eth is taken
                </Text>
                <a
                  href={"https://app.ens.domains/search/" + domain}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    size="lg"
                    colorScheme="blue"
                    variant="outline"
                    bg="white"
                  >
                    Open on ens.domains
                  </Button>
                </a>
              </React.Fragment>
            )}
          </Flex>
        </Box>

        {/* <Button
          colorScheme="blue"
          size="lg"
          h="56px"
          w="160px"
          onClick={handleSubmit}
        >
          Search
        </Button> */}
      </Flex>
    </Box>
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDomain((domain) => domain.replace(".eth", ""));

    setAvailable(Boolean(Math.round(Math.random())));
  }
}
