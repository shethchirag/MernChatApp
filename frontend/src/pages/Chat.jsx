import { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { GrayColor, Orange } from "../components/Layout/constants/Color";
import { AttachFile, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/style/VisuallyHidden";
import MessageComponent from "../components/shared/MessageComponent";
import FileMenu from "./../components/dialogs/FileMenu";
import { useGetSocket } from "../socket";
import { NEW_MESSAGE } from "../components/Layout/constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../components/hooks/hook";
import { useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const socket = useGetSocket();
  const { user } = useSelector((state) => state.auth);

  const { data: chatDetails } = useChatDetailsQuery({ chatId, skip: !chatId });
  const members = chatDetails?.chat?.members;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page: page });

  const { data: oldMessage, setData: setOldMessage } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );
  console.log("🚀 ~ Chat ~ oldMessage:", oldMessage);

  const errors = [
    { isError: chatDetails?.isError, error: chatDetails?.error },
    { isError: oldMessagesChunk?.isError, error: oldMessagesChunk?.error },
  ];
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, {
      chatId,
      members,
      message,
    });
    setMessage("");
  };
  const newMessagesHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessagesHandler };
  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessage, ...messages];

  return chatDetails?.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={GrayColor}
        height={"90%"}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {allMessages?.map((message) => (
          <MessageComponent key={message._id} user={user} message={message} />
        ))}
      </Stack>
      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"0.6rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFile />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: Orange,
              color: "white",
              rotate: "-30deg",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

const ChatLayout = AppLayout(Chat);
export default ChatLayout;
