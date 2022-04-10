import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Stack from "./Stack";

const HeaderContainer = styled(Box)`
  margin: 0 auto;
`;

const Title = styled(Typography)`
  color: ${grey[800]};
  margin-bottom: 1rem;
`;

const Description = styled(Typography)`
  color: ${grey[600]};
  margin-bottom: 0.7rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title variant="h5">Hi there! This is my first web3 project!</Title>
      <Description>
        This is a place where anyone on the internet can learn a little about me
        and send me a 👋 + a message and have that data saved on the blockchain
        through an Ethereum smart contract. And some bounties ✨
      </Description>
      <Description>This project was made with:</Description>
      <Stack />
    </HeaderContainer>
  );
};

export default Header;
