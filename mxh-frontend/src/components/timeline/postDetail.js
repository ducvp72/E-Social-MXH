import React, { useEffect, useState } from "react";
import DialogActionPost from "./../post/dialogAction";
import Addcomments from "./../post/addcomments";
import { Action } from "./../post/action";
import { ListComment } from "./ListComment";
import Caption from "./../post/caption";

const PostDetail = (props) => {
  const { setPopup, popup, item } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState();
  const [action, setAction] = useState(false);
  // const [comment, setComment] = useState("");
  const [comment, setComment] = useState({ text: "", realtime: null });

  useEffect(() => {
    // console.log("render");
    // console.log("comments from child", comment);
    // console.log("Get Comment and Key", comment);
  });

  const onClose = () => {
    setAction(false);
  };

  const checkFile = () => {
    if (userImage) {
      if (
        selectedImage.type === "image/jpeg" ||
        selectedImage.type === "image/png" ||
        selectedImage.type === "image/gif"
      ) {
        return (
          <img
            alt="anh2"
            src={userImage}
            className="object-cover"
            width="800px"
            height="100%"
          />
        );
      }
      if (selectedImage.type === "video/mp4") {
        return (
          <video
            style={{
              width: "800px",
            }}
            className="w-full h-cus "
            controls
          >
            <source src={userImage} />
          </video>
        );
      }
    }
  };

  return (
    <>
      <DialogActionPost open={action} onClose={onClose}></DialogActionPost>
      <div
        className="post-show fixed w-full h-screen opacity-80 z-40 top-0 left-0 flex justify-end items-start"
        style={{ background: "#7d7d7d" }}
      >
        <div className=" flex justify-center items-center justify-items-center rounded-full bg-none ">
          <i
            className="fas fa-times fa-2x cursor-pointer mr-4"
            style={{ color: "#e5e5e5" }}
            onClick={() => setPopup({ ...popup, isShow: false })}
          ></i>
        </div>
      </div>

      <div
        className=" shadow-xl bg-white fixed z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        style={{ width: "64rem", height: "550px" }}
      >
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-2 h-full overflow-hidden">
            <img
              alt="anh2"
              src="/assets/image/votui.jpg"
              className="object-cover"
              width="800px"
              height="100%"
            />
            {/* {checkFile()} */}
          </div>
          <div className="post-show col-span-2">
            <div className="flex items-center mt-2 pl-2">
              <img
                className="rounded-full w-10 mr-3"
                src="/assets/image/defaultAvatar.png"
                alt="img"
              />
              <div className="flex-1 pr-4 flex items-center justify-between">
                <p className="font-bold text-md">username</p>

                <p
                  onClick={() => {
                    setAction(!action);
                  }}
                  className=" font-black text-2xl cursor-pointer text-gray-400"
                >
                  ...
                </p>
              </div>
            </div>
            <hr className="mt-2 " />
            <div
              id="scrollableDiv"
              className=" relative overflow-y-auto overflow-x-hidden post-show w-full"
              style={{ height: "20rem" }}
            >
              <div className="mb-2">
                <Caption item={item} />
              </div>

              <ListComment comment={comment} />
            </div>

            <div className="absolute w-1/2 transform top-3/4 -translate-y-6">
              <hr />
              <Action toggleCheck={popup.isShow} />
              <p className="ml-4 mb-2 italic text-xs text-gray-400">
                21 hours ago
              </p>
              <div className=" transform translate-x-4 mr-2">
                <Addcomments
                  yourcomment={comment}
                  setyourComment={setComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
