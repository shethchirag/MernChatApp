import {
  Input,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadLoader } from "../../redux/reducers/misc";
import {
  AudioFile as AudioFileIcon,
  FileUpload as FileUploadIcon,
  Image as ImageIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorEl, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const selectRef = (ref) => {
    ref.current?.click();
  };

  const [sendAttachments] = useSendAttachmentsMutation();
  const handleClose = () => {
    dispatch(setIsFileMenu(false));
  };

  const fileChangeHandler = async (e, type) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;
    if (files.length > 5) {
      return toast.error(`You can only send upto 5 ${type}time at a `);
    }
    dispatch(setUploadLoader(true));
    const toastId = toast.loading(`Sending ${type}...`);
    handleClose();

    //fetching data

    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((files) => myForm.append("files", files));

      const res = await sendAttachments(myForm);
      console.log(res);
      if (res?.data)
        toast.success(`${type} sent successfully`, { id: toastId });
      else toast?.error(`${type} failed to send`, { id: toastId });
    } catch (error) {
      toast?.error(error, { id: toastId });
    } finally {
      dispatch(setUploadLoader(false));
    }
  };

  return (
    <Menu open={isFileMenu} anchorEl={anchorEl} onClose={handleClose}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => selectRef(imageRef)}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }} primary="Image" />
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg ,image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(audioRef)}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }} primary="Audio" />
            <input
              type="file"
              multiple
              accept="audio/mpeg,audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audio")}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(audioRef)}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }} primary="Video" />
            <input
              type="file"
              multiple
              accept="video/mp4,video/webm,video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Video")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={() => selectRef(audioRef)}>
            <Tooltip title="File">
              <FileUploadIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }} primary="File" />
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "File")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
