import { SuggestionsProfiles } from "./suggestionsProfiles";
import "./styles.css";
import { useState, useEffect } from "react";
import { NIL } from "uuid";
export const Suggestions = () => {
  const [openNew, setOpenNew] = useState(false);
  const [select, setSelect] = useState(null);
  // useEffect(() => {
  //   alert(select);
  // }, [select]);
  const loopCpn = () => {
    let arr = [];
    for (let i = 0; i <= 5; i++) {
      arr = [...arr, <SuggestionsProfiles key={i} />];
    }
    return arr;
  };
  return (
    <div className="rounded flex flex-col z-10 mt-2">
      {/* <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div> */}
      <div className="flex">
        <div
          onClick={() => {
            setOpenNew(!openNew);
          }}
          className="z-50 w-full group cursor-pointer focus:outline-none rounded bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
        >
          <div className="flex justify-center my-1 cursor-pointer items-center ">
            <p className=" text-white">Click see news</p>
          </div>
          <div className="hidden group-hover:block">
            <ul className="p-2">
              <li
                onClick={() => setSelect("https://vietnamnet.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Vietnamnet.vn</p>
              </li>
              <li
                onClick={() => setSelect("https://vnexpress.net/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">VnExpress</p>
              </li>
              <li
                onClick={() => setSelect("https://baomoi.com/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Báo mới</p>
              </li>
              <li
                onClick={() => setSelect("https://vov.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">VOV Việt Nam</p>
              </li>
              <li
                onClick={() => setSelect("https://tuoitre.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Tuổi Trẻ Online</p>
              </li>
              <li
                onClick={() => setSelect("https://kenh14.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Kênh 14</p>
              </li>
            </ul>
          </div>
        </div>
        {select !== null && (
          <div className="absolute right-0 cursor-pointer z-50 ml-2 transform translate-x-10">
            <button
              className=" focus:outline-none border text-sm text-blue-500 rounded border-blue-500"
              onClick={() => {
                setSelect(null);
              }}
            >
              <p className="p-1">Hide</p>
            </button>
          </div>
        )}
      </div>
      <div className=" z-40 absolute mt-7 post-show grid gap-5  ">
        <iframe
          width="600"
          height="520"
          src={select}
          title="W3Schools Free Online Web Tutorials"
        />
      </div>
    </div>
  );
};
