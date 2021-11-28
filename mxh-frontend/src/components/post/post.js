import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Image } from "./image";
import { Action } from "./action";
import { Comment } from "./comment";
import Caption from "./caption";
import PostDetail from "./../timeline/postDetail";
import { CurrentComment } from "./currentlistComment";
import CommentOutSide from "./commentOutSide";
import { useSelector } from "react-redux";

let fakedata = [
  { id: 1, name: "duc", text: "duc dep trai wa" },
  {
    id: 2,
    name: "duy",
    text: "Duy xau trai wa",
  },
];

export const Post = (item) => {
  const [popup, setPopup] = useState({ isShow: false, postData: {} });
  const [addCmt, setAddCmt] = useState({ text: "", realtime: null });
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    if (addCmt && addCmt.text !== "")
      fakedata = [
        {
          id: addCmt.realtime,
          name: currentUser?.fullname,
          text: addCmt.text,
        },
        ...fakedata,
      ];
    console.log("outside", addCmt);
  }, [addCmt]);

  useEffect(() => {
    if (popup.isShow) {
      document.body.className = "overflow-hidden";
      return;
    }
    document.body.className = "overflow-auto";
  }, [popup.isShow]);

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10 md:mr-16 sm:mr-1 lg:mr-0">
      <Header />

      <Caption item={item} />

      <Image item={item} />

      <Action item={item} setPopup={setPopup} popup={popup} />

      <Comment setPopup={setPopup} popup={popup} />

      {fakedata.map((cmt) => {
        return <CurrentComment key={cmt.id} item={cmt} />;
      })}

      <CommentOutSide setAddCmt={setAddCmt} addCmt={addCmt} />

      {popup.isShow && (
        <PostDetail item={item} setPopup={setPopup} popup={popup} />
      )}
    </div>
  );
};
