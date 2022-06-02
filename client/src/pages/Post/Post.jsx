import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import "./Post.scss";
import { BiLike, BiComment } from "react-icons/bi";
import defaultImg from "../../assets/defaultAvatar.png";
import moment from "moment";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const Post = () => {
  const { id } = useParams();
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComment, setLoadingComment] = useState(true);
  const [post, setPost] = useState([]);
  const [creator, setCreator] = useState([]);
  const [comments, setComments] = useState([]);
  const [currUser, setCurrUser] = useState([]);
  const [comment, setComment] = useState("");
  const commentRef = useRef();

  useEffect(() => {
    axios
      .get(`${server_base_url}/post/getPost/${id}`)
      .then((res) => {
        setPost(res.data.post);
        const url = window.location.pathname.split("/");
        if (url.length > 3 && url[3] === "comment") {
          window.scrollTo({
            top: commentRef.current.offsetTop - 100,
            behavior: "smooth",
          });
        }
        setLoadingPost(false);
        axios
          .get(`${server_base_url}/user/${res.data.post.createdBy}`)
          .then((res) => {
            setCreator(res.data.user);
          })
          .catch((e) => console.log(e));
        const userId = localStorage.getItem("blogUser");
        if (userId) {
          axios
            .get(`${server_base_url}/user/${userId}`)
            .then((res) => {
              setCurrUser(res.data.user);
            })
            .catch((e) => console.log(e));
        }
        getComments();
      })
      .catch((e) => console.log(e));
    setLoadingPost(false);
  }, []);

  const getComments = () => {
    axios
      .get(`${server_base_url}/post/getComments/${id}`, {})
      .then((res) => {
        setComments(res.data.Comments);
        setLoadingComment(false);
      })
      .catch((e) => console.log(e));
  };

  const postComment = () => {
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      if (comment.length < 1) {
        toast.error("Comment field cant be empty", { position: "top-center" });
      } else {
        const copyComment = comment;
        setComment("");
        axios
          .post(`${server_base_url}/comment/postComment/${id}`, {
            userId: userId,
            desc: copyComment,
          })
          .then((res) => {
            console.log(res);
            getComments();
          })
          .catch((e) => console.log(e));
      }
    } else {
      toast.error("Please login to comment", { position: "top-center" });
    }
  };

  return (
    <div className="post-container">
      {loadingPost ? (
        <div className="post-loader">
          <Loader />
        </div>
      ) : (
        <div className="post">
          <h1>{post.title}</h1>
          <div className="img">
            <img src={post.img}></img>
          </div>
          <div className="desc">{post.desc}</div>
          <div className="creator-container">
            <div className="user-info">
              <img src={creator.img} alt="" />
              <div className="created-by">
                <span>Created By</span>
                <div className="username">{creator.name}</div>
              </div>
            </div>
            <div className="post-created-at">
              <span>Created At : </span>
              {moment(post.createdAt).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>
      )}
      <div ref={commentRef} className="comment-container">
        <div className="top">
          <img src={currUser.img ? currUser.img : defaultImg} alt="" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add Comment..."
          />
          <div className="btn" onClick={postComment}>
            Comment
          </div>
        </div>
        {loadingComment ? (
          <div className="comment-loader">
            <Loader />
          </div>
        ) : comments?.length === 0 ? (
          <div className="no-comments">
            No comments yet, be the first one to comment
          </div>
        ) : (
          <div id="comment" className="comments">
            {comments.map((comment, index) => {
              return (
                <div key={index} className="comment-container">
                  <div className="comment">
                    <div className="comment-top">
                      {comment.user.img ? (
                        <img src={comment.user.img} alt="" />
                      ) : (
                        <img src={defaultImg} alt="deafult" />
                      )}
                      <div className="user-info">
                        <div className="user-name-time">
                          <div className="username">{comment.user.name}</div>
                          <div className="time">
                            {moment(comment.postedAt).format("DD/MM/YYYY")}
                          </div>
                        </div>
                        <div className="desc">{comment.desc}</div>
                      </div>
                    </div>
                    <div className="comment-bottom">
                      <div className="like">
                        <BiLike />
                        <span>
                          {comment.like.length === 0
                            ? "Like"
                            : comment.like.length}
                        </span>
                      </div>
                      <div className="btn">Reply</div>
                    </div>
                  </div>
                  <div className="replies">
                    {comment?.replies?.map((reply, index) => {
                      return (
                        <div key={index} className="reply">
                          <div className="comment-top">
                            {reply.user.img ? (
                              <img src={reply.user.img} alt="" />
                            ) : (
                              <img src={defaultImg} alt="deafult" />
                            )}
                            <div className="user-info">
                              <div className="user-name-time">
                                <div className="username">
                                  {reply.user.name}
                                </div>
                                <div className="time">
                                  {moment(reply.postedAt).format("DD/MM/YYYY")}
                                </div>
                              </div>
                              <div className="desc">{reply.desc}</div>
                            </div>
                          </div>
                          <div className="comment-bottom">
                            <div className="like">
                              <BiLike />
                              <span>
                                {reply.like.length === 0
                                  ? "Like"
                                  : reply.like.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
