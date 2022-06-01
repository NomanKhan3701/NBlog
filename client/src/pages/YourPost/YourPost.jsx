import React, { useState, useEffect } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import axios from "axios";
import "./YourPost.scss";
import Loader from "../../components/Loader/Loader";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const YourPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      setLoggedIn(true);
      axios
        .get(`${server_base_url}/post/getUserPost/${userId}`)
        .then((res) => {
          setPosts(res.data.posts);
        })
        .catch((e) => console.log(e));
    }
    setLoading(false);
  }, []);

  return (
    <div className="your-post">
      {loggedIn ? (
        <>
          <div className="posts-container">
            {loading ? (
              <Loader />
            ) : (
              posts.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    id={post._id}
                    title={post.title}
                    desc={post.desc}
                    img={post.img}
                    like={post.like.length}
                  />
                );
              })
            )}
          </div>
          <div className="create-post-container">
            <CreatePost />
          </div>
        </>
      ) : (
        <div className="login-false">Please login to add posts</div>
      )}
    </div>
  );
};

export default YourPost;
