import React, { useEffect, useState } from "react";
import {
  SparklesIcon,
  HashtagIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserPlusIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import ChatSide from "../components/ChatSide";
import CreatePopup from "../components/CreatePopup";
import InvitationPopup from "../components/InvitationPopup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Chat = () => {
  const [showAddChat, setShowAddChat] = useState(false);
  const [showInvites, setShowInvites] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatSelected, setChatSelected] = useState(null);
  const logout = useAuth((state) => state.logout);
  const user = useAuth((state) => state.user);
  let navigate = useNavigate();
  const prenom = localStorage.getItem("email");
  
  useEffect(() => {
    if (chatSelected) {
      localStorage.setItem("selectedChat", chatSelected.Titre);

    }
  }, [chatSelected]);

  const fetchChannels = async () => {
    const response = await axios.post("https://localhost:443/chat/get", {
      id: user.id,
      type: "channel",
    });
    setChannelList(response.data);
  };
  const fetchChats = async () => {
    const response = await axios.post("https://localhost:443/chat/get", {
      id: user.id,
      type: "chat",
    });
    setChatList(response.data);
  };
  useEffect(() => {
    setLoading(true);

    Promise.all([fetchChats(), fetchChannels()])
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row flex-wrap">
      <div className="h-screen overflow-y-scroll w-full relative md:w-[30%] bg-[#1e2124] text-[#99aab5] flex flex-col items-center gap-3 py-10">
        {loading ? (
          <div role="status" className="items-center justify-center flex h-[90%]">
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <div className="w-[90%] mx-auto flex flex-row items-center flex-wrap justify-between ">
              <h1 className="text-2xl text-start p-3 ">SsiChat</h1>
              <button
                onClick={() => setShowAddChat((pop) => !pop)}
                className=" w-44 p-3 rounded-full bg-gradient-to-l from-[#3e59b9] to-[#112f9c] text-xl text-white"
              >
                <span className="flex flex-row items-center gap-2">
                  <PlusCircleIcon className="w-7" />
                  <p>new Chat</p>
                </span>
              </button>
            </div>

            <div className="w-[95%] mx-auto">
              <div className="flex flex-row items-center justify-center my-5">
                <SparklesIcon className="w-7  " />

                <h1 className="text-xl text-start  w-full p-3 ">Channels</h1>
              </div>
              <div>
                {channelList.length > 0 ? (
                  <ul className="w-[90%] mx-auto flex flex-col gap-2">
                    {channelList.map((channel) => (
                      <li
                        key={channel.id}
                        onClick={() => setChatSelected(channel)}
                        className="flex flex-row items-center p-3 gap-2 rounded-full  hover:bg-[#33373a]"
                      >
                        <HashtagIcon className="w-5  " />
                        <p>{channel.Titre}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <li className="flex flex-row items-center p-3 gap-2 rounded-full ">
                    <HashtagIcon className="w-5  " />
                    <p>No channels...</p>
                  </li>
                )}
              </div>
            </div>
            <div className="w-[95%] mx-auto">
              <div className="flex flex-row items-center justify-center my-5">
                <SparklesIcon className="w-7  " />

                <h1 className="text-xl text-start  w-full p-3 ">Chats</h1>
              </div>
              <div>
                {chatList.length > 0 ? (
                  <ul className="w-[90%] mx-auto flex flex-col gap-2">
                    {chatList.map((chat) => (
                      <li
                        key={chat.id}
                        onClick={() => setChatSelected(chat)}
                        className="flex flex-row items-center p-3 gap-2 rounded-full  hover:bg-[#33373a]"
                      >
                        <ChatBubbleOvalLeftEllipsisIcon className="w-5  " />
                        <p>{chat.Titre}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <li className="flex flex-row items-center p-3 gap-2 rounded-full ">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5  " />
                    <p>No chats...</p>
                  </li>
                )}
              </div>
            </div>
         
            <div className="w-full flex flex-row items-center justify-between my-5">
              <div className="flex flex-row w-[95%] mx-auto items-center justify-center">
                <UserCircleIcon className="w-10" />
                <div className="flex flex-col ml-3">
                  <h1 className="text-xl text-start p-3">User : {prenom}</h1>
                  <div style={{ marginBottom: '8px' }}></div> 
                  <button
                    onClick={() => {
                      setShowInvites((pop) => !pop);
                    }}
                    className="flex flex-row items-center justify-between hover:bg-[#33373a] my-2"
                  >
                    <span className="flex flex-row items-center justify-center">
                      <UserPlusIcon className="w-7" />
                      <h1 className="text-xl text-start w-full p-3">Invitations</h1>
                    </span>
                    <p className="px-3 py-1 rounded-full text-white bg-red-700">?</p>
                  </button>
                </div>
              </div>
              <ArrowRightStartOnRectangleIcon
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="w-7 mx-5"
              />
            </div>
          </>
        )}
      </div>
      <div className="w-full h-full md:w-[70%] overflow-y-scroll">
        {chatSelected ? (
          <ChatSide
            name={chatSelected.Titre}
            type={chatSelected.type}
            selected={chatSelected.id}
          />
        ) : (
          <div className="flex items-center h-full w-full bg-slate-900 font-bold text-white italic font-sans text-xl">
            <p className=" font-bold text-white italic mx-auto font-sans text-xl ">
              no chat Selected Yet!
            </p>
          </div>
        )}
      </div>
      <InvitationPopup
        onClose={() => setShowInvites(false)}
        isvisible={showInvites}
      />
      <CreatePopup
        fetchChannels={fetchChannels}
        fetchChats={fetchChats}
        onClose={() => setShowAddChat(false)}
        isvisible={showAddChat}
      />
    </div>
  );
};

export default Chat;

