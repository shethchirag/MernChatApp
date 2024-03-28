import { Box, Typography } from "@mui/material";
import AppLayout from "../components/Layout/AppLayout";
import { GrayColor } from "../components/Layout/constants/Color";

const Home = () => {
  return (
    <Box bgcolor={GrayColor} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a Friend to Chat
      </Typography>
    </Box>
  );
};

const WrappedHome = AppLayout(Home);
export default WrappedHome;
