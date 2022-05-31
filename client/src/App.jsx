import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Post from "./pages/Post/Post";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserDashboard, {
  Bookmarked,
  Liked,
} from "./pages/UserProfile/UserProfile";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import YourPost from "./pages/YourPost/YourPost";
import axios from "axios";
import Loader from "./components/Loader/Loader";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

function App() {
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    if (userId) setLoggedIn(true);
    axios
      .get(`${server_base_url}/user/getUserImage/${userId}`)
      .then((res) => {
        setUserImg(res.data.userImage[0].img);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} img={userImg} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yourpost" element={<YourPost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<UserDashboard />}>
          <Route path="bookmark" element={<Bookmarked />} />
          <Route path="like" element={<Liked />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </div>
  );
}

export default App;
