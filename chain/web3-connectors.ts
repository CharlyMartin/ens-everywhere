import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.NEXT_PUBLIC_RPC_URL_1 as string,
  4: process.env.NEXT_PUBLIC_RPC_URL_4 as string
}

export const injected = new InjectedConnector({})

const networkConnectors: { [chainId: number]: NetworkConnector } = {}

export const getNetworkConnector = (chainId: number) => {
  if (!networkConnectors[chainId]) {
    if (!RPC_URLS[chainId]) {
      throw new Error(`Unsupported chain ${chainId}`)
    }
    networkConnectors[chainId] = new NetworkConnector({
      urls: RPC_URLS,
      defaultChainId: chainId,
    })
  }

  return networkConnectors[chainId];
}
