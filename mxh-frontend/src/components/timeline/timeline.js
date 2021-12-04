import React, { useEffect, useState } from "react";
import { Post } from "./../post/post";
import { useSelector } from "react-redux";
import PostDialog from "./postDialog";
import { SkeletonPost } from "../../skeletons/Skeletons";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "../../containers/LoadingPage/infititeLoading";
import { useCookies } from "react-cookie";
import { postApi } from "./../../axiosApi/api/postApi";

export const Timeline = () => {
  const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [createPost, setCreatePost] = useState(false);
  const [post, setPost] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);
  const currentUser = useSelector((state) => state.auth.data);
  const [cookies, ,] = useCookies("auth");

  useEffect(() => {
    setSkt(true);
    getFirstPage();
    return () => setPost(null);
  }, []);

  const getFirstPage = async () => {
    // console.log("render time line");
    postApi
      .getMyPost(cookies.auth.tokens.access.token, 1, 5)
      .then((rs) => {
        if (rs) setPost(rs.data.results);
        setToggle({ ...toggle, postData: rs.data.results });
        // console.log("Post", post);
        setSkt(false);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        console.log(err);
        setSkt(false);
      });
  };

  const handleFetchPosts = () => {
    return new Promise((resolve, reject) => {
      postApi
        .getMyPost(cookies.auth.tokens.access.token, page, 5)
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
    setPost([...post, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  const onClose = () => {
    setCreatePost(false);
  };
  const loopSkeleton = () => {
    let arr = [];
    for (let i = 0; i <= 20; i++) {
      arr = [...arr, <SkeletonPost key={i} />];
    }
    return arr;
  };
  // console.log("PostApi...", post);
  return (
    <div className="md:col-span-2 sm:col-start-1 sm:col-end-7 md:py-16 md:px-0 lg:px-12 xl:p-16  py-16">
      <PostDialog
        getFirstPage={getFirstPage}
        open={createPost}
        onClose={onClose}
      />
      <div className="rounded border border-gray-primary mb-5 md:mr-16 sm:mr-1 lg:mr-0 shadow-md">
        <div className=" flex" onClick={() => setCreatePost(!createPost)}>
          <input
            className="bg-gray-200 font-avatar text-mygrey text-md hover:bg-gray-300 font-mono m-3 rounded-full cursor-pointer appearance-none  w-full py-2 px-4  focus:outline-none focus:bg-white"
            type="text"
            defaultValue={
              currentUser &&
              `Hi ${currentUser?.fullname}, click here to create your post... !`
            }
            name="post"
            disabled
            onClick={() => () => setCreatePost(!createPost)}
          />
        </div>
      </div>
      {/* {<SkeletonPost />} */}

      {/* {post.length >= 1 ? ( */}
      <InfiniteScroll
        refreshFunction
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
            <b>Opp..! No post more !</b>
          </p>
        }
      >
        {skt
          ? loopSkeleton()
          : post &&
            post.map((item) => {
              return (
                <Post getFirstPage={getFirstPage} key={item.id} item={item} />
              );
            })}
      </InfiniteScroll>
      {/* ) */}
      {/* : (
        <div className="flex justify-center items-center">
          <p className="">You have no post</p>
        </div>
      )} */}
    </div>
  );
};
