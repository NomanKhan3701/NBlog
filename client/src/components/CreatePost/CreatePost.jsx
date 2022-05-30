import React, { useState, useEffect, useRef } from "react";
import FileUpload from "../FileUpload/FileUpload";
import "./CreatePost.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const server_base_url = import.meta.env.VITE_SERVER_BASE_URL;


const CreatePost = () => {
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
    toast.error("Fields cannot be empty.", { position: "top-center" });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
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
