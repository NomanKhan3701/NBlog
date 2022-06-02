import React, { useState, useEffect, useRef } from "react";
import FileUpload from "../FileUpload/FileUpload";
import "./CreatePost.scss";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;

const CreatePost = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [Img, setImg] = useState();
  const [post, setPost] = useState({
    title: "",
    desc: "",
    tags: "",
  });

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const createPost = () => {
    if (post.title === "" || post.desc === "" || post.tags === "") {
      toast.error("Fields cannot be empty.", { position: "top-center" });
      return;
    }
    const userId = localStorage.getItem("blogUser");
    if (userId) {
      const tags = post.tags.split(",").map(function (value) {
        return value.trim();
      });
      axios
        .post(`${server_base_url}/post/createPost/${userId}`, {
          title: post.title,
          desc: post.desc,
          tags: tags,
          img: Img,
        })
        .then((res) => {
          const url = window.location.pathname.split("/");
          console.log(url);
          if (url.length > 0 && url[1] === "yourpost") {
            window.location.reload(false);
          } else navigate("/yourpost");
          toast.success("Post created succesfully", { position: "top-center" });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <form className="create-post">
        <h1>Create Post</h1>
        <div className="input">
          <input
            name="title"
            value={post.title}
            onChange={handleOnChange}
            type="text"
            placeholder="Enter title..."
          />
        </div>
        <div className="textarea">
          <textarea
            name="desc"
            value={post.desc}
            onChange={handleOnChange}
            placeholder="Enter description..."
          />
        </div>
        <div className="textarea">
          <textarea
            name="tags"
            value={post.tags}
            onChange={handleOnChange}
            type="text"
            placeholder="Enter tags comma(,) separated e.g. study,learn,create "
          />
        </div>
        <FileUpload setFiles={setFiles} setPrevImg={setImg} />

        <div onClick={createPost} className="post btn">
          Post
        </div>
      </form>
    </>
  );
};

export default CreatePost;
