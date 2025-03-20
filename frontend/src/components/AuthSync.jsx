import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authSlice"; // Import the login action

const AuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, set the user as authenticated
      dispatch(login({ user: null })); // Replace `null` with actual user data if available
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AuthSync;