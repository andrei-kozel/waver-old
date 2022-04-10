import styled from "@emotion/styled";
import { Typography, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

const Container = styled(Box)({
  width: "120px",
  padding: "20px",
  backgroundColor: grey[200],
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  cursor: "pointer",
  transition: "all .1s ease-in-out",

  "& img": {
    width: "80px",
    marginBottom: "10px",
  },

  "&:hover": {
    "& img": {
      transform: "scale(1.1)",
      transition: "all .2s ease-in-out",
    },

    backgroundColor: grey[300],
  },
});

interface WalletCardProps {
  title: string;
  onClick: () => void;
}

const WalletCard: FC<WalletCardProps> = ({ title, onClick }) => {
  return (
    <Container onClick={onClick}>
      <img alt={title} src={`./logos/${title}.png`} />
      <Typography>{title}</Typography>
    </Container>
  );
};

export default WalletCard;
