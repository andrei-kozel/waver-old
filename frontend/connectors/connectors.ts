import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const RPC_URLS ={
  3: process.env.RPC_ROPSTEN as string
}

export const injected = new InjectedConnector({ supportedChainIds: [3] })

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})