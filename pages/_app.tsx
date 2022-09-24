import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import Layout from "../components/layout";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

type Props = {
  Component: React.FC;
  pageProps: Record<string, unknown>;
};

export default function App(props: Props) {
  const { Component, pageProps } = props;
  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ReactProvider>
    </ChakraProvider>
  );
}
