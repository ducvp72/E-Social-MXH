import "./styles.css";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
const randomWords = require("random-words");
export const Suggestions = () => {
  const [openNew, setOpenNew] = useState(false);
  const [select, setSelect] = useState(null);
  const [open, setOpen] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [words, setWords] = useState(null);

  useEffect(() => {
    randomVocabulary();
    axios({
      method: "get",
      url: "https://www.boredapi.com/api/activity",
    })
      .then((res) => {
        setAdvice(res.data.activity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const randomVocabulary = async () => {
    const random = await randomWords();
    await axios({
      method: "get",
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${random}`,
    })
      .then((res) => {
        setWords(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelect("");
  };
  const choosing = (choose) => {
    setSelect(choose);
    setOpen(true);
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
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center text-center"
          style={{
            width: "350px",
            // height: "80px",
          }}
        >
          <p className=" text-white text-xl font-avatar p-5 flex gap-2 items-center justify-center">
            <img
              className="w-16 h-16"
              src="/assets/image/think.png"
              alt="think"
            />
            {advice}
          </p>
        </div>
        {/* <p className="font-bold text-gray-base">Suggestions for you</p> */}
        <div className=" rounded flex mt-4 post-show bg-transparent opacity-70 flex-col items-center justify-center">
          <div
            style={{
              width: "350px",
            }}
            className=" shadow-2xl border rounded border-gray-200  p-5 bg-transparent flex items-center justify-center flex-col gap-2"
          >
            {words && (
              <>
                <p className=" font-avatar text-2xl">
                  {words?.word} ({" "}
                  {words ? `${words?.meanings[0].partOfSpeech}` : null})
                </p>

                <p className="  text-2xl">
                  {words ? `/${words?.phonetics[0].text}/` : null}
                </p>
                <p className=" italic text-sm font-light">
                  Meaning:
                  {words
                    ? ` ${words?.meanings[0].definitions[0].definition}`
                    : null}
                </p>
                <p className="">
                  Ex:
                  {words
                    ? ` ${words?.meanings[0].definitions[0].example}`
                    : null}
                </p>
                <audio
                  className=" flex w-full items-center z-30 mt-2 "
                  controls
                >
                  <source
                    src={`https:${words?.phonetics[0].audio}`}
                    type="audio/mp3"
                  />
                </audio>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Suggestions.propTypes = {
//   open: PropTypes.bool.isRequired,
// };
