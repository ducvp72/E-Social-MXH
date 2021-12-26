import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";

export default function DialogAction(props) {
  const { onClose, open } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="w-64 divide-y divide-gray-300">
        <div className=" cursor-pointer bg-gradient-to-r py-2 px-4  hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-red-500 text-lg font-medium text-center">
          Chặn
        </div>
        <div className="cursor-pointer py-2 px-4  bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-red-500 text-lg font-medium text-center">
          Báo cáo
        </div>
        <div
          onClick={onClose}
          className="  cursor-pointer py-2 px-4 bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-white text-gray-700 text-lg font-medium text-center"
        >
          Hủy
        </div>
      </div>
    </Dialog>
  );
}

DialogAction.propTypes = {
  open: PropTypes.bool.isRequired,
};
