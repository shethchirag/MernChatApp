import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { VisuallyHiddenInput } from "../components/style/VisuallyHidden";
import { useInputValidation, useFileHandler } from "6pp";
import { validateUsername } from "../lib/validators";
import { LinearGradient } from "../components/Layout/constants/Color";
import axios from "axios";
import { server } from "../components/Layout/constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  const toggleLogin = () => {
    setLogin(!login);
  };

  const userName = useInputValidation("", validateUsername);
  const password = useInputValidation("");
  const bio = useInputValidation("");
  const name = useInputValidation("");
  const avatar = useFileHandler("single");

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          userName: userName.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message) || "Something went wrong";
    }
  };
  const handleSighup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", userName.value);
    formData.append("password", password.value);
    console.log(userName.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message) || "Something went wrong";
    }
  };

  return (
    <div style={{ backgroundImage: LinearGradient }}>
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          {login ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={userName.value}
                  onChange={userName.changeHandler}
                  autoComplete="Username"
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  size="small"
                  value={password.value}
                  onChange={password.changeHandler}
                  autoComplete="current-password"
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
                <Typography textAlign="center" m={"1rem"}>
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="text"
                  color="secondary"
                  onClick={toggleLogin}
                >
                  Sign up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign up</Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSighup}
              >
                <Stack position={"relative"} width={"7rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "7rem",
                      height: "7rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "white",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      " :hover": {
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                    component="label"
                  >
                    <CameraAlt />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-contain"}
                    display={"block"}
                    color="error"
                    textAlign="center"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={name.value}
                  onChange={name.changeHandler}
                  autoComplete="Name"
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={userName.value}
                  onChange={userName.changeHandler}
                  autoComplete="Username"
                />
                {userName.error && (
                  <Typography color={"red"} variant={"caption"}>
                    {userName.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  size="small"
                  value={password.value}
                  onChange={password.changeHandler}
                  autoComplete="current-password"
                />
                <Button
                  sx={{ marginTop: "0.8rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Sign up
                </Button>
                <Typography textAlign="center" m={"0.8rem"}>
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="text"
                  color="secondary"
                  onClick={toggleLogin}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
