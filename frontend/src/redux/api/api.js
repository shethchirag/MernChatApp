import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/Layout/constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chats", "User"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),
    searchUsers: builder.query({
      query: (username) => ({
        url: `user/search?username=${username}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
} = api;
