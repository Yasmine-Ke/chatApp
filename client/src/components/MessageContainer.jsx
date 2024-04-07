import React from "react";
import {
  SparklesIcon,
  HashtagIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserPlusIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
  PlusCircleIcon,
  InformationCircleIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
const MessageContainer = ({ username, message, date, side }) => {
  return (
    <div
      className={`mx-2 flex ${side === 1 ? "justify-end" : "justify-start"}`}
    >
      {" "}
      {/**justify-start */}
      <div
        className={`flex w-11/12 items-center ${
          side === 1 ? "flex-row-reverse" : ""
        }`}
      >
        {" "}
        {/**flex-row-reverse */}
        <UserCircleIcon className={`inline-block h-10 w-10 rounded-full`} />
        <div className="mr-4" />
        <div>
          <h1
            className={`  ${side === 1 ? "text-right" : "text-left "} text-sm`}
          >
            @{username}
          </h1>{" "}
          {/**text-left */}
          <div
            className={`relative max-w-xl rounded-xl rounded-tr-none ${
              side === 1 ? "bg-blue-600" : "bg-[#1e2124]"
            } px-4 py-2`}
          >
            <span className={`text-sm font-medium text-white`}>{message}</span>
            { <span
              className={`absolute top-0 ${
                side === 1
                  ? "left-0 -translate-x-5 bg-muted-1"
                  : "translate-x-5 right-0 bg-[#1e2124]"
              } flex h-8 w-8 -translate-y-3  transform items-center justify-center rounded-full  p-2 text-xs`}
            >
              👍
            </span> }
          </div>
          <h1
            className={` ${side === 1 ? "text-right" : "text-left "}  text-xs`}
          >
            {date}
          </h1>{" "}
          {/**text-left */}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
