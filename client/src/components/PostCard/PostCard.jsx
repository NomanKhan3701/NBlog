import React from "react";
import "./PostCard.scss";
import { BsBookmark } from "react-icons/bs";
import { BiLike, BiComment } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import LimitChar from "../LimitChar/LimitChar";
import { Link } from "react-router-dom";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const PostCard = (props) => {
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
          <div className="i">
            <BiLike />
            <div className="like-count">
              {props.like === 0 ? "Like" : props.like}
            </div>
          </div>
          <div className="i">
            <BiComment />
            <span>Comment</span>
          </div>
        </div>
        <div className="right flex-cc">
          <div className="i">
            <MdDelete className="del" />
          </div>
          <div className="i">
            <BsBookmark />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
