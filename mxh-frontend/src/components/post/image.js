import React, { useState, useEffect } from "react";

export const Image = (item) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState(item?.item.file);
  // console.log("item Video", item?.item.file);

  useEffect(() => {
    if (item) setUserImage(item?.file);
  }, [item]);

  const checkFile = () => {
    if (item) {
      if (item?.item.fileTypes === "IMAGE") {
        return (
          <div
            className="flex items-center justify-center"
            style={{ border: "1px solid #efefef" }}
          >
            <img
              src={`https://mxhld.herokuapp.com/v1/file/${item?.item.file}`}
              alt="userpost"
              className="w-full "
            />
          </div>
        );
      }
      if (item?.item.fileTypes === "VIDEO") {
        return (
          <div className="flex items-center justify-center ">
            <video
              style={{
                width: "550px",
                // height: "550px",
              }}
              className="w-full mt-5"
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.item.file}`}
              />
            </video>
          </div>
        );
      }
      if (item?.item.fileTypes === "AUDIO") {
        return (
          <div className="flex items-center justify-center ">
            <audio
              // style={{
              //   width: "550px",
              //   height: "550px",
              // }}
              className="w-4/5 mt-2 "
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.item.file}`}
              />
            </audio>
          </div>
        );
      }
    }
    return;
  };

  return <div>{checkFile()}</div>;
};
