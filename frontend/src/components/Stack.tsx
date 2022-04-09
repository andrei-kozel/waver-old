import styled from "@emotion/styled";
import { Avatar, Chip } from "@mui/material";
import { grey } from "@mui/material/colors";

const stack = [
  { title: "Hardhat", image: "./logos/hardhat.jpg" },
  { title: "Ethets.js", image: "./logos/ethers.png" },
  { title: "React", image: "./logos/react.png" },
  { title: "Typescript", image: "./logos/typescript.png" },
  { title: "MUI", image: "./logos/mui.png" },
  { title: "Styled components", image: "./logos/styled-components.png" },
];

const CustomChip = styled(Chip)({
  backgroundColor: `${grey[800]}`,
  color: `${grey[300]}`,
  transition: "all .1s ease-in-out",

  "&:hover": {
    backgroundColor: `${grey[300]}`,
    color: `${grey[800]}`,
  },
  "&:hover .MuiAvatar-circular": {
    transition: "all .2s ease-in-out",
    transform: "scale(1.2)",
  },
});

const Stack = () => {
  return (
    <div>
      {stack.map((item, index) => (
        <CustomChip
          sx={{ marginRight: "8px", marginBottom: "8px" }}
          key={index}
          avatar={<Avatar alt={item.title} src={item.image} />}
          label={item.title}
        />
      ))}
    </div>
  );
};

export default Stack;
