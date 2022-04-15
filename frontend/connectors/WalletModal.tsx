import { styled } from "@mui/material/styles";
import { Modal, Box, Paper, Typography, Stack } from "@mui/material";
import { FC } from "react";
import WalletCard from "./WalletCard";

const MBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  padding: "30px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

interface IWalletModalProps {
  open: boolean;
  handleClose: () => void;
  handleInjected: () => void;
  handleWalletconnect: () => void;
}

const WalletModal: FC<IWalletModalProps> = ({
  open,
  handleClose,
  handleInjected,
  handleWalletconnect,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <MBox>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Choose a wallet:
        </Typography>
        <Stack direction="row" spacing={2}>
          <WalletCard onClick={handleInjected} title="Metamask" />
          <WalletCard onClick={handleWalletconnect} title="WalletConnect" />
        </Stack>
      </MBox>
    </Modal>
  );
};

export default WalletModal;
