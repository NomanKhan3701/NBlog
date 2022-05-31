import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Post.scss";
import { BiLike, BiComment } from "react-icons/bi";
import dummy from "../../assets/p1.jpg";
import moment from "moment";
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

  useEffect(() => {
    axios
      .get(`${server_base_url}/post/${id}`)
      .then((res) => {
        setPost(res.data.post);
        axios
          .get(`${server_base_url}/user/${res.data.post.createdBy}`)
          .then((res) => {
            setCreator(res.data.user);
            setLoadingPost(false);
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
        axios
          .get(`${server_base_url}/post/getComments/${id}`, {})
          .then((res) => {
            setComments(res.data.comments);
            console.log(res.data.comments);
            setLoadingComment(false);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
    setLoadingPost(false);
  }, []);

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
      <div className="comment-container">
        <div className="top">
          <img src={currUser.img} alt="" />
          <input type="text" placeholder="Add Comment..." />
          <div className="btn">Comment</div>
        </div>
        {loadingComment ? (
          <div className="comment-loader">
            <Loader />
          </div>
        ) : comments.length !== 0 ? (
          <div className="no-comments">
            No comments yet, be the first one to comment
          </div>
        ) : (
          <div className="comments">
            <div className="comment-container">
              <div className="comment">
                <div className="comment-top">
                  <img src={dummy} alt="" />
                  <div className="user-info">
                    <div className="user-name-time">
                      <div className="username">Noman</div>
                      <div className="time">12/02/2022</div>
                    </div>
                    <div className="desc">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aperiam perspiciatis, nobis excepturi voluptas magni
                      quibusdam assumenda amet voluptatibus, distinctio autem
                      iure perferendis! Placeat eius mollitia iure. Repudiandae,
                      magnam? Maxime, optio?
                    </div>
                  </div>
                </div>
                <div className="comment-bottom">
                  <div className="like">
                    <BiLike />
                    <span>Like</span>
                  </div>
                  <div className="btn">Reply</div>
                </div>
              </div>

              <div className="replies">
                <div className="reply">
                  <div className="comment-top">
                    <img src={dummy} alt="" />
                    <div className="user-info">
                      <div className="user-name-time">
                        <div className="username">Noman</div>
                        <div className="time">12/02/2022</div>
                      </div>

                      <div className="desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aperiam perspiciatis, nobis excepturi voluptas
                        magni quibusdam assumenda amet voluptatibus, distinctio
                        autem iure perferendis! Placeat eius mollitia iure.
                        Repudiandae, magnam? Maxime, optio?
                      </div>
                    </div>
                  </div>
                  <div className="comment-bottom">
                    <div className="like">
                      <BiLike />
                      <span>Like</span>
                    </div>
                  </div>
                </div>
                <div className="reply">
                  <div className="comment-top">
                    <img src={dummy} alt="" />
                    <div className="user-info">
                      <div className="user-name-time">
                        <div className="username">Noman</div>
                        <div className="time">12/02/2022</div>
                      </div>

                      <div className="desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aperiam perspiciatis, nobis excepturi voluptas
                        magni quibusdam assumenda amet voluptatibus, distinctio
                        autem iure perferendis! Placeat eius mollitia iure.
                        Repudiandae, magnam? Maxime, optio?
                      </div>
                    </div>
                  </div>
                  <div className="comment-bottom">
                    <div className="like">
                      <BiLike />
                      <span>Like</span>
                    </div>
                  </div>
                </div>
                <div className="reply">
                  <div className="comment-top">
                    <img src={dummy} alt="" />
                    <div className="user-info">
                      <div className="user-name-time">
                        <div className="username">Noman</div>
                        <div className="time">12/02/2022</div>
                      </div>

                      <div className="desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aperiam perspiciatis, nobis excepturi voluptas
                        magni quibusdam assumenda amet voluptatibus, distinctio
                        autem iure perferendis! Placeat eius mollitia iure.
                        Repudiandae, magnam? Maxime, optio?
                      </div>
                    </div>
                  </div>
                  <div className="comment-bottom">
                    <div className="like">
                      <BiLike />
                      <span>Like</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
