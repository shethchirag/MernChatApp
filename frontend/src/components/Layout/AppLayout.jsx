import { Grid } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";

import { sampleChats } from "./constants/SampleData";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    const { chatId } = useParams();
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
    };

    return (
      <div>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              // newMessagesAlert={[
              //   {
              //     chatId: chatId,
              //     count: 5,
              //   },
              // ]}
              // onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              bgcolor: "rgba(0,0,0,0.85)",
              padding: "2rem",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;
