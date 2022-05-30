import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;


const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setLoginInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const login = () => {
    if (loginInfo.username === "" || loginInfo.password === "")
      toast.error("Fields cannot be empty.", { position: "top-center" });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <form className="login-container">
        <div className="login">
          <h1>Log In</h1>
          <input
            name="username"
            autoComplete="true"
            onChange={(e) => handleOnChange(e)}
            value={loginInfo.username}
            type="text"
            placeholder="Enter username..."
          />
          <input
            name="password"
            autoComplete="false"
            onChange={(e) => handleOnChange(e)}
            type="password"
            value={loginInfo.password}
            placeholder="Enter your password..."
          />
          <div className="btn" onClick={login}>
            Login
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
