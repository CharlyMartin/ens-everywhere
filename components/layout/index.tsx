import React from "react";
import Link from "next/link";
import { Flex, Text, Box, Button, Select } from "@chakra-ui/react";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../../chain/web3-connectors";

type Props = {
  children: React.ReactNode;
};

const options = [
  {
    value: "Ethereum",
    label: "Ethereum",
    color: "#1B1BFF",
  },
  {
    value: "Polygon",
    label: "Polygon",
    color: "#7B3FE4",
  },
  {
    value: "Optimism",
    label: "Optimism",
    color: "#FF0420",
  },
];

export default function Layout(props: Props) {
  const { children } = props;
  const { account, activate, error } = useWeb3React();
  const [chain, setChain] = React.useState(options[0]);

  console.log("account", account, error);

  const connectHandler = () => {
    activate(injected);
  };

  return (
    <Box minH="100vh" bg="gray.50" pb={32}>
      <Flex as="nav" justify="space-between" align="center" px={20} py={12}>
        <Link href="/">
          <Box as="img" src="/logo-ense.svg" w="230px" />
        </Link>

        {account ? (
          <Flex align="center">
            <Link href="/domains">
              <Button
                as="a"
                fontSize="md"
                fontWeight="bold"
                size="sm"
                mr={4}
                bg="transparent"
                onClick={connectHandler}
                cursor="pointer"
              >
                My Domains
              </Button>
            </Link>
            <Flex
              w="260px"
              bg="white"
              borderColor="gray.200"
              borderWidth={1}
              rounded="md"
              px={3}
              py={1}
              align="center"
              justify="space-between"
            >
              <Flex align="center" justify="space-between">
                <Box h="16px" w="16px" rounded="full" bg={chain.color} />
                <Select
                  variant="unstyled"
                  size="sm"
                  value={chain.value}
                  onChange={(e) => {
                    const chain = findSelected(e.target.value);
                    setChain(chain || options[0]);
                  }}
                  ml={2}
                  mb="1px"
                  width="100px"
                >
                  {options.map((opt) => {
                    return (
                      <Box as="option" key={opt.value} value={opt.value}>
                        {opt.label}
                      </Box>
                    );
                  })}
                </Select>
              </Flex>

              <Text>
                {account.substring(0, 4) +
                  "..." +
                  account.substring(account.length - 4)}
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Box>
            <Button
              fontSize="md"
              fontWeight="bold"
              size="sm"
              onClick={connectHandler}
            >
              Connect Wallet
            </Button>
          </Box>
        )}
      </Flex>
      <Box as="main" mx="auto" w="1048px">
        {children}
      </Box>
    </Box>
  );

  function findSelected(chain: string) {
    return options.find((opt) => {
      return opt.value == chain;
    });
  }
}
