import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import { useHistory } from "react-router";
import { userApi } from "../../axiosApi/api/userApi";
import { history } from "../../routes/browserRouter";

const SearchText = () => {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [rs, setRs] = useState([]);

  const [result, setResult] = useState({
    value: "",
    users: [],
    loading: false,
  });
  let requestTimer = null;

  // const onChange = async (e) => {
  //   try {
  //     setSearchString(e.target.value);
  //     const res = await userApi.getUserName(e.target.value);
  //     console.log("res", res.data.results);
  //     setRs(res.data.results);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onChange = async (e) => {
    setResult({
      value: e.target.value,
      users: [],
      loading: true,
    });
    try {
      clearTimeout(requestTimer);
      requestTimer = await userApi.getUserName(e.target.value);
      console.log("res", requestTimer.data.results);
      setResult({
        value: e.target.value,
        users: requestTimer.data.results,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSelect = (e) => {
    const rs = e.replaceAll(" ", ".");
    history.push("/profile/" + rs);
  };

  //   const handleOnKeyDown = (e) => {
  //     if (e.keyCode === 13) {
  //       e.preventDefault();
  //       callResultUser();
  //       setSearch("");
  //     }
  //   };

  return (
    <div>
      <div className="relative justify-center hidden md:flex">
        <div>
          <Autocomplete
            value={result.value}
            renderInput={(props) => {
              return (
                <div className=" flex border-2 rounded-full w-full items-center bg-gray-100">
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
            renderItem={(item) => (
              <div
                key={item.id}
                className="p-2 text-md font-medium hover:bg-gray-100 flex items-center gap-2"
              >
                <img
                  src={`https://mxhld.herokuapp.com/v1/image/${item.avatar}`}
                  alt="img"
                  className="h-8 w-8 rounded-full"
                />
                {item.fullname}
              </div>
            )}
            renderMenu={(items, value) => (
              <div className="absolute shadow-md box-border w-full text-base bg-white rounded-md">
                {value === "" ? (
                  <div className=" cursor-default ">Search User</div>
                ) : result.loading ? (
                  <div className=" flex cursor-default items-center justify-center">
                    <div class="lds-ring">
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
