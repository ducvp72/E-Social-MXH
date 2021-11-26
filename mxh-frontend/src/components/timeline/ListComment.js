import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "../../containers/LoadingPage/infititeLoading";
import { Footer } from "./../post/footer";
import { SkeletonComment } from "./../../skeletons/Skeletons";

export const ListComment = () => {
  const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [cmt, setCmt] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);

  useEffect(() => {
    setSkt(true);
    setTimeout(() => {
      getComments();
    }, 500);
    return () => clearTimeout(getComments);
  }, []);

  const getComments = () => {
    axios({
      method: `GET`,
      url: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=15`,
    })
      .then((rs) => {
        if (rs) setCmt(rs.data);
        setToggle({ ...toggle, postData: rs.data });
        setSkt(false);
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
      axios({
        method: `GET`,
        url: `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=15`,
      })
        .then((rs) => {
          if (rs) resolve(rs.data);
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
    if (postsFromServer.length === 0 || postsFromServer.length < 15) {
      setnoMore(false);
    }
    setPage(page + 1);
  };
  // console.log("PostApi...", post);
  console.log("Cmt length", cmt.length);
  return (
    <div>
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
              return (
                <div key={item.id} className="flex px-2 mb-2">
                  <img
                    className="rounded-full h-8 w-8 flex mt-1"
                    src={"/assets/image/defaultAvatar.png"}
                    alt="userimg"
                  />
                  <Footer key={item.id} item={item} />
                </div>
              );
            })}
      </InfiniteScroll>
    </div>
  );
};
