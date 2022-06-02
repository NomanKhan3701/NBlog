import React, { useState, useEffect } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import axios from "axios";
import "./YourPost.scss";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const YourPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      setLoggedIn(true);
      axios
        .get(`${server_base_url}/post/getUserPost/${userId}`)
        .then((res) => {
          setPosts(res.data.posts);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [navigate]);

  return (
    <div className="your-post">
      {loggedIn ? (
        <>
          <div className="posts-container">
            {loading ? (
              <div className="post-loader">
                <Loader />
              </div>
            ) : posts.length === 0 ? (
              <div className="no-post">No post created yet</div>
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
                    createdBy={post.createdBy}
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
