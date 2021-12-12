import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { userApi } from "./../../../axiosApi/api/userApi";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import Statistic from "./../profile/statistic";
import Information from "./../profile/information";
import DialogAction from "./../profile/dialog";
import UserPost from "./../profile/userPost";
import { SkeletonProfile } from "../../../skeletons/Skeletons";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { SkeletonPostThumbnail } from "./../../../skeletons/Skeletons";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "./../../LoadingPage/infititeLoading";
import { postApi } from "./../../../axiosApi/api/postApi";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { actGetMyConver } from "../../../reducers/converReducer";
import Loading from "../../LoadingPage/index";
import { toast, ToastContainer, Zoom } from "react-toastify";

const OtherProfile = () => {
  const [following, setFollowing] = useState(false);
  const [action, setAction] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [skt, setSkt] = useState(true);
  const [cookies, ,] = useCookies(["auth"]);
  let { username } = useParams();
  const idUser = useLocation().search;
  const history = useHistory();
  const [userPost, setUserPost] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [notFound, setNotFound] = useState(false);
  const q = new URLSearchParams(idUser).get("id");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo();
    getUserPost();
    return () => {
      setUserInfo(null);
      setFollowing(null);
      setUserPost(null);
    };
  }, [q]);

  const inboxUser = async () => {
    setLoading(true);
    chatApi
      .createConver(cookies.auth.tokens.access.token, q)
      .then((res) => {
        setLoading(false);
        console.log(res);
        dispatch(actGetMyConver(cookies.auth.tokens.access.token, 1, 10));
        // toast.success("Creating successfully conversation with new friend !", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 2000,
        //   hideProgressBar: true,
        //   theme: "colored",
        // });
        history.push(`/user/inbox/${q}`);
        return;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getUserInfo = () => {
    userApi
      .getUserByID(cookies.auth.tokens.access.token, q)
      .then((res) => {
        setSkt(false);
        setUserInfo(res.data);
        setFollowing(res.data.isFollow);
      })
      .catch((err) => {
        setSkt(false);
        console.log(err);
      });
  };

  const getUserPost = () => {
    postApi
      .getUserPost(cookies.auth.tokens.access.token, q, 1, 10)
      .then((res) => {
        setSkt(false);
        console.log(res);
        setUserPost(res.data.results);
        if (!res.data.totalResults) setNotFound(true);
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
        .getUserPost(cookies.auth.tokens.access.token, q, page, 10)
        .then((rs) => {
          resolve(rs.data.results);
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
    if (postsFromServer.length === 0 || postsFromServer.length < 10) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  const onClose = () => {
    setAction(false);
  };

  const handleFollow = () => {
    setFollowing(!following);
    userApi
      .userFollow(cookies.auth.tokens.access.token, userInfo?.id)
      .then(() => {
        getUserInfo();
      });
    Swal.fire({
      icon: "success",
      title: "You following this user",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleUnFollow = () => {
    setFollowing(!following);
    userApi
      .userFollow(cookies.auth.tokens.access.token, userInfo?.id)
      .then(() => {
        getUserInfo();
      });

    Swal.fire({
      icon: "success",
      title: "You not follow this user",
      showConfirmButton: false,
      timer: 1500,
    });
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
      {/* <ToastContainer transition={Zoom} />
      {loading && <Loading />} */}
      <Helmet>
        <title>{`${username.replaceAll(".", " ")} | Vn-Social`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {skt ? (
        <SkeletonProfile />
      ) : (
        <>
          <DialogAction open={action} onClose={onClose}></DialogAction>
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
                      userInfo
                        ? `https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`
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
                    {
                      userInfo?.fullname || "Undefinded"
                      // <div className="mt-2">
                      //   <Skeleton width={150} height={20} />
                      // </div>)
                    }
                  </h1>
                  {following ? (
                    <>
                      <Link to={`/user/inbox/${q}`}>
                        <button
                          className="border-gray-300 font-normal p-1 rounded-sm"
                          style={{ borderWidth: "1px" }}
                          onClick={() => {
                            inboxUser();
                          }}
                        >
                          Inbox
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          handleUnFollow();
                        }}
                        className="border-gray-300 font-normal p-1 rounded-sm bg-red-500 text-white"
                        style={{ borderWidth: "1px" }}
                      >
                        UnFollow
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleFollow();
                      }}
                      className="bg-blue-500 p-1 font-normal text-white rounded-sm"
                    >
                      Follow
                    </button>
                  )}

                  <div className="items-center cursor-pointer relative">
                    <p
                      className="font-black text-2xl mb-2"
                      onClick={() => {
                        setAction(!action);
                      }}
                    >
                      ...
                    </p>
                  </div>
                </div>
                <div>
                  <Statistic userInfo={userInfo} />
                </div>
                <div className="h-full">
                  <Information userInfo={userInfo} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="py-2 w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2">
        {skt && (
          <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
            {loopSkeleton()}
          </div>
        )}

        {userPost?.length > 0 && (
          <InfiniteScroll
            dataLength={userPost?.length}
            next={fetchData}
            hasMore={noMore}
            scrollThreshold={0.2}
            loader={
              <div className=" flex justify-center mt-5">
                <InfititeLoading />
              </div>
            }
            endMessage={
              <p className="flex justify-center font-avatar text-lg">
                <b>Opp..! You have seen it all</b>
              </p>
            }
          >
            <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
              {userPost &&
                userPost.map((item) => {
                  return <UserPost key={item.id} otherItem={item} />;
                })}
            </div>
          </InfiniteScroll>
        )}
        {notFound && (
          <div className="flex justify-center items-center">
            <p className="">No post found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherProfile;
