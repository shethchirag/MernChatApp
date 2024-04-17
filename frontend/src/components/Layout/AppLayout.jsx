import { Drawer, Grid, Skeleton } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";

import { sampleChats } from "./constants/SampleData";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu } from "../../redux/reducers/misc";
import { useErrors } from "../hooks/hook";

const AppLayout = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    const { chatId } = useParams();
    const { isMobileMenu } = useSelector((state) => state.misc);
    const dispatch = useDispatch();
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
    };
    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    return (
      <div>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
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
          </Drawer>
        )}
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
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
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
            )}
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
