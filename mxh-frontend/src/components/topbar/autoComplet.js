import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import { useHistory } from "react-router";
import { userApi } from "./../../axiosApi/api/userApi";
import { history } from "./../../routes/browserRouter";

const SearchText = () => {
  const [searchString, setSearchString] = useState("");
  const history = useHistory();
  const [rs, setRs] = useState([]);

  const onChange = async (e) => {
    try {
      setSearchString(e.target.value);
      const res = await userApi.getUserFullName(e.target.value);
      setRs(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelect = (e) => {
    console.log("chuyen trang", e);
    history.push("/profile/" + e);
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
        <Autocomplete
          renderInput={(props) => {
            return (
              <input
                type="text"
                className=" outline-none py-1 px-4 border-2"
                {...props}
              />
            );
          }}
          getItemValue={(item) => item.email}
          items={rs}
          renderItem={(item, isHighlighted) => (
            <div className="p-4 text-md font-medium hover:bg-gray-100 flex items-center gap-4">
              <img
                src={`https://mxhld.herokuapp.com/v1/image/${item.avatar}`}
                alt="img"
                className="h-10 w-10 rounded-full"
              />
              {item.email}
            </div>
          )}
          value={searchString}
          onChange={onChange}
          onSelect={(e) => onSelect(e)}
        />
        <div>
          <button className=" py-1 px-4 text-md h-full text-white bg-red-500 hover:bg-red-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchText;
