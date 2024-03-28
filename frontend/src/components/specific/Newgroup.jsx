import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../Layout/constants/SampleData";
import UserItemMemo from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";

const NewGroupDialog = () => {
  const groupName = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((currElement) => currElement !== id)
        : [...prevSelected, id]
    );
  };
  const submitHandler = () => {};
  const closeHandler = () => {};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.onChange}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {members.map((item) => (
            <UserItemMemo
              user={item}
              key={item._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(item._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={submitHandler} variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
