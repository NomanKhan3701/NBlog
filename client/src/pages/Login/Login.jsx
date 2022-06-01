import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    else {
      setLoading(true);
      axios
        .post(`${server_base_url}/user/login`, {
          name: loginInfo.username,
          password: loginInfo.password,
        })
        .then((res) => {
          localStorage.setItem("blogUser", res.data.user[0]._id);
          setLoading(false);
          navigate(0);
          navigate("/", { replace: true });
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
          toast.error("No user with given credentials", {
            position: "top-center",
          });
        });
    }
  };

  if (loading) {
    return <h1>Loding...</h1>;
  }

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
