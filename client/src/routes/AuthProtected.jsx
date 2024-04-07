import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthProtected = (props) => {
  const user = useAuth((state) => state.user);
  const accessToken = useAuth((state) => state.access_token);
  console.log(user, accessToken);
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};
