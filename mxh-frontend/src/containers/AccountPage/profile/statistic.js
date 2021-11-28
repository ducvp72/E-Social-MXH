import React, { useState, useEffect } from "react";

const Statistic = (props) => {
  const { userSmr, userInfo } = props;
  console.log("From other user Info", userInfo);
  console.log("statistic", userSmr);
  const [state, setState] = useState({
    posts: null,
    followers: null,
    followings: null,
  });

  useEffect(() => {
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
  }, [state]);

  return (
    <div className="flex items-center space-x-10 w-full mt-5">
      <p className=" font-light">
        <span className=" font-medium">
          {/* {userSmr ? userSmr?.countPosts : userInfo?.posts} */}
          {state?.posts}
        </span>{" "}
        Posts
      </p>
      <p className=" font-light">
        <span className="font-medium">
          {/* {userSmr ? userSmr?.countFollow.followers : userInfo?.followers} */}
          {state?.followers}
        </span>{" "}
        Followers
      </p>
      <p className=" font-light">
        <span className="font-medium">
          {/* {userSmr ? userSmr?.countFollow.following : userInfo?.following} */}
          {state?.followings}
        </span>{" "}
        Following
      </p>
    </div>
  );
};

export default Statistic;
