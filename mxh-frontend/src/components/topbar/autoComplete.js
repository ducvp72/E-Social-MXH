import React, { useState, useEffect } from "react";
import Autocomplete from "react-autocomplete";
import { useHistory } from "react-router";
import { userApi } from "../../axiosApi/api/userApi";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import InfititeLoading from "./../../containers/LoadingPage/infititeLoading";

const SearchText = () => {
  const history = useHistory();
  const [cookies, ,] = useCookies("auth");
  const [page, setPage] = useState(2);
  const [noMore, setnoMore] = useState(true);
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

  const onChange = async (e) => {
    setResult({
      value: e.target.value,
      users: [],
      loading: true,
    });
    try {
      clearTimeout(requestTimer);
      requestTimer = await userApi.getUserNameByPage(
        cookies.auth.tokens.access.token,
        e.target.value
      );
      setResult({
        value: e.target.value,
        users: [
          { id: Date.now(), fullname: e.target.value },
          ...requestTimer.data.results,
        ],
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchUsers = (e) => {
    return new Promise((resolve, reject) => {
      userApi
        .getUserName(cookies.auth.tokens.access.token, e.target.value, page, 5)
        .catch((err) => {
          console.log("errPromise", err);
          reject(err);
        });
    });
  };
  const fetchData = async (e) => {
    const usersFromServer = await handleFetchUsers();
    setResult({
      value: e.target.value,
      users: [...requestTimer.data.results, ...usersFromServer],
      loading: false,
    });
    if (usersFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  const onSelect = (e, id) => {
    console.log("useId", e);
    console.log("useId", id);
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
                style={{ maxHeight: "400px" }}
                className="post-show overflow-y-auto absolute shadow-md box-border w-full text-base bg-white rounded-md"
              >
                {value === "" ? (
                  <div className=" cursor-default ">Search User</div>
                ) : result.loading ? (
                  <div className=" flex cursor-default items-center justify-center  w-full h-full">
                    <div className="lds-ring items-center justify-center flex">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : items.length === 0 ? (
                  <div className=" cursor-default ">No matches for {value}</div>
                ) : (
                  // <InfiniteScroll
                  //   refreshFunction
                  //   dataLength={result.users.length}
                  //   next={fetchData}
                  //   hasMore={noMore}
                  //   loader={
                  //     <div className=" flex justify-center">
                  //       <InfititeLoading />
                  //     </div>
                  //   }
                  //   endMessage={
                  //     <p className="flex justify-center font-avatar text-lg">
                  //       <b>Opp..! No post more !</b>
                  //     </p>
                  //   }
                  // ></InfiniteScroll>
                  items
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
