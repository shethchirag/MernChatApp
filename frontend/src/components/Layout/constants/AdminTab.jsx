import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Message as MessageIcon,
} from "@mui/icons-material";

export const AdminTab = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "User",
    path: "/admin/user",
    icon: <ManageAccountsIcon />,
  },

  {
    name: "Chat",
    path: "/admin/chat",
    icon: <GroupIcon />,
  },
  {
    name: "Message",
    path: "/admin/message",
    icon: <MessageIcon />,
  },
];
