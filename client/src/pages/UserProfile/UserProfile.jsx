import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import userImg from "../../assets/p1.jpg";
import axios from "axios";
import ImgUpdateUpload from "../../components/ImgUpdateUpload/ImgUpdateUpload";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    img: "",
    bookmark: [],
  });
  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    axios
      .get(`${server_base_url}/user/${userId}`)
      .then((res) => {
        const user = res.data.user;
        setUserInfo({ name: user.name, img: user.img });
      })
      .catch((e) => console.log("error --> ", e));
  }, []);

  return (
    <div className="user-dashboard">
      <div className="user-img">
        <ImgUpdateUpload img={userInfo.img} />
      </div>
      <div className="user-name">{userInfo.name}</div>
    </div>
  );
};

export default UserDashboard;
