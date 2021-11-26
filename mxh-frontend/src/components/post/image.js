import React, { useState } from "react";

export const Image = ({ src }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState();
  const checkFile = () => {
    if (userImage) {
      if (
        selectedImage.type === "image/jpeg" ||
        selectedImage.type === "image/png" ||
        selectedImage.type === "image/gif"
      ) {
        return (
          <img
            src={userImage}
            alt="userpost"
            className="w-full h-cus py-2"
            style={{
              width: "550px",
              height: "550px",
            }}
          />
        );
      }
      if (selectedImage.type === "video/mp4") {
        return (
          <video
            style={{
              width: "550px",
              height: "550px",
            }}
            className="w-full h-cus py-2"
            controls
          >
            <source src={userImage} />
          </video>
        );
      }
    }
  };
  return (
    <div>
      {/* {checkFile()} */}
      <img
        src={"/assets/image/votui.jpg"}
        alt="userpost"
        className="w-full h-cus py-2 object-cover"
        style={{
          width: "550px",
          height: "550px",
        }}
      />
    </div>
  );
};
