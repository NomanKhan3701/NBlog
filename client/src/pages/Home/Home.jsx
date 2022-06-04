import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Home.scss";
import Loader from "../../components/Loader/Loader";

const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams("");
  const [skip, setSkip] = useState(0);
  const navigate = useNavigate();
  const postScrollRef = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const url = window.location.pathname.split("/");
    if (
      !(url.length > 2 && url[1] === "posts" && url[2] === "search") &&
      skip != 0
    ) {
      getHomePosts(0);
    } else if (
      !(url.length > 2 && url[1] === "posts" && url[2] === "search") &&
      skip === 0
    ) {
      getHomePosts(1);
    }
  }, [skip, searchParams]);

  useEffect(() => {
    const url = window.location.pathname.split("/");
    if (url.length > 2 && url[1] === "posts" && url[2] === "search") {
      getSearchPosts();
    }
  }, [navigate, searchParams]);

  const getSearchPosts = () => {
    setLoading(true);
    axios
      .get(`${server_base_url}/post/getPostBySearch`, {
        params: {
          searchQuery: searchParams.get("searchQuery") || "none",
          tags: searchParams.get("tags"),
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const getHomePosts = (type) => {
    setLoading(true);
    axios
      .get(`${server_base_url}/post/`, { params: { skip: skip } })
      .then((res) => {
        console.log("fired");
        if (type == 0)
          setPosts((prevPosts) => [...prevPosts, ...res.data.posts]);
        if (type === 1) setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    console.log("fired");
    if (offsetHeight + scrollTop >= scrollHeight) {
      setSkip(posts.length);
    }
  };

  return (
    <div className="home">
      <div
        ref={postScrollRef}
        className="posts-container flex-cc"
        onScroll={handleScroll}
      >
        {loading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : posts.length === 0 ? (
          <div className="no-posts">No relevant Posts</div>
        ) : (
          posts?.map((post, index) => {
            return (
              <PostCard
                id={post._id}
                key={index}
                title={post.title}
                desc={post.desc}
                img={post.img}
                like={post.like ? post.like.length : 0}
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
