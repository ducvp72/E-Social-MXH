import React, { useState, useEffect } from "react";

const Statistic = (props) => {
  const { userSmr, userInfo } = props;
  const [state, setState] = useState({
    posts: null,
    followers: null,
    followings: null,
  });

  useEffect(() => {
    checkStatus();
  }, [userSmr, userInfo]);

  const checkStatus = () => {
    if (userSmr) {
      setState({
        ...state,
        posts: userSmr?.countPosts,
        followers: userSmr?.countFollow.followers,
        followings: userSmr?.countFollow.following,
      });
    } else
      setState({
        ...state,
        posts: userInfo?.posts,
        followers: userInfo?.followers,
        followings: userInfo?.following,
      });
  };

  return (
    <div className="flex items-center space-x-10 w-full mt-5">
      <p className=" font-light">
        <span className=" font-medium">
          {/* {userSmr ? userSmr?.countPosts : userInfo?.posts} */}
          {state ? state?.posts : 0}
        </span>{" "}
        Posts
      </p>
      <p className=" font-light">
        <span className="font-medium">
          {/* {userSmr ? userSmr?.countFollow.followers : userInfo?.followers} */}
          {state ? state?.followers : 0}
        </span>{" "}
        Followers
      </p>
      <p className=" font-light">
        <span className="font-medium">
          {/* {userSmr ? userSmr?.countFollow.following : userInfo?.following} */}
          {state ? state?.followings : 0}
        </span>{" "}
        Following
      </p>
    </div>
  );
};

export default Statistic;
