import React from "react";
import { useState, useRef } from "react";
import Picker from "emoji-picker-react";
import { useOnClickOutside } from "./../../utils/handleRefresh";
import "./style.css";
const Addcomments = () => {
  const [inputStr, setInputStr] = useState([]);
  const [comment, setComment] = useState("");
  const [active, setActive] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  useOnClickOutside(buttonRef, modalRef, () => setActive(false));

  const onEmojiClick = (e, emojiObject) => {
    if (inputStr?.length >= 2200) {
      return;
    }
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setActive(false);
  };

  const handleInput = (event) => {
    if (event.target.value?.length >= 2200) {
      return;
    }
    setInputStr(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setComment("");
  };
  return (
    <div className="border-gray-primary mb-2">
      <form
        className="flex justify-between pl-0 pr-5 items-center"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        {active ? (
          <div
            ref={modalRef}
            className="absolute transform -translate-y-2/3 mt-10"
            style={{ width: "20%" }}
          >
            <Picker
              onEmojiClick={onEmojiClick}
              // pickerStyle={{ width: "30%" }}
            />
          </div>
        ) : null}
        <img
          className="rounded w-6 h-6 mt-1  cursor-pointer"
          src={"/assets/image/emoji.png"}
          alt="emokiimg"
          onClick={() => setActive(!active)}
          ref={buttonRef}
        />
        {/* <div contenteditable="true"></div> */}
        <textarea
          cols=""
          rows="1"
          className="border-2 rounded-md border-gray-200 ml-1 focus:outline-none relative break-words overflow-visible  mr-1 py-3 px-2 text-sm resize-none w-full mt-2 font-normal text-gray-base"
          value={inputStr}
          onChange={handleInput}
          maxLength={2200}
          placeholder="Add a comment..."
          type="text"
          autoComplete="off"
        />

        {/* <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-3 px-2"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          name="add-comment"
          placeholder="Add a comment..."
        /> */}

        <button
          className={`text-lg focus:outline-none font-bold text-blue-medium ${
            !inputStr && "opacity-25"
          }`}
          type="button"
          disabled={inputStr.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Addcomments;
