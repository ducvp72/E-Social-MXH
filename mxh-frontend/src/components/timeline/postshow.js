import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Addcomments from "./../post/addcomments";
import { Action } from "../post/action";
import { Footer } from "../post/footer";
import Caption from "./../post/caption";
import { v4 as uuidv4 } from "uuid";
import "./postshow.css";
const Postshow = (props) => {
  const { toggle, setToggle, post } = props;

  // useEffect(() => {}, [toggle]);
  return (
    <>
      {toggle.isShow && (
        <>
          <div
            className="post-show fixed w-full h-screen opacity-80 z-40 top-0 left-0 flex justify-end items-start"
            style={{ background: "#7d7d7d" }}
          >
            <div className=" flex justify-center items-center justify-items-center rounded-full bg-none ">
              <i
                className="fas fa-times fa-2x cursor-pointer mr-4"
                style={{ color: "#e5e5e5" }}
                onClick={() => setToggle({ ...toggle, isShow: false })}
              ></i>
            </div>
          </div>

          <div
            className=" shadow-xl bg-white fixed z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ width: "900px", height: "650px" }}
          >
            <div className="grid grid-cols-3 h-full">
              <div className="col-span-2 h-full overflow-hidden">
                <img
                  alt="anh2"
                  src="assets/person/lam5.png"
                  className="object-cover"
                  width="600px"
                  height="auto"
                />
              </div>
              <div className="post-show">
                <div className="flex items-center mt-2 pl-2">
                  <img
                    className="rounded-full w-10 mr-3"
                    src="/assets/person/karl.jpg"
                    alt=""
                  />
                  <div className="flex-1 pr-4 flex items-center justify-between">
                    <Link to={"/p/${username}"}>
                      <p className="font-bold text-md">username</p>
                    </Link>
                    <p className=" font-black text-2xl cursor-pointer text-gray-400">
                      ...
                    </p>
                  </div>
                </div>
                {/* <Caption item={toggle.postData} /> */}
                <hr className="mt-2 " />
                <div
                  className=" overflow-y-auto overflow-x-hidden post-show w-full"
                  style={{ height: "26rem" }}
                >
                  {/* <Caption item={toggle.postData} />
                  {post.map((cmt) => {
                    return <Footer key={post.id} cmt={cmt} />;
                  })} */}
                </div>
                <hr className="mt-2" />
                <Action />
                <p className="ml-4 mb-5 italic text-xs text-gray-400">
                  21 hours ago
                </p>
                <Addcomments />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Postshow;