import React from "react";
import Link from "next/link";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { ethers } from "ethers";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../../chain/web3-connectors";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  const { account, activate, error } = useWeb3React();
  console.log("account", account, error);

  const connectHandler = () => {
    activate(injected)
  }

  return (
    <Box minH="100vh" bg="gray.50" pb={32}>
      <Flex as="nav" justify="space-between" align="center" px={20} py={12}>
        <Link href="/">
          <Text
            as="a"
            fontSize="xl"
            fontWeight="bold"
            decoration="underline"
            cursor="pointer"
          >
            ENS Everywhere
          </Text>
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
              w="200px"
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
                <Box h="16px" w="16px" rounded="full" bg="blue.500" />
                <Text ml={2}>ETH</Text>
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
}
