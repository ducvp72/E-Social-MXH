import React, { useState, useEffect } from "react";
import Autocomplete from "react-autocomplete";
import { useHistory } from "react-router";
import { userApi } from "../../axiosApi/api/userApi";
import { useCookies } from "react-cookie";

const SearchText = () => {
  const history = useHistory();
  const [cookies, ,] = useCookies("auth");
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
      requestTimer = await userApi.getUserName(
        cookies.auth.tokens.access.token,
        e.target.value,
        1,
        5
      );
      // console.log("res", requestTimer.data.results);
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
  const onSelect = (e) => {
    // const rs = e.replaceAll(" ", ".");
    history.push("/search/top?q=" + e);
  };
  return (
    <div>
      <div className="relative justify-center md:flex">
        <div>
          <Autocomplete
            value={result.value}
            renderInput={(props) => {
              return (
                <div className="response:hidden flex border-2 rounded-full w-full items-center bg-gray-100">
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
            onSelect={onSelect}
            onChange={onChange}
            renderItem={(item, isSelect) => (
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
            )}
            renderMenu={(items, value) => (
              <div className="absolute shadow-md box-border w-full text-base bg-white rounded-md">
                {value === "" ? (
                  <div className=" cursor-default ">Search User</div>
                ) : result.loading ? (
                  <div className=" flex cursor-default items-center justify-center">
                    <div className="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : items.length === 0 ? (
                  <div className=" cursor-default ">No matches for {value}</div>
                ) : (
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
