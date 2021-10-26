import React, { createContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Post } from "./../post/post";
import Postshow from "./postshow";

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

export const Timeline = () => {
  
  const [toggle, setToggle] = useState({ isShow: false, postData: {} });

  useEffect(() => {
    if (toggle.isShow) {
      document.body.className = "overflow-hidden";
      return;
    }
    document.body.className = "overflow-auto";
  }, [toggle]);
  return (
    <div
      className="md:col-span-2 sm:col-start-1 sm:col-end-7 md:py-16 md:px-0 lg:px-12 xl:p-16  py-16"
    >
      <Postshow setToggle={setToggle} toggle={toggle} />

      {data.map((item) => {
        return <Post key={item.id} item={item} setToggle={setToggle} />;
      })}
      {/* )} */}
    </div>
  );
}
