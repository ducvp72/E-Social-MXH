import React, { useState } from "react";
import { Sidebar, ExpansionPanel } from "@chatscope/chat-ui-kit-react";
import { styles } from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import DropdownLink from "@material-tailwind/react/DropdownLink";
import AddMoreUser from "./addMoreUser";
import ChangeNameChat from "./changeNameChat";
export const SideBarChatRight = () => {
  const [open, setOpen] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const handleCloseChangeName = () => {
    setOpenChangeName(!openChangeName);
  };
  return (
    <Sidebar position="right">
      <ChangeNameChat
        openChangeName={openChangeName}
        handleCloseChangeName={handleCloseChangeName}
      />
      <AddMoreUser open={open} handleClose={handleClose} />
      <ExpansionPanel open title="Info" className="text-2xl">
        <div
          onClick={() => {
            setOpenChangeName(!openChangeName);
          }}
          className="flex items-center gap-2 text-gray-600 cursor-pointer rounded hover:bg-gray-200 hover:opacity-80"
        >
          <i className="fas fa-pen ml-1" />
          <p className="font-medium text-base p-2">Change the chat</p>
        </div>
      </ExpansionPanel>

      <ExpansionPanel open title="Members" className="text-2xl">
        <div className="flex mt-2 ">
          <div
            onClick={() => {
              handleClose();
            }}
            className=" w-full cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80"
          >
            <div className="flex items-center gap-2 text-gray-600">
              <i className="fas fa-plus-circle ml-2"></i>
              <p className=" font-medium text-base p-2">Add more member</p>
            </div>
          </div>
        </div>

        <div className="flex mt-2 ">
          <img
            className="rounded-full w-9 h-9 mr-3 cursor-pointer"
            src="/assets/image/defaultAvatar.png"
            alt="img"
          />
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="font-bold text-base">fullname</p>
              <p className=" font-normal text-gray-400 text-xs">Admin</p>
            </div>

            <Dropdown
              color="lightBlue"
              placement="bottom-start"
              buttonText={
                <>
                  <p className=" text-xs">Action</p>
                </>
              }
              buttonType="link"
              size="regular"
              rounded={false}
              block={false}
              ripple="dark"
            >
              <DropdownItem color="lightBlue" ripple="light" className="mt-2">
                Profile
              </DropdownItem>
              <hr />
              <DropdownLink
                className="mt-2"
                href="#"
                color="lightBlue"
                ripple="light"
                onClick={(e) => e.preventDefault()}
              >
                Remove Admin role
              </DropdownLink>
              <DropdownItem color="lightBlue" ripple="light">
                Leave Group
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="flex mt-2 ">
          <img
            className="rounded-full w-9 h-9 mr-3 cursor-pointer"
            src="/assets/image/defaultAvatar.png"
            alt="img"
          />
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="font-bold text-base">fullname</p>
              <p className=" font-normal text-gray-400 text-xs"> member</p>
            </div>
            <Dropdown
              color="lightBlue"
              placement="bottom-start"
              buttonText={
                <>
                  <p className=" text-xs">Action</p>
                </>
              }
              buttonType="link"
              size="regular"
              rounded={false}
              block={false}
              ripple="dark"
            >
              <DropdownItem color="lightBlue" ripple="light" className="mt-2">
                Profile
              </DropdownItem>
              <DropdownItem color="lightBlue" ripple="light" className="mt-2">
                Inbox
              </DropdownItem>
              <DropdownItem color="lightBlue" ripple="light" className="mt-2">
                Block
              </DropdownItem>
              <hr />
              <DropdownLink
                className="mt-2"
                href="#"
                color="lightBlue"
                ripple="light"
                onClick={(e) => e.preventDefault()}
              >
                Appoint as Admin
              </DropdownLink>
              <DropdownItem color="lightBlue" ripple="light">
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </ExpansionPanel>
      <ExpansionPanel title="Media" className="text-2xl">
        <div className=" cursor-pointer rounded text-blue-600 hover:bg-gray-200 hover:opacity-80">
          <p className=" font-normal text-base p-2">
            Will Upadate next version in the Future...
          </p>
        </div>
      </ExpansionPanel>
      <ExpansionPanel title="Options" className="text-2xl">
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-trash ml-1"></i>
            <p className=" font-medium text-base p-2">Delete</p>
          </div>
        </div>
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-minus-circle ml-1"></i>
            <p className=" font-medium text-base p-2">Block</p>
          </div>
        </div>
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-exclamation-triangle ml-1"></i>
            <p className=" font-medium text-base p-2">Report</p>
          </div>
        </div>
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-sign-out-alt ml-1" />
            <p className=" font-medium text-base p-2">Leave Group</p>
          </div>
        </div>
      </ExpansionPanel>
    </Sidebar>
  );
};
