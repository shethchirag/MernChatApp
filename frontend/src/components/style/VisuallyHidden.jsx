import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { GrayColor, MatBlack } from "../Layout/constants/Color";

export const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  border: 0,
  clip: "rect(0 0 0 0)",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const LinkComponent = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`;
export const InputBox = styled("input")`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${GrayColor};
`;

export const SearchInput = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  font-size: 1.1rem;
  background-color: ${GrayColor};
`;

export const CurveButton = styled("button")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: white;
  border-radius: 1.5rem;
  background-color: ${MatBlack};
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
