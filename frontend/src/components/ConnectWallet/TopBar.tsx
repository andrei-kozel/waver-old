import ConnectButton from "./ConnectButton";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const Container = styled(Box)({
  padding: "8px 0px",
  display: "flex",
  justifyContent: "flex-end",
});

const TopBar = () => {
  return (
    <Container>
      <ConnectButton />
    </Container>
  );
};

export default TopBar;
