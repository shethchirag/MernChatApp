import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { sampleNotifications } from "../Layout/constants/SampleData";
import { Notifications } from "@mui/icons-material";
import { memo } from "react";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NotificationsDialog = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("use socket");
        toast.success(res.data.message);
      } else {
        toast.error(res?.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };
  useErrors([{ isError, error }]);

  return (
    <Dialog
      open={isNotification}
      onClose={() => dispatch(setIsNotification(false))}
    >
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : data?.allRequest?.length > 0 ? (
          data?.allRequest.map((item, _id) => (
            <NotificationsItem
              key={_id}
              sender={item.sender}
              _id={item._id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationsItem = memo(function NotificationsItem({
  sender,
  _id,
  handler,
}) {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default NotificationsDialog;
