import React, { useEffect, useRef, useState } from "react";
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
import ChatBox from "./ChatBox";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import io from "socket.io-client";

const ChatSide = ({ name, type, selected }) => {
  const [infoShow, setInfoShow] = useState(false);
  const showInfo = () => {
    setInfoShow((showing) => !showing);
  };
  const [messages, setMessages] = useState([]);
  const user = useAuth((state) => state.user);
  const [content, setContent] = useState("");
  const [socketId, setSocketId] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const socketRef = useRef();
  const chatName = localStorage.getItem("selectedChat");
  const userName = localStorage.getItem("nom");
  const prenom = localStorage.getItem("email");
  useEffect(() => {
    socketRef.current = io.connect("https://localhost:443");

    socketRef.current.on("id", (id) => {
      console.log(id);
      setSocketId(id);
    });

    socketRef.current.on(`message-${selected}`, (msg) => {
      console.log("Message received from server:", messages, msg);
      if (!messages.some((m) => m.id === msg.id)) {
        setMessages((oldmsgs) => {
          // Check if oldmsgs is an array, if not, initialize it as an empty array
          if (!Array.isArray(oldmsgs)) {
            oldmsgs = [];
          }
          return [...oldmsgs, msg];
        });
        console.log([...messages, msg]);
      }
    });

    return () => {
      console.log("disconnecting");
      socketRef.current.disconnect();
    };
  }, [selected]);

  useEffect(() => {
    //fetch messages

    const fetchMessages = async () => {
      //fetch chat table with type chat
      try {
        setChatLoading(true);

        const response = await axios.post("https://localhost:443/Message/get", {
          chatId: selected,
        });
        console.log(response.data);
        setMessages(response.data);
      } catch (err) {
        setChatLoading(false);
        throw err;
      } finally {
        setChatLoading(false);
      }
    };

    fetchMessages();
  }, [selected]);

  const createMessage = async () => {
    if (content && user) {
      const now = new Date();
      const dateFormatted = now.toISOString().split("T")[0]; // yyyy-mm-dd
      const timeFormatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // hh:mm

      console.log(dateFormatted, timeFormatted, selected, content, user.id);
      const payload = {
        chatId: selected,
        content: content,
        sender: user.id,
        date: dateFormatted,
        heure: timeFormatted,
      };

      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            "https://localhost:443/Message/Add",
            payload
          );
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      })
        .then((responseData) => {
          socketRef.current.emit("send message", responseData);
          console.log(responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="h-full transition-all  text-white bg-yellow-300 w-full mx-auto flex flex-row ">
      <div
        className={` transition-all bg-[#424549] ${
          infoShow ? "w-4/6" : "w-full"
        }`}
      >
        <div className="flex flex-row items-center justify-between px-5 py-2 bg-[#282b30]">
          <div>
            <span className="flex flex-row items-center gap-3">
              <UserCircleIcon className="w-20" />
              <span>
                <p className="text-xl font-bold">{name}</p>
                <p className=" text-sm font-sans">{type}</p>
              </span>
            </span>
          </div>
          <button onClick={showInfo}>
            <InformationCircleIcon className="w-10" />
          </button>
        </div>
        <div className="h-[75%] overflow-y-auto bg-[#36393e]">
          <ChatBox isloading={chatLoading} messages={messages} />
        </div>
        <div className="buttons flex flex-row items-center justify-center gap-5      px-5 py-2 h-1/6 bg-[#282b30]">
          <div className="flex flex-row p-1 rounded-full  gap-1  ring-2 ring-[#ffff] focus:ring-blue-500 w-[85%] items-center">
            <button className="emojis bg-[#1e2124] rounded-full px-3 py-3  border-2 border-white">
              <FaceSmileIcon className="w-7" />
            </button>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your message..."
              className="w-[90%] text-lg outline-none p-2 bg-[#282b30]"
            />
          </div>
          <button onClick={createMessage}>
            <PaperAirplaneIcon className="bg-gradient-to-l from-[#3e59b9] to-[#112f9c] rounded-full -rotate-45 p-2 w-12" />
          </button>
        </div>
      </div>

      <div
        className={`transition-all flex flex-col gap-10 items-center justify-between   bg-[#424549] ${
          !infoShow ? "w-[0]" : "w-2/6"
        }`}
      >
        <div
          className={`${
            !infoShow ? "w-[0]" : "w-full"
          } h-[80%] flex flex-col gap-10 items-center justify-between  my-auto`}
        >
          {infoShow && (
            <>
              <div className="flex flex-col items-center justify-center">
                <UserCircleIcon className="w-20 " />
                <h1>{chatName}</h1>
              </div>

              <div>
                <h1>Members</h1>
                <span>{prenom} </span>
              </div>
              <div className="flex flex-row gap-5 items-center justify-center w-[70%] mx-auto">
                <button className="bg-red-700 text-white px-3 py-2 rounded-full">
                  Delete Chat
                </button>
                <button>Modify Chat</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSide;
