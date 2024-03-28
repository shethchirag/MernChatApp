import { memo } from "react";

import { Box, Stack, Typography } from "@mui/material";

import PropTypes from "prop-types";
import AvatarCard from "./AvatarCard";
import { LinkComponent } from "../style/VisuallyHidden";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <LinkComponent
      to={`/chat/${_id}`}
      sx={{ padding: "0" }}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </LinkComponent>
  );
};

ChatItem.propTypes = {
  avatar: PropTypes.array,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  groupChat: PropTypes.bool,
  sameSender: PropTypes.bool,
  isOnline: PropTypes.bool,
  newMessagesAlert: PropTypes.object,
  index: PropTypes.number,
  handleDeleteChat: PropTypes.func,
};

const ChatItemMemo = memo(ChatItem);

export default ChatItemMemo;
