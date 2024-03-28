import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../Layout/constants/SampleData";
import UserItemMemo from "./../shared/UserItem";
import { useState } from "react";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((currElement) => currElement !== id)
        : [...prevSelected, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
    console.log("submit");
  };
  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
    console.log("close");
  };
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItemMemo
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}> No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          spacing={1}
        >
          <Button onClick={closeHandler} color="error" variant="text">
            Cancel
          </Button>
          <Button
            disabled={isLoadingAddMember}
            color="success"
            variant="contained"
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
