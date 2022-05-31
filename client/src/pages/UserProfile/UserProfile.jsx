import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import ImgUpdateUpload from "../../components/ImgUpdateUpload/ImgUpdateUpload";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import PostCard from "../../components/PostCard/PostCard";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const UserDashboard = () => {
  const [prevImg, setPrevImg] = useState("");
  const [newName, setNewName] = useState("");
  const [toggleName, setToggleName] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    img: "",
    bookmark: [],
  });

  useEffect(() => {
    navigate("bookmark");
  }, []);

  const updateImage = () => {
    if (prevImg === "" || prevImg === userInfo.img) return;
    axios
      .patch(`${server_base_url}/user/addUserImage/${userInfo.id}`, {
        img: prevImg,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateUserName = () => {
    if (newName === "" || newName === userInfo.name) return;
    axios
      .patch(`${server_base_url}/user/updatename/${userInfo.id}`, {
        newName: newName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveChanges = async () => {
    await updateImage();
    await updateUserName();
    window.location.reload(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    axios
      .get(`${server_base_url}/user/${userId}`)
      .then((res) => {
        const user = res.data.user;
        setNewName(user.name);
        setUserInfo({ id: userId, name: user.name, img: user.img });
      })
      .catch((e) => console.log("error --> ", e));
  }, []);

  return (
    <div className="profile-container">
      <div className="user-dashboard">
        <div className="user-info-container">
          <div className="user-info">
            <div className="user-img">
              <ImgUpdateUpload
                setFiles={setFiles}
                setPrevImg={setPrevImg}
                img={userInfo.img}
              />
            </div>
            {toggleName ? (
              <input
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                placeholder="new name.."
              />
            ) : (
              <div onClick={() => setToggleName(true)} className="username">
                {userInfo.name}
                <MdModeEditOutline />
              </div>
            )}
          </div>
        </div>
        <div className="links">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="bookmark"
          >
            <div className="link active">Bookmarked</div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="like"
          >
            <div className="link">Liked</div>
          </NavLink>
        </div>
        <div onClick={saveChanges} className="btn">
          Save Changes
        </div>
      </div>
      <div className="right-container">
        <Outlet />
      </div>
    </div>
  );
};

export const Bookmarked = () => {
  return (
    <div className="bookmarked-container">
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
        Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
        Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
        Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
        Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
        Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
        Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
        Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
    </div>
  );
};

export const Liked = () => {
  return (
    <div className="liked-container">
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
      <PostCard
        title="My first blog, hope its good"
        desc=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea iure explicabo repellat? Officia cum nostrum animi ut minus debitis consequatur, rem obcaecati similique consectetur officiis tempore, illo ipsam veritatis quis.
Repudiandae ipsam aspernatur earum commodi consectetur nemo dolores sunt corporis repellendus reprehenderit obcaecati voluptatibus aliquam, laborum praesentium neque.   Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nulla ipsa commodi veritatis at nostrum dolores magnam, quos deleniti cupiditate esse eius temporibus, corrupti doloribus iste tempora, architecto quisquam vero."
        img="https://i.pinimg.com/474x/ce/74/f2/ce74f24391fd633ef41ae68faf477289.jpg"
        like={0}
      />
    </div>
  );
};

export default UserDashboard;
