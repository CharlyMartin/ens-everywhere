import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Badge,
  Collapse,
} from "@chakra-ui/react";

import Heading from "../../components/heading";
import { useMetaMask } from "../../hooks/use-metamask";
import Row from "../../components/row";

type Domain = {
  domain: string;
  status: "registered" | "pending";
  chain: "Fuel" | "Optimism";
  date: Date;
};

const domainsMock: Domain[] = [
  {
    domain: "derekdino",
    status: "registered",
    chain: "Fuel",
    date: new Date("2021-12-17T03:24:00"),
  },
  {
    domain: "fossilfrank",
    status: "registered",
    chain: "Fuel",
    date: new Date("2021-12-17T03:24:00"),
  },
  {
    domain: "donniedenver",
    status: "registered",
    chain: "Fuel",
    date: new Date("2021-12-17T03:24:00"),
  },
  {
    domain: "kalle",
    status: "pending",
    chain: "Optimism",
    date: new Date("2021-12-17T03:24:00"),
  },
];

export default function Domain() {
  const { query } = useRouter();
  const [open, setOpen] = React.useState<number | null>();

  const { account } = useMetaMask();

  return (
    <React.Fragment>
      <Heading domain={account}></Heading>

      <Row py={4}>
        <Badge>Name</Badge>
        <Badge>Expiry Date</Badge>
        <Badge>Chain</Badge>
      </Row>

      <Stack dir="vertival" gap={1}>
        {domainsMock.map((items: Domain, key) => {
          const { domain, status, chain, date } = items;

          return (
            <React.Fragment key={key}>
              <Row>
                <Text fontSize="lg" color="gray.800">
                  {domain}.eth
                </Text>
                <Text fontSize="lg" color="gray.500">
                  {date.toISOString()}
                </Text>
                <Text fontSize="lg" color="gray.500">
                  {chain}
                </Text>

                {status == "registered" ? (
                  <Flex justify="flex-end" align="center">
                    <a
                      href={
                        "https://app.ens.domains/search/" + String(query.id)
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        mr={2}
                        bg="white"
                      >
                        Details
                      </Button>
                    </a>

                    <Button
                      colorScheme="blue"
                      onClick={() => setOpen(key)}
                      cursor="pointer"
                    >
                      Bridge to L1
                    </Button>
                  </Flex>
                ) : (
                  <Flex justify="flex-end" align="center">
                    <Badge colorScheme="blue" variant="outline">
                      Pending Registration
                    </Badge>
                  </Flex>
                )}
              </Row>

              <Collapse in={key == open}>
                <Box bg="blue.100" p={6}>
                  <Text fontSize="lg" color="blue.800" width="55%">
                    Are you sure you want to bridge to L1? This will take 10
                    days to settle, which means your domain will be untradable
                    during that time.
                  </Text>

                  <Flex pt={4}>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      mr={2}
                      bg="white"
                      onClick={() => setOpen(null)}
                    >
                      Cancel
                    </Button>

                    <Button
                      colorScheme="blue"
                      cursor="pointer"
                      onClick={() => setOpen(null)}
                    >
                      Confirm
                    </Button>
                  </Flex>
                </Box>
              </Collapse>
            </React.Fragment>
          );
        })}
      </Stack>
    </React.Fragment>
  );
}
