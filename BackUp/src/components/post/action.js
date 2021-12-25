import React from "react";
import { useState, useEffect } from "react";
import { postApi } from "./../../axiosApi/api/postApi";
import { useCookies } from "react-cookie";

export const Action = (props) => {
  const { toggleCheck, setPopup, popup, item } = props;
  const [likes, setLikes] = useState(item?.hasLike);
  const [countLike, setCountLike] = useState(item?.likes);
  const [cookies, ,] = useCookies("auth");

  // useEffect(() => {
  //   console.log("IsLikes", likes);
  //   console.log("CountLike", countLike);
  //   handleFetchPosts();
  // }, [toggleCheck]);

  const handleLiked = async () => {
    setLikes(!likes);
    setCountLike((countLike) => (likes ? countLike - 1 : countLike + 1));
    handleFetchPosts();
  };

  const handleFetchPosts = () => {
    // console.log("chay like");
    return new Promise((resolve, reject) => {
      postApi
        .likePost(cookies.auth.tokens.access.token, { postId: item?.id })
        .then((rs) => {
          // resolve(rs.data);
          // console.log(rs.data.likes);
          return;
        })
        .catch((err) => {
          console.log("errPromise", err);
          // reject(err);
        });
    });
  };

  const handleSetToggle = () => {
    if (toggleCheck === true) {
      return;
    }
    setPopup({ ...popup, isShow: true });
  };

  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <div className="flex">
          <button onClick={handleLiked}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              tabIndex={0}
              className={`${
                likes && "fill-red text-red-primary"
              }  fill-white text-black w-8 mr-2 cursor-pointer border-none focus:outline-none `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          <button onClick={() => handleSetToggle()}>
            <svg
              className="w-8 mr-1 text-black-light select-none cursor-pointer focus:outline-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              tabIndex={0}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>

          <button>
            <svg
              className="w-8 mr-1 text-black-light select-none  cursor-pointer focus:outline-none"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 45 45 "
              width="22"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0}
                fill="currentColor"
                d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-4 py-0">
        <p className=" font-semibold">
          {countLike >= 1000 ? parseInt(countLike / 1000) + "K" : countLike}{" "}
          likes
        </p>
      </div>
    </>
  );
};
