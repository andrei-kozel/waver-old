import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import WalletCard from "./WalletCard";

const CustomButton = styled(Button)({
  borderRadius: "20px",
});

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: `1px solid ${grey[700]}`,
  padding: "30px",
  borderRadius: "20px",
  backgroundColor: `${grey[50]}`,
});

const WalletCardContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "16px",
});

const ConnectButton = () => {
  const [open, setOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <CustomButton
        color="primary"
        variant="outlined"
        onClick={handleOpen}
        disableRipple
      >
        {currentAccount ? currentAccount : "Connect Wallet"}
      </CustomButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Select a Wallet
          </Typography>
          <WalletCardContainer>
            <WalletCard title="Metamask" onClick={connectWallet} />
            <WalletCard title="WalletConnect" onClick={connectWallet} />
          </WalletCardContainer>
        </ModalBox>
      </Modal>
    </div>
  );
};

export default ConnectButton;
