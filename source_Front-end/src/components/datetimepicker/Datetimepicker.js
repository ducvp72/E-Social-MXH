import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
const Datetimepicker = () => {
  return (
    <div>
      <label className="block mb-2 font-bold">University </label>
      <select
        type="text"
        className="w-full h-8 border border-gray-700 p-1 rounded outline-none focus:border-primarycolor"
      >
        <option disabled selected value="">
          Choose your University
        </option>
        <option value="UTE">UTE</option>
        <option value="BK">BK</option>
        <option value="UIT">UIT</option>
      </select>
    </div>
  );
};

export default Datetimepicker;
