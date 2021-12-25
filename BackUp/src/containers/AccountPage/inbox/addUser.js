import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import { useCookies } from "react-cookie";
import UserChoosen from "./UserChoosen";
import Multiselect from "multiselect-react-dropdown";
export default function AddUserChat(props) {
  const { open, handleClose } = props;
  const [cookies, ,] = useCookies("auth");
  const [onSelect, setOnSelect] = useState([]);
  const [listUser, setListUser] = useState([
    {
      cat: "1",
      key: "Group 1",
    },
    {
      cat: "2",
      key: "Group 2",
    },
    {
      cat: "3",
      key: "Group 3",
    },
    {
      cat: "4",
      key: "Group 4",
    },
    {
      cat: "5",
      key: "Group 5",
    },
    {
      cat: "6",
      key: "Group 6",
    },
    {
      cat: "7",
      key: "Group 7",
    },
    {
      cat: "8",
      key: "Group 8",
    },
  ]);

  // useEffect(() => {
  //   console.log("OnSelect", onSelect);
  // }, [onSelect]);

  const renderOption = () => {
    let arr = [];
    for (let i = 0; i < listUser.length; i++) {
      arr = [...arr, <UserChoosen key={i} />];
    }
    return arr;
  };

  const handleCreateChat = () => {
    console.log("Create");
  };

  return (
    <>
      <Dialog maxWidth="xl" open={open} onClose={() => handleClose()}>
        <div
          className="w-96 divide-y divide-gray-300"
          style={{
            height: "400px",
          }}
        >
          <div className="grid grid-cols-6 my-1 ">
            <div className=" ml-2 flex items-center cursor-pointer">
              <i
                onClick={() => {
                  handleClose();
                }}
                className="fas fa-times fa-lg "
              ></i>
            </div>
            <div className="flex col-start-2 col-span-4 justify-center items-center gap-2">
              <p className=" font-medium text-xl">New Message</p>
            </div>
            <div className="flex justify-end mr-2 ">
              <button
                onClick={() => {
                  handleCreateChat();
                }}
                className="focus:outline-none text-blue-600 cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
          <div className="">
            <p className=" font-normal mt-2 ml-2">To:</p>
            <div className="">
              <Multiselect
                customCloseIcon={
                  <>
                    <i className="fas fa-backspace ml-1 cursor-pointer"></i>
                  </>
                }
                displayValue={"key"}
                placeholder="Search..."
                onKeyPressFn={function noRefCheck() {}}
                onRemove={(e) => {
                  console.log(e);
                }}
                onSelect={(e) => {
                  console.log(e);
                }}
                onSearch={function noRefCheck() {}}
                showCheckbox
                closeOnSelect
                options={listUser}
                style={{
                  // optionContainer: {
                  //   "::-webkit-scrollbar-thumb ": {
                  //     background: " rgba(219, 215, 215, 0.925)",
                  //   },
                  //   "::-webkit-scrollbar": {
                  //     width: "0em",
                  //   },
                  // },
                  chips: {
                    background: "#e0f1ff",
                    color: "#0999f6",
                  },
                  multiselectContainer: {
                    color: "grey",
                  },
                  searchBox: {
                    border: "none",
                    "border-bottom": "1px solid #e3e3e3",
                    "border-radius": "0px",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

AddUserChat.propTypes = {
  open: PropTypes.bool.isRequired,
};
