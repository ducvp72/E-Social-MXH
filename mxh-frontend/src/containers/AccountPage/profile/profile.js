import React, { useState, useEffect } from "react";
import Statistic from "./statistic";
import Information from "./information";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "./../../../axiosApi/api/userApi";
import UserPost from "./userPost";
import { SkeletonProfile } from "../../../skeletons/Skeletons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SkeletonPostThumbnail } from "./../../../skeletons/Skeletons";
import { postApi } from "../../../axiosApi/api/postApi";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "./../../LoadingPage/infititeLoading";
import { useCookies } from "react-cookie";
import PostDialog from "./../../../components/timeline/postDialog";
import { setDialogAction } from "../../../reducers/createPostDialog";
import ChangePost from "./../../../components/changePost/index";

const Profile = () => {
  const [cookies, ,] = useCookies(["auth"]);
  const [userSmr, setUSerSmr] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const currentUser = useSelector((state) => state.auth.data);
  const [skt, setSkt] = useState(true);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [notFound, setNotFound] = useState(false);
  const createPost = useSelector((state) => state.dialog);
  const [toggle, setToggle] = useState({ isShow: false, postData: {} });
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const openChangePost = useSelector((state) => state.changePost);
  useEffect(() => {
    checkShow();
    return () => {
      clearTimeout(checkShow);
      setUSerSmr(null);
    };
  }, []);

  useEffect(() => {
    getUserPost();
    return () => {
      setUserPost(null);
    };
  }, []);

  const checkShow = () => {
    if (cookies.auth.user.id)
      setTimeout(() => {
        setSkt(false);
      }, 500);
    getSummary();
  };

  const getSummary = async () => {
    try {
      const userSummary = await userApi.getUserSummary(cookies.auth.user.id);
      setUSerSmr(userSummary);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getUserPost = () => {
    // setSkt(true);
    postApi
      .getUserPost(cookies.auth.tokens.access.token, cookies.auth.user.id, 1, 6)
      .then((res) => {
        setUserPost(res.data.results);
        if (!res.data.totalResults) setNotFound(true);
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
        .getUserPost(
          cookies.auth.tokens.access.token,
          cookies.auth.user.id,
          page,
          6
        )
        .then((rs) => {
          if (rs) resolve(rs.data.results);
          // resolve(rs.data);
        })
        .catch((err) => {
          console.log("errPromise", err);
          reject(err);
        });
    });
  };

  const fetchData = async () => {
    const postsFromServer = await handleFetchPosts();
    setUserPost([...userPost, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 6) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  const loopSkeleton = () => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      arr = [...arr, <SkeletonPostThumbnail key={i} />];
    }
    return arr;
  };
  const onClose = () => {
    dispatch(setDialogAction(false));
  };

  const getFirstPage = async () => {
    // console.log("render time line");
    postApi
      .getMyPost(cookies.auth.tokens.access.token, 1, 5)
      .then((rs) => {
        setPost(rs.data.results);
        if (!rs.data.totalResults) setNotFound(true);
        setToggle({ ...toggle, postData: rs.data.results });
        setSkt(false);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        console.log(err);
        setSkt(false);
      });
  };

  return (
    <div>
      <Helmet>
        <title>{currentUser?.fullname}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {/* <ChangePost open={openChangePost.showChange} /> */}

      <PostDialog
        getSummary={getSummary}
        getUserPost={getUserPost}
        getFirstPage={getFirstPage}
        open={createPost.show}
        onClose={onClose}
      />
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
                <Information currentUser={currentUser} />
              </div>
            </div>
          </div>
        </div>
      )}
      {skt && (
        <div
          style={{
            height: "500px",
          }}
          className="py-2 w-full xl:w-4/6 lg:w-4/6 overflow-y-hidden md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2"
        >
          <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
            {loopSkeleton()}
          </div>
        </div>
      )}

      <div className="py-2 w-full xl:w-4/6 lg:w-4/6 overflow-y-hidden md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2">
        {userPost?.length > 0 && (
          <InfiniteScroll
            dataLength={userPost?.length}
            next={fetchData}
            scrollThreshold={0.2}
            hasMore={noMore}
            loader={
              <div className=" flex justify-center mt-5">
                <InfititeLoading />
              </div>
            }
            endMessage={
              <p className="flex justify-center font-thin text-lg">
                <b>Opp..! You have seen it all</b>
              </p>
            }
          >
            <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
              {userPost &&
                userPost.map((item) => {
                  return (
                    <UserPost
                      getSummary={getSummary}
                      getUserPost={getUserPost}
                      key={item.id}
                      item={item}
                    />
                  );
                })}
            </div>
          </InfiniteScroll>
        )}

        {notFound && (
          <div className="flex justify-center items-center">
            <p className="">You have no post</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
