import React, { useEffect, useState } from "react";
import DialogActionPost from "./../post/dialogAction";
import Addcomments from "./../post/addcomments";
import { Action } from "./../post/action";
import { ListComment } from "./ListComment";
import Caption from "./../post/caption";
import { SkeletonImagePost } from "./../../skeletons/Skeletons";
import moment from "moment";

const PostDetail = (props) => {
  const { setPopup, popup, item, getFirstPage, getTwoPage } = props;
  const [action, setAction] = useState(false);
  const [comment, setComment] = useState({ text: "", realtime: null });
  const [skt, setSkt] = useState(true);

  useEffect(() => {
    cancleShow();
    return () => clearTimeout(cancleShow);
  }, []);

  const cancleShow = () => {
    setTimeout(() => {
      setSkt(false);
    }, 500);
  };

  const onClose = () => {
    setAction(false);
  };

  const checkFile = () => {
    if (item) {
      if (item?.fileTypes === "IMAGE") {
        return (
          <div className="flex justify-center h-full">
            <img
              src={`https://mxhld.herokuapp.com/v1/file/${item?.file}`}
              alt="userpost"
              className="w-full object-cover "
            />
          </div>
        );
      }
      if (item?.fileTypes === "VIDEO") {
        return (
          <div
            style={{ border: "1px solid #91a3b0" }}
            className="flex justify-center bg-black "
          >
            <video
              style={{
                height: "550px",
              }}
              className="w-full focus:outline-none"
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.file}`}
              />
            </video>
          </div>
        );
      }
      if (item?.fileTypes === "AUDIO") {
        return (
          <div className="flex h-full justify-center items-center bg-gradient-to-r from-green-400 via-yellow-500 to-pink-500">
            <audio className="w-4/5 focus:outline-none" controls>
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.file}`}
              />
            </audio>
          </div>
        );
      }
    }
    return (
      <div className="flex justify-center h-full">
        <img
          src="/assets/image/no-pictures.png"
          alt="userpost"
          className="w-full object-cover p-24"
        />
      </div>
    );
  };

  return (
    <>
      <DialogActionPost
        item={item}
        open={action}
        onClose={onClose}
        getFirstPage={getFirstPage}
        setPopup={setPopup}
        popup={popup}
      ></DialogActionPost>

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
            {skt && <SkeletonImagePost />}
            {checkFile()}
          </div>
          <div className="post-show col-span-2">
            <div className="flex items-center mt-2 pl-2">
              <img
                className="rounded-full w-12 h-12 mr-3"
                src={`https://mxhld.herokuapp.com/v1/image/${item?.user.avatar}`}
                alt="img"
              />
              <div className="flex-1 pr-4 flex items-center justify-between">
                <p className="font-bold text-md">{item?.user.fullname}</p>

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

              <ListComment item={item} comment={comment} />
            </div>

            <div className="absolute w-1/2 transform top-3/4 -translate-y-6">
              <hr />
              <Action toggleCheck={popup.isShow} item={item} />
              <p className="ml-4 mb-2 italic text-xs text-gray-400">
                {moment(item?.createdAt).fromNow()}
              </p>
              <div className=" transform translate-x-4 mr-2">
                <Addcomments
                  yourcomment={comment}
                  setyourComment={setComment}
                  item={item}
                  getFirstPage={getFirstPage}
                  getTwoPage={getTwoPage}
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
