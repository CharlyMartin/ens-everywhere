import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/layout";

type Props = {
  Component: React.FC;
  pageProps: Record<string, unknown>;
};

export default function App(props: Props) {
  const { Component, pageProps } = props;
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
