import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from '../hooks/useAuth';

const LoginButton = () => {
  const { auth } = useAuth();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !auth && (
      <button onClick={() => loginWithRedirect()}>Log in</button>
    )
  );
};

export default LoginButton;
