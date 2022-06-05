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
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams("");
  const [skip, setSkip] = useState(0);
  const [intersected, setIntersected] = useState(false);
  const navigate = useNavigate();
  const intersectionDiv = useRef();
  const options = {
    rootMargin: "100px",
  };

  const setSkipToLoadMore = async () => {
    if (skip != posts.length && !loading) {
      setSkip(posts.length);
      setIntersected(false);
    }
  };

  if (intersected) {
    setSkipToLoadMore();
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIntersected(true);
      },
      [options]
    );

    if (intersectionDiv.current) {
      observer.observe(intersectionDiv.current);
    }

    return () => {
      if (intersectionDiv.current) observer.unobserve(intersectionDiv.current);
    };
  }, []);

  useEffect(() => {
    const url = window.location.pathname.split("/");
    if (
      !(url.length > 2 && url[1] === "posts" && url[2] === "search") &&
      posts.length != 0
    ) {
      getHomePosts(0);
    } else if (
      !(url.length > 2 && url[1] === "posts" && url[2] === "search") &&
      posts.length === 0
    ) {
      getHomePosts(1);
    }
  }, [skip, navigate, searchParams]);

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
        if (res.data.posts.length === 0) setHasMore(false);
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

  return (
    <div className="home">
      <div className="posts-container flex-cc">
        {loading && window.location.pathname.split("/").length > 2 ? (
          <div className="loader">
            <Loader />
          </div>
        ) : posts.length === 0 && !loading ? (
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
      <div ref={intersectionDiv} className="intersection-observer"></div>
      {loading && window.location.pathname.split("/").length < 3 ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
