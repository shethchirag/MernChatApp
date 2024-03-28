import { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../components/Layout/constants/SampleData";
import { transformImage } from "../../lib/Features";
import AvatarCard from "./../../components/shared/AvatarCard";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created by",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.chats.map((user) => ({
        ...user,
        id: user._id,
        avatar: user.avatar.map((i) => transformImage(i, 50)),
        members: user.members.map((i) => transformImage(i.avatar, 50)),
        creator: {
          name: user.creator.name,
          avatar: transformImage(user.creator.avatar, 50),
        },
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading="All Chats" columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
