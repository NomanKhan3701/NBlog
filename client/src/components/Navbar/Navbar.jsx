import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch, BsFillCartCheckFill } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import { AiOutlineAlignLeft, AiFillHome, AiTwotoneHeart } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import defaultImg from "../../assets/defaultAvatar.png";
import axios from "axios";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      setLoggedIn(true);
      axios
        .get(`${server_base_url}/user/getUserImage/${userId}`)
        .then((res) => {
          setUserImg(res.data.userImage[0].img);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const searchPost = async () => {
    if (search.trim() || tags) {
      const tags = await search.split(" ").join(",");
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "black" : "rgb(115, 115, 115)",
    };
  };

  const logout = () => {
    localStorage.removeItem("blogUser");
    window.location.reload();
  };

  return (
    <div className="navbar flex-cc">
      <div className="logo">
        <img src={logo} alt="blog logo" />
      </div>
      <div className="search-container">
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search post..."
        />
        <BsSearch className="i" />
      </div>
      <div className="links">
        <div className="left-links flex-cc">
          <NavLink style={NavLinkStyle} to="/" className="link active">
            Home
          </NavLink>
          <NavLink style={NavLinkStyle} to="/yourpost" className="link">
            Your Post
          </NavLink>
          <NavLink style={NavLinkStyle} to="/about" className="link">
            About
          </NavLink>
          <NavLink style={NavLinkStyle} to="/contact" className="link">
            Contact
          </NavLink>
        </div>
        {loggedIn ? (
          <div className="right-links flex-cc">
            <NavLink style={NavLinkStyle} to="/profile">
              {userImg ? (
                <img src={userImg} alt="" />
              ) : (
                <img src={defaultImg} alt="default" />
              )}
            </NavLink>
            <div onClick={logout} className="logout">
              Logout
            </div>
          </div>
        ) : (
          <div className="right-links flex-cc">
            <NavLink style={NavLinkStyle} to="/login" className="link">
              Login
            </NavLink>
            <NavLink to="/signup" className="link btn">
              Signup
            </NavLink>
          </div>
        )}
      </div>

      <div className="sidebar">
        <AiOutlineAlignLeft
          className={`toggle-icon toggle-line ${!toggle ? "active" : ""}`}
          onClick={() => setToggle(true)}
        />
        <div className={`sidebar-toggle ${toggle ? "active" : ""}`}>
          <div className="sidebar-top">
            <BiX className="toggle-i" onClick={() => setToggle(false)} />
            <img src={logo} alt="" />
          </div>
          <div className="sidebar-links">
            <NavLink
              to="/"
              className="sidebar-link "
              onClick={() => setToggle(false)}
            >
              <AiFillHome />
              <div className="link-content">
                <span>Home</span>
              </div>
            </NavLink>
            <NavLink
              to="/yourpost"
              className="sidebar-link"
              onClick={() => setToggle(false)}
            >
              <MdMenuBook />
              <div className="link-content">
                <span>Your Post</span>
              </div>
            </NavLink>
            <NavLink
              to="/about"
              className="sidebar-link"
              onClick={() => setToggle(false)}
            >
              <IoMdCart />
              <div className="link-content">
                <span>About</span>
              </div>
            </NavLink>
            <NavLink
              to="/contact"
              className="sidebar-link"
              onClick={() => setToggle(false)}
            >
              <BsFillCartCheckFill />
              <div className="link-content">
                <span>Contact</span>
              </div>
            </NavLink>
            {loggedIn ? (
              <div className="bottom-links">
                <NavLink className="profile" style={NavLinkStyle} to="/profile">
                  {userImg ? (
                    <img src={userImg} alt="" />
                  ) : (
                    <img src={defaultImg} alt="default" />
                  )}

                  <span>Profile</span>
                </NavLink>
                <div onClick={logout} className="logout">
                  Logout
                </div>
              </div>
            ) : (
              <div className="bottom-links">
                <NavLink
                  to="/login"
                  className="link"
                  onClick={() => setToggle(false)}
                >
                  Login
                </NavLink>
                <Link
                  to="/signup"
                  className="link btn"
                  onClick={() => setToggle(false)}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
