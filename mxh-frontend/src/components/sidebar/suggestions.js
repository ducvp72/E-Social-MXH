import "./styles.css";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import { SuggestionsProfiles } from "./suggestionsProfiles";
import { SkeletonSuggest } from "./../../skeletons/Skeletons";
import { userApi } from "./../../axiosApi/api/userApi";
import { useCookies } from "react-cookie";

export const Suggestions = () => {
  const [cookies, ,] = useCookies(["auth"]);
  const [openNew, setOpenNew] = useState(false);
  const [select, setSelect] = useState(null);
  const [open, setOpen] = useState(false);
  const [skt, setSkt] = useState(true);
  const [suggests, setSuggest] = useState([]);

  useEffect(() => {
    callListApi();
    return () => {
      setSuggest([]);
    };
  }, []);

  const loopSkt = () => {
    let arr = [];
    for (let i = 0; i <= 5; i++) {
      arr = [...arr, <SkeletonSuggest key={i} />];
    }
    return arr;
  };

  const handleClose = () => {
    setOpen(false);
    setSelect("");
  };
  const choosing = (choose) => {
    setSelect(choose);
    setOpen(true);
  };

  const callListApi = async () => {
    await userApi
      .getUserName(cookies.auth.tokens.access.token, "d", 1, 5)
      .then((rs) => {
        setSuggest(rs.data.results);
        setSkt(false);
      })
      .catch((err) => {
        console.log(err);
        setSkt(false);
      });
  };

  return (
    <div className="rounded flex flex-col z-10 mt-2">
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
          <div
            className=" absolute group-hover:block hidden w-full
           bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 "
          >
            <ul className="p-2">
              <li
                onClick={() => choosing("https://vietnamnet.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Vietnamnet.vn</p>
              </li>
              <li
                onClick={() => choosing("https://vnexpress.net/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">VnExpress</p>
              </li>
              <li
                onClick={() => choosing("https://baomoi.com/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Báo mới</p>
              </li>
              <li
                onClick={() => choosing("https://vov.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">VOV Việt Nam</p>
              </li>
              <li
                onClick={() => choosing("https://tuoitre.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Tuổi Trẻ Online</p>
              </li>
              <li
                onClick={() => choosing("https://kenh14.vn/")}
                className="text-white rounded hover:bg-white hover:text-black"
              >
                <p className="p-2">Kênh 14</p>
              </li>
            </ul>
          </div>
        </div>
        {/* {select !== null && (
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
        )} */}
      </div>
      <Dialog maxWidth="xl" open={open} onClose={() => handleClose()}>
        <div className="post-show fixed w-full h-screen bg-transparent z-10 top-0 left-0 flex justify-end items-start">
          <div className=" flex justify-center items-center justify-items-center rounded-full bg-none ">
            <i
              onClick={() => handleClose()}
              className="fas fa-times fa-2x cursor-pointer mr-4"
              style={{ color: "#e5e5e5" }}
            ></i>
          </div>
        </div>
        <div className="z-50 overflow-y-hidden ">
          <iframe
            src={select}
            title="W3Schools Free Online Web Tutorials"
            style={{
              width: "1000px",
              height: "600px",
            }}
            className=" p-2"
          />
        </div>
        {/* </div> */}
      </Dialog>
      <div className="text-sm justify-between mb-2 mt-5">
        <p className="font-bold text-gray-base">Suggestions for you</p>
        <div
          className=" mt-4 post-show"
          style={{
            height: "270px",
          }}
        >
          {skt && loopSkt()}

          {suggests &&
            suggests.map((item) => {
              return <SuggestionsProfiles key={item.id} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

// Suggestions.propTypes = {
//   open: PropTypes.bool.isRequired,
// };
