import React, { useEffect, useState } from "react";
import { Post } from "./../post/post";
import Postshow from "./postshow";
import { useSelector } from "react-redux";
import CreatePost from "./createPost";
import { SkeletonPost } from "../../skeletons/Skeletons";
import { userApi } from "./../../axiosApi/api/userApi";
import axios from "axios";

export const Timeline = () => {
  const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [createPost, setCreatePost] = useState(false);
  const currentUser = useSelector((state) => state.auth.data);
  const [post, setPost] = useState(null);
  const [skt, setSkt] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await axios({
        method: `GET`,
        url: `https://jsonplaceholder.typicode.com/posts`,
      })
        .then((rs) => {
          if (rs) setPost(rs.data);
          console.log("posts", rs ? post : null);
        })
        .catch((err) => {
          console.log(err);
        });

      setSkt(false);
    }, 2000);
    // loopSkeleton();
  }, []);

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
  const loopSkeleton = () => {
    let i = 0;
    for (i = 0; i <= 10; i++) {
      return <SkeletonPost key={i} />;
    }
  };
  return (
    <div className="md:col-span-2 sm:col-start-1 sm:col-end-7 md:py-16 md:px-0 lg:px-12 xl:p-16  py-16">
      <Postshow post={post} setToggle={setToggle} toggle={toggle} />
      <CreatePost open={createPost} onClose={onClose} />

      <div className="rounded border border-gray-primary mb-5 md:mr-16 sm:mr-1 lg:mr-0 shadow-md">
        <div className=" flex" onClick={() => setCreatePost(!createPost)}>
          <input
            className="bg-gray-200 font-avatar text-mygrey text-md hover:bg-gray-300 font-mono m-3 rounded-full cursor-pointer appearance-none  w-full py-2 px-4  focus:outline-none focus:bg-white"
            type="text"
            value={
              currentUser &&
              `Hi ${currentUser?.fullname}, click here to create your post... !`
            }
            name="post"
            disabled
            onClick={() => () => setCreatePost(!createPost)}
          />
        </div>
      </div>
      {skt
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ske) => (
            <SkeletonPost key={ske} />
          ))
        : post &&
          post.map((item) => {
            return <Post key={item.id} item={item} setToggle={setToggle} />;
          })}
    </div>
  );
};
