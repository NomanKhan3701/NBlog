import React, { useRef, useEffect, useState } from "react";
import defaultImg from "../../assets/defaultAvatar.png";
import "./ImgUpdateUpload.scss";

const FileUpload = (props) => {
  const fileRef = useRef();
  const dragRef = useRef(null);
  const [prevImg, setprevImg] = useState();
  const [files, setfiles] = useState([]);

  const handleFileBtnClick = () => {
    fileRef.current.click();
  };

  const process = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;

      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;

        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
        setprevImg(srcEncoded);
        props.setPrevImg(srcEncoded);
      };
    };
  };

  const handleFile = async (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      props.setFiles((prevFiles) => {
        return [...prevFiles, e.target.files[i]];
      });
      setfiles((prevFiles) => {
        return [...prevFiles, e.target.files[i]];
      });
    }
    await process(e.target.files[0]);
  };

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "dragOver") dragRef.current.classList.add("active");
    else if (type === "dragLeave") dragRef.current.classList.remove("active");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current.classList.remove("active");
    const uploadedFiles = e.dataTransfer.files;
    dragRef.current.classList.add("uploading");
    for (let i = 0; i < uploadedFiles.length; i++) {
      props.setFiles((prevFiles) => {
        return [...prevFiles, uploadedFiles[i]];
      });
      setfiles((prevFiles) => {
        return [...prevFiles, uploadedFiles[i]];
      });
    }
    await process(uploadedFiles[0]);
    dragRef.current.classList.remove("uploading");
  };

  return (
    <div className="img-update-upload">
      <div className="upload-img" onClick={handleFileBtnClick}>
        <div
          ref={dragRef}
          className="img"
          onDragOver={(e) => handleDrag(e, "dragOver")}
          onDragLeave={(e) => handleDrag(e, "dragLeave")}
          onDrop={handleDrop}
        >
          <img
            src={prevImg ? prevImg : props.img ? props.img : defaultImg}
            alt=""
          />
          <input
            ref={fileRef}
            type="file"
            onChange={handleFile}
            multiple
            hidden
            id="myFile"
            name="filename"
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
