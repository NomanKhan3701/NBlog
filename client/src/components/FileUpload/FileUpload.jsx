import React, { useRef, useEffect, useState } from "react";
import "./FileUpload.scss";

const FileUpload = (props) => {
  const fileRef = useRef();
  const dragRef = useRef(null);
  const [prevImg, setprevImg] = useState();
  const [files, setfiles] = useState([]);

  const handleFileBtnClick = () => {
    fileRef.current.click();
  };

  const handleFile = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      props.setFiles((prevFiles) => {
        return [...prevFiles, e.target.files[i]];
      });
      setfiles((prevFiles) => {
        return [...prevFiles, e.target.files[i]];
      });
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      setprevImg(e.target.result);
      props.setPrevImg(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "dragOver") dragRef.current.classList.add("active");
    else if (type === "dragLeave") dragRef.current.classList.remove("active");
  };

  const handleDrop = (e) => {
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
    var reader = new FileReader();
    reader.onload = function (e) {
      setPrevImg(e.target.result);
    };
    reader.readAsDataURL(uploadedFiles[0]);

    dragRef.current.classList.remove("uploading");
  };

  return (
    <div className="file-upload">
      {files.length === 0 ? (
        <div className="upload-img">
          <div
            ref={dragRef}
            className="drop-area grid-cc"
            onDragOver={(e) => handleDrag(e, "dragOver")}
            onDragLeave={(e) => handleDrag(e, "dragLeave")}
            onDrop={handleDrop}
          >
            <h3>Drag & Drop Images here</h3>
            <span>OR</span>
            <div className="browse-btn" onClick={handleFileBtnClick}>
              Browse Files
            </div>
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
      ) : (
        <div className="image-preview">
          <img id="prev-img" src={prevImg} alt="image preview" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
