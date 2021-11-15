import React, { useEffect, useState } from "react";
import { Post } from "./../post/post";
import Postshow from "./postshow";
import { useSelector } from "react-redux";
import CreatePost from "./createPost";
import { SkeletonPost } from "../../skeletons/Skeletons";
import { userApi } from "./../../axiosApi/api/userApi";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "../../containers/LoadingPage/infititeLoading";

export const Timeline = () => {
  const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [createPost, setCreatePost] = useState(false);
  const [post, setPost] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    if (toggle.isShow) {
      document.body.className = "overflow-hidden";
      return;
    }
    document.body.className = "overflow-auto";
  }, [toggle]);

  useEffect(() => {
    setTimeout(async () => {
      await axios({
        method: `GET`,
        url: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=3`,
      })
        .then((rs) => {
          if (rs) setPost(rs.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setSkt(false);
    }, 2000);
    // loopSkeleton();
  }, []);

  const onClose = () => {
    setCreatePost(false);
  };
  const loopSkeleton = () => {
    let i = 0;
    for (i = 0; i <= 10; i++) {
      return <SkeletonPost key={i} />;
    }
  };
  const fetchPosts = async () => {
    await axios({
      method: `GET`,
      url: `https://jsonplaceholder.typicode.com/posts?_page=2&_limit=5`,
    })
      .then((rs) => {
        if (rs) console.log("rs2", rs.data);
        return rs.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetchPosts = () => {
    return new Promise((resolve, reject) => {
      axios({
        method: `GET`,
        url: `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`,
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
    // const postsFromServer = await fetchPosts();
    const postsFromServer = await handleFetchPosts();
    // console.log("postsFromServer", postsFromServer ? postsFromServer : null);
    setPost([...post, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 3) {
      setnoMore(false);
    }
    setPage(page + 1);
  };
  // console.log("PostApi...", post);
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

      <InfiniteScroll
        dataLength={post?.length}
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
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ske) => (
              <SkeletonPost key={ske} />
            ))
          : post &&
            post.map((item) => {
              return <Post key={item.id} item={item} setToggle={setToggle} />;
            })}
      </InfiniteScroll>
    </div>
  );
};
