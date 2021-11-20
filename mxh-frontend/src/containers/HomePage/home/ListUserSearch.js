import React, { useState, useEffect } from "react";
import UserThumbnail from "./UserThumbnail";
import { SkeletonUserThumbnail } from "./../../../skeletons/Skeletons";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "./../../LoadingPage/infititeLoading";
import { userApi } from "../../../axiosApi/api/userApi";
import { useLocation } from "react-router-dom";
const ListUserSearch = () => {
  const [users, setUsers] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);
  const search = useLocation().search;

  // let qr = query.get("q");

  useEffect(() => {
    console.log("search");
    const q = new URLSearchParams(search).get("q");
    setSkt(true);
    userApi
      .getUserFullName(q)
      .then((rs) => {
        if (rs) setUsers(rs.data.results);
        console.log("users", users);
        setSkt(false);
      })
      .catch((err) => {
        console.log(err);
        setSkt(false);
      });
  }, [search]);

  const handleFetchUsers = () => {
    const q = new URLSearchParams(search).get("q");
    return new Promise((resolve, reject) => {
      userApi
        .getUserFullName(q)
        .then((rs) => {
          if (rs) resolve(rs.data.result);
        })
        .catch((err) => {
          console.log("errPromise", err);
          reject(err);
        });
    });
  };

  const fetchData = async () => {
    const usersFromServer = await handleFetchUsers();
    setUsers([...users, ...usersFromServer]);
    if (usersFromServer.length === 0 || usersFromServer.length < 10) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  const loopSkeleton = () => {
    let arr = [];
    for (let i = 0; i <= 20; i++) {
      arr = [...arr, <SkeletonUserThumbnail key={i} />];
    }
    return arr;
  };
  return (
    <div className="  mt-14 bg-white md:col-span-2 mb-10 px-5 ">
      <div className="flex">
        <div className="grid grid-cols-1 w-full ">
          {users?.length === 0 ? (
            <div className="flex w-full justify-center">
              <p className=" font-normal ">Not find Result</p>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={users?.length}
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
                : users &&
                  users.map((item) => {
                    return <UserThumbnail key={item.id} item={item} />;
                  })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUserSearch;
