import React, { useEffect } from "react";
import "./UserDashboard.scss";
import userImg from "../../assets/p1.jpg";
import axios from "axios";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const UserDashboard = () => {
  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    axios
      .get(`${server_base_url}/user/${userId}`)
      .then((res) => console.log(res.data.user))
      .catch((e) => console.log("error --> ", e));
  }, []);

  return (
    <div className="user-dashboard">
      <div className="user-img">{/* <ImgUpdateUpload img={userImg} /> */}</div>
      <div className="user-name">nomane</div>
    </div>
  );
};

export default UserDashboard;
