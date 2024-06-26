import {
  AlternateEmail as UserNameIcon,
  Face,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        src={user?.avatar.url}
      />
      <ProfileCard text={user?.bio} heading={"bio"} />
      <ProfileCard
        text={user.username}
        heading={"Username"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard text={user.name} heading={"Name"} Icon={<Face />} />
      <ProfileCard
        text={moment(user?.createdAt).fromNow()}
        heading={"Joined"}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant={"body1"}>{text}</Typography>
      <Typography variant={"caption"} color={"gray"}>
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
