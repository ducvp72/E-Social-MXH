import React, { useState, useEffect } from "react";
import Statistic from "./statistic";
import Information from "./information";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { userApi } from "./../../../axiosApi/api/userApi";
import UserPost from "./userPost";
import { SkeletonProfile } from "../../../skeletons/Skeletons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselElement from "./../../../Carousel/index";
import { SkeletonPostThumbnail } from "./../../../skeletons/Skeletons";
import { postApi } from "../../../axiosApi/api/postApi";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "./../../LoadingPage/infititeLoading";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { date } from "yup/lib/locale";

const Profile = () => {
  const [cookies, ,] = useCookies(["auth"]);
  const [userSmr, setUSerSmr] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const currentUser = useSelector((state) => state.auth.data);
  const [skt, setSkt] = useState(true);
  // const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);

  // console.log("UserID", cookies.auth.user.id);

  useEffect(() => {
    if (cookies.auth.user.id)
      setTimeout(() => {
        setSkt(false);
      }, 1000);
    getSummary();
  }, [cookies.auth.user.id]);

  useEffect(() => {
    getUserPost();
  }, []);

  useEffect(() => {
    console.log("lstPostID", userPost);
    // console.log("Summary", userSmr?.data);
  }, [userPost]);

  const getSummary = async () => {
    try {
      const userSummary = await userApi.getUserSummary(cookies.auth.user.id);
      setUSerSmr(userSummary);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getUserPost = async () => {
    setSkt(true);
    await postApi
      .getUserPost(cookies.auth.user.id, 1, 5)
      .then((res) => {
        // console.log("lstPost", res.data.results);
        setUserPost(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetchPosts = () => {
    return new Promise((resolve, reject) => {
      postApi
        .getUserPost(cookies.auth.user.id, page, 5)
        .then((rs) => {
          if (rs) resolve(rs.data.results);
        })
        .catch((err) => {
          console.log("errPromise", err);
          reject(err);
        });
    });
  };

  // console.log("handleFetchPosts", handleFetchPosts());

  const fetchData = async () => {
    const postsFromServer = await handleFetchPosts();
    setUserPost([...userPost, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  const loopSkeleton = () => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr = [...arr, <SkeletonPostThumbnail key={i} />];
    }
    return arr;
  };

  return (
    <div>
      <Helmet>
        <title>{currentUser?.fullname}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {skt ? (
        <SkeletonProfile />
      ) : (
        <div
          className="w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full overflow-x-auto overflow-y-hidden shadow-2xl rounded-lg bg-white relative transform -translate-x-1/2 left-1/2"
          style={{ top: "4.5rem" }}
        >
          <div className="grid grid-cols-3 pb-10">
            <div className="h-full flex justify-center justify-items-center">
              <div className="py-5">
                <img
                  className="rounded-full h-24 w-24 md:h-44 md:w-44 "
                  src={
                    currentUser
                      ? `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                      : "/assets/image/defaultAvatar.png"
                  }
                  alt="userimg"
                />
              </div>
            </div>
            <div className="col-span-2  h-full object-fill">
              <div className="flex w-full items-center space-x-4 mt-5">
                <h1
                  className="font-sans font-light text-3xl hover:text-blue-500 cursor-pointer"
                  style={{ color: "#818181" }}
                >
                  {currentUser ? currentUser.fullname : "Undefined Fullname"}
                </h1>
              </div>

              <div>
                <Statistic userSmr={userSmr?.data} />
              </div>
              <div className="h-full">
                <Information />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Postshow setToggle={setToggle} toggle={toggle} /> */}
      {/* <CarouselElement  setToggle={setToggle} toggle={toggle} /> */}
      <div className="py-2 w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2">
        <InfiniteScroll
          dataLength={userPost?.length}
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
          {skt ? (
            <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
              {loopSkeleton()}
            </div>
          ) : (
            <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
              {userPost &&
                userPost.map((item) => {
                  return (
                    // <UserPost key={item.id} item={item} setToggle={setToggle} />
                    <UserPost key={item.id} item={item} />
                  );
                })}
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Profile;
