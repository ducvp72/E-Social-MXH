import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";

import { useCookies } from "react-cookie";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
export default function ChangeNameChat(props) {
  const { openChangeName, handleCloseChangeName } = props;
  const [cookies, ,] = useCookies("auth");
  const [inputStr, setInputStr] = useState("");
  const handleChangeName = async () => {};
  const handleInput = (event) => {
    if (event.target.value?.length >= 2200) {
      return;
    }
    setInputStr(event.target.value);
  };
  return (
    <>
      <Dialog
        maxWidth="xl"
        open={openChangeName}
        onClose={() => handleCloseChangeName()}
      >
        <div
          className="w-96 divide-y divide-gray-300"
          style={{
            height: "135px",
          }}
        >
          <div className="grid grid-cols-6 my-1 ">
            <div className=" ml-2 flex items-center cursor-pointer">
              <i
                onClick={() => {
                  handleCloseChangeName();
                }}
                className="fas fa-times fa-lg "
              ></i>
            </div>
            <div className="flex col-start-2 col-span-4 justify-center items-center gap-2">
              <p className=" font-medium text-xl">Change name the chat</p>
            </div>
            <div className="flex justify-end mr-2 ">
              <button
                onClick={() => {
                  handleChangeName();
                }}
                className="focus:outline-none text-blue-600 cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>
          <div className="">
            <div className="flex-1 flex items-center justify-between">
              <p className=" font-medium mt-2 ml-2 text-sm text-gray-500">
                Everyone will see the name of chat
              </p>

              <p className="text-gray-400 mt-2 mr-2 text-xs font-semibold">
                {inputStr?.length}/2,200
              </p>
            </div>
            <div className="p-2">
              <textarea
                rows="2"
                className="border-2 rounded-md border-gray-200 focus:outline-none  overflow-visible text-sm resize-none w-full  font-normal text-gray-base"
                value={inputStr || ""}
                onChange={handleInput}
                maxLength={2200}
                placeholder="Add a new Name..."
                type="text"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

// ChangeNameChat.propTypes = {
//   open: PropTypes.bool.isRequired,
// };
