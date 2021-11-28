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
import { postApi } from "./../../axiosApi/api/postApi";

let fakedata = [
  { id: 1, name: "duc", text: "duc dep trai wa" },
  {
    id: 2,
    name: "duy",
    text: "Duy xau trai wa",
  },
];

export const Post = (props) => {
  const { item } = props;
  const [popup, setPopup] = useState({ isShow: false, postData: {} });
  const currentUser = useSelector((state) => state.auth.data);
  const [twoCmt, setTwoComt] = useState([]);
  const [comment, setComment] = useState({ text: "", realtime: null });

  // useEffect(() => {
  //   if (addCmt && addCmt.text !== "")
  //     setTwoComt(
  //       {
  //         id: addCmt.realtime,
  //         name: currentUser?.fullname,
  //         text: addCmt.text,
  //       },
  //       ...twoCmt
  //     );

  // }, [addCmt]);

  // useEffect(() => {
  //   if (addCmt.length>0)
  //     setTwoComt(
  //       {
  //         id: addCmt.realtime,
  //         name: currentUser?.fullname,
  //         text: addCmt.text,
  //       },
  //       ...twoCmt
  //     );

  // }, [addCmt]);

  useEffect(() => {
    const value = {
      id: comment.realtime,
      user: {
        fullname: currentUser?.fullname,
        avatar: currentUser?.avatar,
      },
      text: comment.text,
    };
    if (comment) {
      setTwoComt([value, ...twoCmt]);
    }
  }, [comment.realtime]);

  useEffect(() => {
    if (popup.isShow) {
      document.body.className = "overflow-hidden";
      return;
    }
    document.body.className = "overflow-auto";
  }, [popup.isShow]);

  useEffect(() => {
    getTwoPage();
  }, []);

  const getTwoPage = async () => {
    postApi
      .getTwoComments(item?.id)
      .then((rs) => {
        if (rs) setTwoComt(rs.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("Postwo", twoCmt);

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10 md:mr-16 sm:mr-1 lg:mr-0">
      <Header item={item} />

      <Caption item={item} />

      <Image item={item} />

      <Action item={item} setPopup={setPopup} popup={popup} />

      <Comment setPopup={setPopup} popup={popup} item={item} />

      {twoCmt.map((cmt) => {
        return <CurrentComment key={cmt.id} item={cmt} />;
      })}

      <CommentOutSide
        getTwoPage={getTwoPage}
        item={item}
        yourcomment={comment}
        setyourComment={setComment}
      />

      {popup.isShow && (
        <PostDetail item={item} setPopup={setPopup} popup={popup} />
      )}
    </div>
  );
};
