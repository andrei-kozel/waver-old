import type { NextPage } from "next";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../connectors/connectors";
import {
  Chip,
  Container,
  Fab,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useEffect, useState } from "react";
import WalletModal from "../components/WalletModal";
import { ethers } from "ethers";

const IContract = require("../../artifacts/contracts/Waver.sol/Waver.json");
const CHAIN_ID = "0x3";
const contractAddress = "0x6AD2780fF73d956F5e8653c2DdB86dd782a57dD0";
const abi = IContract.abi;

const Home: NextPage = () => {
  const { activate, active, account, connector, error, library } =
    useWeb3React();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [wavers, setWavers] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      setUp();
    };

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

    if (active) {
      init();
    }
  }, [active, error, activate]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInjected = async () => {
    try {
      await activate(injected, undefined, true);
    } catch (e) {
      console.log(e);
    }

    const chainId = await connector?.getChainId();

    if (chainId !== CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID as string }],
        });
      } catch (err) {
        console.log(err);
      }
    }

    setOpen(false);
  };

  const disconnect = async () => {
    try {
      connector?.deactivate();
      localStorage.removeItem("walletconnect");
    } catch (e) {
      console.log(e);
    }
  };

  const setUp = async () => {
    const provider = new ethers.providers.Web3Provider(library.provider, "any");
    const signer = await provider.getSigner();
    const wavePortalContract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );
    setContract(wavePortalContract);
  };

  const getWaversCount = async () => {
    try {
      let count = await contract.getTotalWavers();
      console.log("Retrieved total wave count...", count.toNumber());
    } catch (e) {
      console.log(e);
    }
  };

  const wave = async () => {
    if (contract) {
      let tx = await contract.wave(value);
      tx.wait();
      getAllWavers();
    }
  };

  const getAllWavers = async () => {
    const wavers = await contract.getAllWaves();
    setWavers(wavers);
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

      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor="my-input">Text</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={({ target }) => setValue(target.value)}
          value={value}
        />
        <Button onClick={wave}>Send</Button>
      </FormControl>

      <Button
        onClick={() => {
          console.log(getWaversCount());
        }}
      >
        Log wavers count
      </Button>

      <Button
        onClick={() => {
          console.log(getAllWavers());
        }}
      >
        Log all wavers
      </Button>

      {wavers.map((waver) => {
        return (
          <>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {waver.from}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {waver.message}
            </Typography>
          </>
        );
      })}

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
