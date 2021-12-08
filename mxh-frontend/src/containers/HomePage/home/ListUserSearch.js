import React, { useState, useEffect } from "react";
import UserThumbnail from "./UserThumbnail";
import { SkeletonUserThumbnail } from "./../../../skeletons/Skeletons";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "./../../LoadingPage/infititeLoading";
import { userApi } from "../../../axiosApi/api/userApi";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
const ListUserSearch = () => {
  const [users, setUsers] = useState([""]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);
  const search = useLocation().search;
  const [cookies, ,] = useCookies("auth");
  const [status, setStatus] = useState(7);
  const [notFound, setNotFound] = useState(false);
  const q = new URLSearchParams(search).get("q");
  useEffect(() => {
    if (status) {
      // console.log("statusFromchildren", status);

      callListApi(q);
    }
    return () => {
      setUsers(null);
    };
  }, [search, status]);

  const callListApi = async (q) => {
    await userApi
      .getUserName(cookies.auth.tokens.access.token, q, 1, 5)
      .then((rs) => {
        setUsers(rs.data.results);
        if (!rs.data.totalResults) setNotFound(true);
        setSkt(false);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        console.log(err);
        setSkt(false);
      });
  };
  const handleFetchUsers = () => {
    const q = new URLSearchParams(search).get("q");
    return new Promise((resolve, reject) => {
      userApi
        .getUserName(cookies.auth.tokens.access.token, q, page, 5)
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
    const usersFromServer = await handleFetchUsers();
    setUsers([...users, ...usersFromServer]);
    if (usersFromServer.length === 0 || usersFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  const loopSkeleton = () => {
    let arr = [];
    for (let i = 0; i <= 10; i++) {
      arr = [...arr, <SkeletonUserThumbnail key={i} />];
    }
    return arr;
  };
  return (
    <div className="  mt-14 bg-white md:col-span-2 mb-10 px-5 ">
      <div className="flex">
        <div className="grid grid-cols-1 w-full ">
          {skt && loopSkeleton()}
          {users?.length > 0 && (
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
              {users &&
                users.map((item, index) => {
                  return (
                    <div key={index}>
                      <UserThumbnail
                        item={item}
                        updateStatus={setStatus}
                        callListApi={callListApi}
                        q={q}
                      />
                    </div>
                  );
                })}
            </InfiniteScroll>
          )}
          {notFound && (
            <div className="flex w-full justify-center">
              <p className=" font-normal ">Not find Result</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUserSearch;
