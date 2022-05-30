import React, { useEffect, useState } from "react";
import "./Signup.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;


const Signup = () => {
  const [signupInfo, setSignUpInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setSignUpInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const signup = () => {
    if (
      signupInfo.username === "" ||
      signupInfo.password === "" ||
      signupInfo.confirmPassword === ""
    ) {
      toast.error("Fields cannot be empty.", { position: "top-center" });
      return;
    }
    if (signupInfo.password != signupInfo.confirmPassword) {
      toast.error("Password not equal to confirm password", { position: "top-center" });
      return;
    }

  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <form className="signup-container">
        <div className="signup">
          <h1>SignUp</h1>
          <input
            autoComplete="true"
            name="username"
            value={signupInfo.username}
            onChange={handleOnChange}
            type="text"
            placeholder="Enter username..."
          />

          <input
            autoComplete="false"
            name="password"
            value={signupInfo.password}
            onChange={handleOnChange}
            type="password"
            placeholder="Enter your password..."
          />

          <input
            name="confirmPassword"
            autoComplete="false"
            value={signupInfo.confirmPassword}
            onChange={handleOnChange}
            type="password"
            placeholder="Confirm password..."
          />
          <div onClick={signup} className="btn">
            Signup
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
