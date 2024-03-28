import { useRef } from "react";
import AppLayout from "../components/Layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { GrayColor, Orange } from "../components/Layout/constants/Color";
import { AttachFile, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/style/VisuallyHidden";
import FileMenu from "../components/dailogs/FileMenu";
import { sampleMessages } from "../components/Layout/constants/SampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "xshgchsvcjhcbskc",
  name: "chirag",
};

const Chat = () => {
  const containerRef = useRef(null);

  return (
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
        {sampleMessages.map((message) => (
          <MessageComponent key={message._id} user={user} message={message} />
        ))}
      </Stack>
      <form style={{ height: "10%" }}>
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
          <InputBox placeholder="Type Message Here..." />
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
