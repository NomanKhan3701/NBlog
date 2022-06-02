import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Home.scss";
import Loader from "../../components/Loader/Loader";

const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, [navigate, searchParams]);

  const getPosts = () => {
    const url = window.location.pathname.split("/");
    if (url.length > 2 && url[1] === "posts" && url[2] === "search") {
      setLoading(true);
      axios
        .get(
          `${server_base_url}/post/getPostBySearch?searchQuery=${searchParams.get(
            "searchQuery"
          )} || "none"
          }&tags=${searchParams.get("tags")}`
        )
        .then((res) => {
          setPosts(res.data.posts);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .get(`${server_base_url}/post/`)
        .then((res) => {
          console.log(res.data.posts);
          setPosts(res.data.posts);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  };

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
                createdBy={post.createdBy}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
