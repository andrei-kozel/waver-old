import type { NextPage } from "next";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../connectors/connectors";
import { Chip, Container, Fab, Stack, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useEffect, useState } from "react";
import WalletModal from "../components/WalletModal";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const { activate, active, account, connector, error } = useWeb3React();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          activate(injected);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    if (localStorage.getItem("walletconnect")) {
      activate(walletconnect);
    }
  }, [active, error, activate]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInjected = async () => {
    const chainId = 3;

    try {
      await activate(injected, undefined, true);
    } catch (e) {
      console.log(e);
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const network = await provider.getNetwork();

    if (network.chainId !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(chainId) }],
        });
      } catch (err) {
        console.log(err);
      }
    }

    setOpen(false);
  };

  const disconnect = async () => {
    // localStorage.removeItem("walletconnect");
    // connector?.getProvider().then((res) => console.log(res));
    try {
      console.log(connector);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="md">
      <Fab
        sx={{ float: "right" }}
        color="primary"
        variant="extended"
        aria-label="connect"
        onClick={handleOpen}
      >
        <AccountBalanceWalletIcon sx={{ mr: 1 }} />
        {active ? `${account?.slice(0, 6)}...${account?.slice(-4)}` : "Connect"}
      </Fab>
      <Typography variant="h5" sx={{ my: 3 }}>
        👋 Hi there! This is my first web3 project!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        This is a place where anyone on the internet can learn a little about me
        and send me a 👋 + a message and have that data stored on the blockchain
        through an Ethereum smart contract. And some bounties ✨
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        This website built with:
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip color="primary" label="Next.js" onClick={() => {}} />
        <Chip color="primary" label="ethers.js" onClick={() => {}} />
        <Chip color="primary" label="hardhat" onClick={() => {}} />
        <Chip color="primary" label="styled-components" onClick={() => {}} />
      </Stack>

      <button onClick={() => void connector?.deactivate()}>Disconnect</button>

      <WalletModal
        open={open}
        handleInjected={handleInjected}
        handleWalletconnect={() => activate(walletconnect)}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default Home;
