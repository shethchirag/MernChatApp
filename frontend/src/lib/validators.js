import { isValidUsername } from "6pp";
export const validateUsername = (username) => {
  if (!isValidUsername(username)) {
    return {
      isValid: false,
      errorMessage: "Username is not valid",
    };
  }
};
