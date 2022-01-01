import React, { useState, useEffect } from "react";
import Autocomplete from "react-autocomplete";
import { useHistory } from "react-router";
import { userApi } from "../../axiosApi/api/userApi";
import { useCookies } from "react-cookie";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchText = () => {
  const history = useHistory();
  const [cookies, ,] = useCookies("auth");
  const [page, setPage] = useState(2);
  const [noMore, setnoMore] = useState(true);
  const [temp, setTemp] = useState(null);

  const [result, setResult] = useState({
    value: "",
    users: [],
    loading: false,
  });
  let requestTimer = null;

  useEffect(() => {
    return () => {
      setResult({
        value: "",
        users: [],
        loading: false,
      });
    };
  }, []);

  useEffect(() => {
    setTemp(result.value);
  }, [result.value]);

  const onSelect = (e, id) => {
    // console.log("usename", e);
    // console.log("useId", id);

    // const rs = e.replaceAll(" ", ".");
    if (typeof id === "number") {
      console.log("id length", typeof id);
      history.push("/search/top?q=" + e);
      return;
    }
    history.push(
      id === cookies.auth.user.id
        ? `/user/${cookies.auth.user.fullname.replaceAll(" ", ".")}`
        : `/profile/user?id=${id}`
    );
  };

  const onChange = async (e) => {
    setResult({
      value: e.target.value,
      users: [],
      loading: true,
    });
    try {
      clearTimeout(requestTimer);
      requestTimer = await userApi.getUserName(
        cookies.auth.tokens.access.token,
        e.target.value,
        1,
        5
      );
      setResult({
        value: e.target.value,
        users: [
          { id: Date.now(), fullname: e.target.value },
          ...requestTimer.data.results,
        ],
        loading: false,
      });
      setnoMore(true);
      setPage(2);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchUsers = () => {
    return new Promise((resolve, reject) => {
      userApi
        .getUserName(cookies.auth.tokens.access.token, temp, page, 5)
        .then((rs) => {
          resolve(rs.data.results);
        })
        .catch((err) => {
          // console.log("errPromise", err);
          reject(err);
        });
    });
  };

  const fetchData = async () => {
    const usersFromServer = await handleFetchUsers();
    // console.log("data", ...usersFromServer);
    setResult({
      ...result,
      users: [...result.users, ...usersFromServer],
    });
    if (usersFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  return (
    <div>
      <div className="hidden sm:flex xl:flex lg:flex md:flex relative justify-center">
        <div>
          <Autocomplete
            value={result.value}
            renderInput={(props) => {
              return (
                <div className="flex border-2 rounded-full w-full items-center bg-gray-100">
                  <i className="fas fa-search text-gray-400 p-2" />
                  <input
                    type="text"
                    className=" bg-gray-100 font-mono focus:bg-gray-100 appearance-none mr-2 focus:outline-none"
                    {...props}
                  />
                </div>
              );
            }}
            items={result.users}
            getItemValue={(item) => item.fullname}
            onSelect={(e, item) => onSelect(e, item?.id)}
            onChange={onChange}
            renderItem={(item, isSelect) => {
              return (
                <div
                  key={item.id}
                  className={`p-2 text-md font-medium hover:bg-gray-200 flex items-center gap-2 ${
                    isSelect && "bg-gray-200"
                  }`}
                >
                  {item.avatar && (
                    <img
                      src={`https://mxhld.herokuapp.com/v1/image/${item.avatar}`}
                      alt="img"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  {item.fullname}
                </div>
              );
            }}
            renderMenu={(items, value) => (
              <div
                // style={{ maxHeight: "400px" }}
                className="post-show overflow-y-auto absolute shadow-md box-border w-full text-base bg-white rounded-md"
              >
                {value === "" ? (
                  <div className=" flex items-center justify-center gap-2 ">
                    <span className=" font-avatar ">Search User</span>
                    <img
                      className="w-8 h-8"
                      src="/assets/image/search.gif"
                      alt="search"
                    />
                  </div>
                ) : result.loading ? (
                  <div className=" flex cursor-default items-center justify-center  w-full h-full">
                    <div className=" items-center justify-center flex">
                      <img
                        className="w-8 h-8"
                        src="/assets/image/search.gif"
                        alt="search"
                      />
                    </div>
                  </div>
                ) : items.length === 0 ? (
                  <div className=" cursor-default ">No matches for {value}</div>
                ) : (
                  <>
                    <div className=" hidden">{items}</div>
                    <div
                      id="resultDiv"
                      className=" overflow-y-auto post-show "
                      style={{ height: "250px" }}
                      onSelect={(e, item) => onSelect(e, item?.id)}
                    >
                      <InfiniteScroll
                        refreshFunction
                        dataLength={result.users.length}
                        next={fetchData}
                        hasMore={noMore}
                        scrollableTarget="resultDiv"
                        scrollThreshold={0.2}
                        loader={
                          <div className=" flex cursor-default items-center justify-center  w-full h-full">
                            <div className=" lds-ring items-center justify-center flex">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </div>
                        }
                        endMessage={
                          <p className="flex justify-center font-avatar text-xs mt-2">
                            <b>You have seen all !</b>
                          </p>
                        }
                      >
                        {result.users.map((item, index) => {
                          return (
                            <div
                              onClick={() => {
                                onSelect(item?.fullname, item?.id);
                              }}
                              key={index}
                              className={`p-2 text-md font-medium hover:bg-gray-200 flex items-center gap-2
                              `}
                            >
                              {item.avatar && (
                                <img
                                  src={`https://mxhld.herokuapp.com/v1/image/${item.avatar}`}
                                  alt="img"
                                  className="h-8 w-8 rounded-full"
                                />
                              )}
                              {item.fullname}
                            </div>
                          );
                        })}
                      </InfiniteScroll>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchText;
