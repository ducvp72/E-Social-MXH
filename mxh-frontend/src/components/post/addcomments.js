import React from "react";
import { useState } from "react";

const Addcomments = () => {
  const [comment, setComment] = useState("");
  const handleSubmitComment = (event) => {
    event.preventDefault();
    setComment('');
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-3 px-2"
          type="text"
          value={comment}
          onChange={({target}) => setComment(target.value)}
          name="add-comment"
          placeholder="Add a comment..."
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Addcomments;
