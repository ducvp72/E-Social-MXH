import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { Footer } from "./../components/post/footer";
import InfititeLoading from "./../containers/LoadingPage/infititeLoading";
import { SkeletonComment } from "./../skeletons/Skeletons";
import { postApi } from "./../axiosApi/api/postApi";
import { useSelector } from "react-redux";

export const ListCommentCrs = (props) => {
  const { state, comment } = props;
  const currentUser = useSelector((state) => state.auth.data);
  const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [cmt, setCmt] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);

  useEffect(() => {
    // console.log("itemIn List", item);
    const value = {
      id: comment.realtime,
      user: {
        fullname: currentUser?.fullname,
        avatar: currentUser?.avatar,
      },
      text: comment.text,
    };
    if (comment) {
      setCmt([value, ...cmt]);
    }
  }, [comment.realtime]);

  useEffect(() => {
    setSkt(true);
    setTimeout(() => {
      getComments();
    }, 500);
    return () => clearTimeout(getComments);
  }, []);

  const getComments = () => {
    postApi
      .getAllComments(state?.id, 1, 5)
      .then((rs) => {
        if (rs) setCmt(rs.data.results);
        setToggle({ ...toggle, postData: rs.data });
        setSkt(false);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        console.log(err);
        setSkt(false);
      });
  };

  const loopSkeleton = () => {
    let arr = [];
    for (let i = 0; i <= 20; i++) {
      arr = [...arr, <SkeletonComment key={i} />];
    }
    return arr;
  };
  const handleFetchPosts = () => {
    return new Promise((resolve, reject) => {
      postApi
        .getAllComments(state?.id, page, 5)
        .then((rs) => {
          if (rs) resolve(rs.data.results);
        })
        .catch((err) => {
          console.log("errPromise", err);
          reject(err);
        });
    });
  };

  const fetchData = async () => {
    const postsFromServer = await handleFetchPosts();
    setCmt([...cmt, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  // console.log("PostApi...", post);
  // console.log("Cmt length", cmt.length);
  return (
    <div>
      {/* <p className=""> here {comment ? comment?.text : null}</p> */}
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={cmt?.length}
        next={fetchData}
        hasMore={noMore}
        loader={
          <div className=" flex justify-center">
            <InfititeLoading />
          </div>
        }
        endMessage={
          <p className="flex justify-center font-avatar text-lg">
            <b>Opp..! You have seen it all</b>
          </p>
        }
      >
        {skt
          ? loopSkeleton()
          : cmt &&
            cmt.map((item) => {
              return <Footer key={item.id} item={item} />;
            })}
      </InfiniteScroll>
    </div>
  );
};
