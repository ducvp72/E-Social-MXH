import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddCommentCrs from "./addComment-Crs";
import { ActionCrs } from "./actionCrs";
import CaptionCrs from "./captionCrs";
import { ListCommentCrs } from "./listCommentCrs";
const CarouselElement = (props) => {
  const { setPopup, popup, item } = props;
  console.log("item here", item?.text);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState();
  const [comment, setComment] = useState({ text: "", realtime: null });

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
      <Dialog
        open={popup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            className="post-show fixed w-full h-screen opacity-80 z-20 top-0 left-0 flex justify-end items-start"
            style={{ background: "#7d7d7d" }}
          >
            <div className=" flex justify-center items-center justify-items-center rounded-full bg-none ">
              <i
                className="fas fa-times fa-2x cursor-pointer mr-4"
                style={{ color: "#e5e5e5" }}
                onClick={() => setPopup(false)}
              ></i>
            </div>
            <div className=" absolute left-5 top-1/2">
              <i
                onClick={() => {
                  alert("left");
                }}
                className="fas fa-3x fa-chevron-circle-left text-white cursor-pointer"
              />
            </div>
            <div className=" absolute right-5 top-1/2 bg-none">
              <i
                onClick={() => {
                  alert("right");
                }}
                className="fas fa-3x fa-chevron-circle-right text-white cursor-pointer"
              />
            </div>
          </div>
          <div
            className=" z-50 rounded-md shadow-xl bg-white fixed  transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ width: "64rem", height: "650px" }}
          >
            <div className="grid grid-cols-4 h-full">
              <div className="col-span-2 h-full overflow-hidden">
                <img
                  alt="anh"
                  src={"/assets/image/votui.jpg"}
                  className="object-cover"
                  width="600px"
                  height="auto"
                />
              </div>
              <div className="col-span-2 ">
                <div className="flex items-center mt-2 pl-2">
                  <img
                    className="rounded-full w-10 mr-3"
                    src="/assets/image/gift.png"
                    alt=""
                  />
                  <div className="flex-1 pr-4 flex items-center justify-between">
                    <p className="font-bold text-md">username</p>
                    <p className=" font-black text-2xl cursor-pointer text-gray-400">
                      ...
                    </p>
                  </div>
                </div>

                <hr className="mt-2 " />

                <div
                  id="scrollableDiv"
                  className=" relative overflow-y-auto overflow-x-hidden post-show w-full"
                  style={{ height: "26rem" }}
                >
                  <div className="mb-2">
                    <CaptionCrs item={item} />
                  </div>

                  <ListCommentCrs comment={comment} />
                </div>

                <div className="absolute w-1/2 transform top-3/4 -translate-y-2">
                  <hr />
                  <ActionCrs />
                  <p className="ml-4 mb-2 italic text-xs text-gray-400">
                    21 hours ago
                  </p>
                  <div className=" transform translate-x-4 mr-2">
                    <AddCommentCrs
                      yourcomment={comment}
                      setyourComment={setComment}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

        {/* <DialogActionPost open={action} onClose={onClose}></DialogActionPost> */}
      </Dialog>
    </>
  );
};

export default CarouselElement;
