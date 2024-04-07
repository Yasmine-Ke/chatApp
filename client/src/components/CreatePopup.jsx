import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const CreatePopup = ({ isvisible, onClose, fetchChats, fetchChannels }) => {
  const handleClose = (e) => {
    if (e.target?.id == "wrapper") {
      onClose();
    }
  };
  const [selectedOption, setSelectedOption] = useState(0);
  const [addedMembers, setAddedMembers] = useState([]);
  const [DestEmail, setToEmail] = useState("");
  const [emailInstance, setEmailInstance] = useState("");
  const [EmailList, setEmailList] = useState([]);
  const [Title, setTitle] = useState("");
  useEffect(() => {
    setAddedMembers(["@ilyes", "@amine", "@rayane"]);
  }, []);

  const user = useAuth((state) => state.user);
  const createChat = async () => {
    if (Title && DestEmail && user.id) {
      const res = await axios.post(
        "https://localhost:443/Invitation/Sentinvi",
        { Title, DestEmail, From: user.id }
      );
      console.log(res.data);
      if (res.status === 200) {
        onClose();
        fetchChats();
      }
    }
  };

  const createChannel = async () => {
    if (EmailList.length > 0 && Title && user.id) {
      const res = await axios.post(
        "https://localhost:443/Invitation/Sentinvigroup",
        { Title, members: EmailList, From: user.id }
      );
      console.log(res.data);
      if (res.status === 200) {
        onClose();
        fetchChannels();
      }
    }
  };
  if (!isvisible) return null;
  return (
    <div
      onClick={(e) => handleClose(e)}
      id="wrapper"
      className="fixed flex inset-0 bg-black bg-opacity-25  backdrop-blur-sm justify-center items-center"
    >
      <div className="w-[750px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
          <h1 className="text-center text-xl">Choose Type of chat</h1>
          <div className="flex flex-row items-center p-5 text-lg relative rounded-full bg-[#282b30] justify-center   text-white">
            <span
              className={`absolute top-0 left-0 h-full  transition-all ${
                selectedOption === 1 ? "translate-x-full" : ""
              } rounded-full bg-gradient-to-l from-[#3e59b9]  to-[#112f9c] w-1/2`}
            ></span>
            <span
              onClick={() => {
                setSelectedOption(0);
              }}
              className="cursor-pointer text-xl rounded-2xl w-1/2  z-10 text-center "
            >
              Chat
            </span>
            <span
              onClick={() => {
                setSelectedOption(1);
              }}
              className="cursor-pointer text-xl rounded-full w-1/2 z-10  text-center"
            >
              Channel
            </span>
          </div>
          <div className="w-full p-5 font-sans bg-[#282b30] rounded-lg">
            {selectedOption === 0 ? (
              <div className=" flex flex-col gap-5">
                <div className="flex flex-row gap-4 justify-center items-center">
                  <label htmlFor="title" className="text-xl text-white">
                    Chat Title
                  </label>
                  <input
                    type="text"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title..."
                    className="p-2  flex-grow rounded-full px-4 outline-none"
                  />
                </div>
                <div className="flex flex-row gap-4 justify-center items-center">
                  <label htmlFor="title" className="text-xl text-white">
                    Chat With
                  </label>
                  <input
                    type="text"
                    value={DestEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    placeholder="@username..."
                    className="p-2  flex-grow rounded-full px-4 outline-none"
                  />
                  <button className="p-3 rounded-r-lg  bg-gradient-to-l from-[#3e59b9]  to-[#112f9c]  text-white ">
                    Check
                  </button>
                </div>
                <button
                  onClick={createChat}
                  className="p-3 text-xl text-white rounded-full  bg-gradient-to-l from-[#3e59b9]  to-[#112f9c] "
                >
                  Create
                </button>
              </div>
            ) : (
              <div className=" flex flex-col gap-5">
                <div className="flex flex-row gap-4 justify-center items-center">
                  <label htmlFor="title" className="text-xl text-white">
                    Chat Title
                  </label>
                  <input
                    type="text"
                    placeholder="title..."
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2  flex-grow rounded-full px-4 outline-none"
                  />
                </div>
                <div className="flex flex-row gap-4 justify-center items-center">
                  <label htmlFor="title" className="text-xl text-white">
                    Chat With
                  </label>
                  <input
                    type="text"
                    placeholder="@username..."
                    value={emailInstance}
                    onChange={(e) => setEmailInstance(e.target.value)}
                    className="p-2  flex-grow rounded-full px-4 outline-none"
                  />
                  <button
                    onClick={() => {
                      setEmailList([...EmailList, emailInstance]);
                      setEmailInstance("");
                    }}
                    className="p-3 rounded-r-lg  bg-gradient-to-l from-[#3e59b9]  to-[#112f9c]  text-white "
                  >
                    Add
                  </button>
                </div>
                <span className="3 text-xl text-white">
                  Members:{" "}
                  {EmailList.length > 0 ? (
                    <ul>
                      {EmailList.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  ) : (
                    <>none added</>
                  )}
                </span>

                <button
                  onClick={createChannel}
                  className="p-3 text-xl text-white rounded-full  bg-gradient-to-l from-[#3e59b9]  to-[#112f9c] "
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePopup;
