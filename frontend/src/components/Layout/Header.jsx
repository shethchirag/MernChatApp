import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Orange } from "./constants/Color";
import { Add, Group, Logout, Notifications, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import axios from "axios";
import { server } from "./constants/config";
import toast from "react-hot-toast";

const SearchDialog = lazy(() => import("../specific/SearchDialog"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/Newgroup"));
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobileMenu,
  setIsSearch,
  setIsNotification,
} from "../../redux/reducers/misc";

const Header = () => {
  const [isNewGroup, setIsNewGroup] = useState(false);
  const { isSearch, isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMobile = () => {
    dispatch(setIsMobileMenu(true));
  };
  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroupDialog = () => {
    setIsNewGroup(!isNewGroup);
  };
  const openNewNotificationDialog = () => {
    dispatch(setIsNotification(true));
  };
  const navigateToGroup = () => {
    navigate("/groups");
  };
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message) || "Something went wrong!";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} height={"4rem"}>
      <AppBar position="static" sx={{ bgcolor: Orange }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            ChatApp
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={handleMobile}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconBtn icon={<Search />} title="Search" onClick={openSearch} />

            <IconBtn
              icon={<Add />}
              title="New Group"
              onClick={openNewGroupDialog}
            />

            <IconBtn
              icon={<Group />}
              title="Manage Group"
              onClick={navigateToGroup}
            />
            <IconBtn
              icon={<Notifications />}
              title="Notifications"
              onClick={openNewNotificationDialog}
            />
            <IconBtn icon={<Logout />} title="Logout" onClick={logoutHandler} />
          </Box>
          {isSearch && (
            <Suspense fallback={<Backdrop open={true} />}>
              <SearchDialog />
            </Suspense>
          )}
          {isNotification && (
            <Suspense fallback={<Backdrop open={true} />}>
              <NotificationsDialog />
            </Suspense>
          )}
          {isNewGroup && (
            <Suspense fallback={<Backdrop open={true} />}>
              <NewGroupDialog close={openSearch} />
            </Suspense>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const IconBtn = ({ icon, title, onClick, sx }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={onClick} size="large" sx={sx}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
