import React, { createContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Post } from "./../post/post";
import Postshow from "./postshow";
import { useSelector } from "react-redux";
import CreatePost from "./createPost";
import Button from "@mui/material/Button";

const data = [
  {
    id: 1,
    caption: "Tôi không còn là Lâm của ngày xưa nữa đâu nha",
  },
  {
    id: 2,
    caption: "b",
  },

  {
    id: 3,
    caption: "c",
  },
  {
    id: 4,
    caption: "d",
  },
];

export const Timeline = (props) => {
  // const { currentUser } = props;

  const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [createPost, setCreatePost] = useState(false);
  const [createEmoji, setCreateEmoji] = useState(true);
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    if (toggle.isShow) {
      document.body.className = "overflow-hidden";
      return;
    }
    document.body.className = "overflow-auto";
  }, [toggle]);
  const onClose = () => {
    setCreatePost(false);
  };

  return (
    <div className="md:col-span-2 sm:col-start-1 sm:col-end-7 md:py-16 md:px-0 lg:px-12 xl:p-16  py-16">
      <Postshow setToggle={setToggle} toggle={toggle} />
      <CreatePost
        open={createPost}
        onClose={onClose}
        onCloseEmoji={createEmoji}
      />

      <div className="rounded border border-gray-primary mb-5 md:mr-16 sm:mr-1 lg:mr-0 shadow-md">
        <div class=" flex" onClick={() => setCreatePost(!createPost)}>
          <input
            className="bg-gray-200 font-avatar text-mygrey text-md hover:bg-gray-300 font-mono m-3 rounded-full cursor-pointer appearance-none  w-full py-2 px-4  focus:outline-none focus:bg-white"
            type="text"
            value={
              currentUser &&
              `Hi ${currentUser.fullname}, click here to create your post... !`
            }
            name="post"
            disabled
            onClick={() => () => setCreatePost(!createPost)}
          />
        </div>
      </div>

      {data.map((item) => {
        return <Post key={item.id} item={item} setToggle={setToggle} />;
      })}
      {/* )} */}
    </div>
  );
};
