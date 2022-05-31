import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";
import "./Home.scss";
import Loader from "../../components/Loader/Loader";

const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${server_base_url}/post/`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((e) => console.log(e));
    setLoading(false);
  }, []);

  return (
    <div className="home">
      <div className="posts-container flex-cc">
        {loading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          posts.map((post, index) => {
            return (
              <PostCard
                id={post._id}
                key={index}
                title={post.title}
                desc={post.desc}
                img={post.img}
                like={post.like.length}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
