import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Image } from "./image";
import { Action } from "./action";
import { Comment } from "./comment";
import Caption from "./caption";
import PostDetail from "./../timeline/postDetail";
import { CurrentComment } from "./currentlistComment";
import CommentOutSide from "./commentOutSide";
import { postApi } from "./../../axiosApi/api/postApi";

export const Post = (props) => {
  const { item, getFirstPage } = props;
  const [popup, setPopup] = useState({ isShow: false, postData: {} });
  const [twoCmt, setTwoComt] = useState([]);
  const [update, setUpdate] = useState(7);

  useEffect(() => {
    if (popup.isShow) {
      document.body.className = "overflow-hidden";
      return;
    }
    document.body.className = "overflow-auto";
  }, [popup.isShow]);

  useEffect(() => {
    getTwoPage();
    return () => {
      setTwoComt(null);
    };
  }, []);

  const getTwoPage = async () => {
    // console.log("cmt o day ne ?");
    postApi
      .getTwoComments(item?.id)
      .then((rs) => {
        setTwoComt(rs.data.results);
        // console.log("Postwo", twoCmt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10 md:mr-16 sm:mr-1 lg:mr-0">
      <Header getFirstPage={getFirstPage} item={item} />

      <Caption item={item} />

      <Image item={item} setPopup={setPopup} popup={popup} />

      <Action item={item} setPopup={setPopup} popup={popup} />

      <Comment setPopup={setPopup} popup={popup} item={item} />

      {twoCmt?.map((cmt) => {
        return <CurrentComment key={cmt.id} item={cmt} />;
      })}

      <CommentOutSide item={item} getTwoPage={getTwoPage} />

      {popup.isShow && (
        <PostDetail
          item={item}
          setPopup={setPopup}
          popup={popup}
          setUpdate={setUpdate}
          getFirstPage={getFirstPage}
          getTwoPage={getTwoPage}
        />
      )}
    </div>
  );
};
