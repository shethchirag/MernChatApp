import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import ChatItemMemo from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar = [], _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((member) => onlineUsers.includes(_id));

        return (
          <ChatItemMemo
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            handleDeleteChat={handleDeleteChat}
            sameSender={chatId === _id}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            key={index}
            index={index}
          />
        );
      })}
    </Stack>
  );
};

ChatList.propTypes = {
  w: PropTypes.string,
  chats: PropTypes.array,
  chatId: PropTypes.string,
  onlineUsers: PropTypes.array,
  newMessagesAlert: PropTypes.array,
  handleDeleteChat: PropTypes.func,
  ChatItemMemo: PropTypes.func,
};

export default ChatList;
