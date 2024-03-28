import {
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AdminTab } from "./constants/AdminTab";
import { MatBlack } from "./constants/Color";

const LinkComponent = styled(Link)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {
    console.log("logout");
  };
  return (
    <Stack width={w} direction={"column"} spacing={"3rem"} p={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Admin
      </Typography>
      <Stack spacing={"1rem"}>
        {AdminTab.map((tab) => (
          <LinkComponent
            sx={
              location.pathname === tab.path && {
                bgcolor: MatBlack,
                color: "white",
                ":hover": {
                  color: "white",
                },
              }
            }
            key={tab.path}
            to={tab.path}
          >
            <Stack direction={"row"} alignContent={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography mx={1}>{tab.name}</Typography>
            </Stack>
          </LinkComponent>
        ))}
        <LinkComponent onClick={logoutHandler}>
          <Stack direction={"row"} alignContent={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography mx={1}>Logout</Typography>
          </Stack>
        </LinkComponent>
      </Stack>
    </Stack>
  );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile((isMobile) => !isMobile);
    console.log(isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to="/admin" />;
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: `1rem`,
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <SideBar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
