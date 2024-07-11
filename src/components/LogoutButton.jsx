import React from "react";
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/logout");
  };

  return (
    auth && (
      <div>
        <button id="logout" onClick={() => logout()} className="bg-red-500 p-2 text-white hover:text-white hover:bg-red-700">
          Log Out
        </button>
      </div>
      
    )
  );
};

export default LogoutButton;
