import { useState } from "react";
import { Routes, Route } from "react-router";
import Post from "./pages/post/Post";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserDashboard from "./pages/UserDashboard/Userdashboard";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import YourPost from "./pages/YourPost/YourPost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yourpost" element={<YourPost/>}/>
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
