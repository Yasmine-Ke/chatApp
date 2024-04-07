import React, { useState } from "react";
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
import MessageContainer from "./MessageContainer";
import { useAuth } from "../hooks/useAuth";
const ChatBox = ({ isloading, messages }) => {
  const user = useAuth((state) => state.user);

  return (
    <div>
      <div>
        <h1 className="text-2xl text-center"># Welcome to the chat</h1>
      </div>
      {isloading ? (
        <div className="flex items-center justify-center h-full loader">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-lg">
          {/* <div className="mx-2 flex justify-end">
          <div className="flex w-11/12 flex-row-reverse">
            <UserCircleIcon className="inline-block h-10 w-10 rounded-full" />
            <div className="mr-4" />
            <div>
              <h1 className="text-right  text-sm">@username</h1>
              <div className="relative max-w-xl rounded-xl rounded-tr-none bg-blue-600 px-4 py-2">
                <span className="text-sm font-medium text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </span>
                <span className="absolute top-0 left-0 flex h-8 w-8 -translate-y-3 -translate-x-5 transform items-center justify-center rounded-full bg-muted-1 p-2 text-xs">
                  👍
                </span>
              </div>
              <h1 className="text-right  text-sm">15:54</h1>
            </div>
          </div>
        </div> */}
          {messages.length > 0 &&
            messages.map((msg) => (
              <MessageContainer
                key={msg.id}
                username={msg.userInfo.Nom + " " + msg.userInfo.Prenom}
                message={msg.Content}
                side={user.id === msg.sender ? 1 : 0}
                date={msg.heure}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
