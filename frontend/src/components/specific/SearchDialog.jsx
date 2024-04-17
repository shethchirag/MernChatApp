import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItemMemo from "../shared/UserItem";
import { useEffect, useState } from "react";
import { sampleUsers } from "../Layout/constants/SampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import { useLazySearchUsersQuery } from "../../redux/api/api";

const SearchDialog = () => {
  const search = useInputValidation("");
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUsersQuery();
  const dispatch = useDispatch();
  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState([]);
  const addfriendHandler = (id) => {};

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          console.log(data);
          setUsers(data.users);
        })
        .catch((e) => console.log(e));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={() => dispatch(setIsSearch(false))}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label={""}
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users?.map((user) => (
            <UserItemMemo
              key={user._id}
              user={user}
              handler={addfriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
