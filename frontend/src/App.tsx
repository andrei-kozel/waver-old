import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import Header from "./components/Header";
import TopBar from "./components/ConnectWallet/TopBar";
import { theme } from "./theme/theme";

const CustomContainer = styled(Container)({
  maxWidth: "600px",
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomContainer>
        <TopBar />
        <Header />
      </CustomContainer>
    </ThemeProvider>
  );
};

export default App;
