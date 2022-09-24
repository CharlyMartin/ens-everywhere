import React, { useEffect, useState } from "react";
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
import Row from "../../components/row";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

type Domain = {
  domain: string;
  status: "registered" | "pending";
  chain: string;
  date: Date;
};

async function tokenIdToName(tokenId: string) {
  const node = ethers.BigNumber.from(tokenId).toHexString();
  const res = await fetch("https://api.thegraph.com/subgraphs/name/ensdomains/ens", {
    "headers": {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        domains(first:1, where:{labelhash:"${node}"}){
          labelName
        }
      }`,
    }),
    "method": "POST",
  });
  const json = await res.json()
  return json.data.domains[0].labelName || null;
}

const domainsMock: Domain[] = [
  {
    domain: "demo-l1-domain",
    status: "registered",
    chain: "Ethereum",
    date: new Date("2021-12-17T03:24:00"),
  },
  {
    domain: "demo-l2-domain",
    status: "pending",
    chain: "Optimism",
    date: new Date("2021-12-17T03:24:00"),
  },
];

const ENS_NFT = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'

export default function Domain() {
  const { query } = useRouter();
  const [open, setOpen] = React.useState<number | null>();
  const { account } = useWeb3React()
  const [domains, setDomains] = useState(domainsMock)

  useEffect(() => {
    if (!account) {
      return
    }

    fetch(`https://api.nftport.xyz/v0/accounts/${account}?chain=ethereum&contract_address=${ENS_NFT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '72d197a7-ed52-4063-bdc3-5d50a45eae71'
      }
    }).then(async response => {
      const json = await response.json()
      const names = await Promise.all(json.nfts.map((nft: any) => tokenIdToName(nft.token_id)))
      setDomains([
        ...names.map((name): Domain => ({
          domain: name,
          status: 'registered',
          chain: 'Ethereum',
          date: new Date("2021-12-17T03:24:00"),
        })),
        ...domainsMock,
      ])
    })
  }, [account])

  return (
    <React.Fragment>
      <Heading domain={account || 'Domains'}></Heading>

      <Row py={4}>
        <Badge>Name</Badge>
        <Badge>Expiry Date</Badge>
        <Badge>Chain</Badge>
      </Row>

      <Stack dir="vertival" gap={1}>
        {domains.map((items: Domain, key) => {
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
