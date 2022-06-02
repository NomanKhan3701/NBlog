import React, { useEffect, useRef, useState } from "react";
import "./PostCard.scss";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import LimitChar from "../LimitChar/LimitChar";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const PostCard = (props) => {
  const likeRef = useRef(null);
  const bookmarkRef = useRef(null);
  const [UserId, setUserId] = useState();
  const [likeCount, setLikeCount] = useState(props.like);

  useEffect(() => {
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      setUserId(userId);
      axios
        .get(`${server_base_url}/post/checkLike/${props.id}`, {
          params: { id: userId },
        })
        .then((res) => {
          if (res.data.liked) likeRef.current.classList.add("active");
        })
        .catch((e) => console.log(e));
      axios
        .get(`${server_base_url}/post/checkbookmark/${props.id}`, {
          params: { id: userId },
        })
        .then((res) => {
          if (res.data.bookmarked) bookmarkRef.current.classList.add("active");
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const like = () => {
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      if (userId != props.createdBy) {
        likeRef.current.classList.toggle("active");
        axios
          .patch(`${server_base_url}/post/updateLike/${props.id}`, {
            userId: userId,
          })
          .then((res) => {
            if (res.data.sameUser) likeRef.current.classList.remove("active");
            else if (res.data.liked) likeRef.current.classList.add("active");
            else likeRef.current.classList.remove("active");
            setLikeCount(res.data.count);
          })
          .catch((e) => console.log(e));
      }
    } else {
      toast.error("You have to login to like", { position: "top-center" });
    }
  };

  const bookmark = () => {
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      bookmarkRef.current.classList.toggle("active");
      axios
        .patch(`${server_base_url}/post/addBookmark/${props.id}`, {
          userId: userId,
        })
        .then((res) => {
          if (res.data.bookmarked) bookmarkRef.current.classList.add("active");
          else bookmarkRef.current.classList.remove("active");
        })
        .catch((e) => console.log(e));
    } else {
      toast.error("You have to login to bookmark", { position: "top-center" });
    }
  };

  return (
    <div className="post-card">
      <Link to={`/post/${props.id}`}>
        <div className="img">
          <img src={props.img} alt="" />
          <div className="title">{props.title}</div>
        </div>
      </Link>

      <div className="desc">
        <LimitChar word={props.desc} limit={170} />
      </div>
      <div className="card-bottom flex-cc">
        <div className="left flex-cc">
          <div ref={likeRef} className="i like" onClick={like}>
            <AiTwotoneLike />
            <div className="like-count">
              {likeCount === 0 ? "Like" : likeCount}
            </div>
          </div>
          <div className="i comment">
            <BiComment />
            <span>Comment</span>
          </div>
        </div>
        <div className="right flex-cc">
          {props.createdBy === UserId ? (
            <div className="i">
              <MdDelete className="del" />
            </div>
          ) : (
            ""
          )}
          <div ref={bookmarkRef} className="i bookmark" onClick={bookmark}>
            <BsFillBookmarkFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
