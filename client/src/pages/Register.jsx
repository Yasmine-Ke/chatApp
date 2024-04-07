import React, { useState } from "react";
import reactsvg from "../assets/react.svg";
import axios from "axios";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const RegisterAcc = async () => {
    if (firstName && password && email && lastName) {
      const res = await axios.post("https://localhost:443/user/Create", {
        password,
        email,
        firstName,
        lastName,
      });
      if (res.status === 200) {
        setEmailSent(true);
      }
    }
  };
  return (
    <div className="flex justify-center flex-col gap-6 items-center bg-slate-900  h-screen ">
      {!emailSent ? (
        <div className=" flex flex-col bg-slate-800 items-center w-[600px] gap-10 p-5 rounded-md relative">
          <img
            src={reactsvg}
            alt=""
            className="absolute -top-6 p-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 "
          />
          <div className=" mx-auto flex justify-center mt-10 gap-6 w-full flex-col">
            <div className="flex flex-row items-center justify-center gap-3">
              <input
                type="text"
                placeholder="first name..."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full block px-5 py-3  outline-none  rounded-full ring-3 focus:ring-4  ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-700"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name..."
                className="w-full px-5 py-3 outline-none rounded-full ring-3 focus:ring-4 ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-600"
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <input
                type="email"
                placeholder="email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full block px-5 py-3  outline-none  rounded-full ring-3 focus:ring-4  ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-700"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password..."
                className="w-full px-5 py-3 outline-none rounded-full ring-3 focus:ring-4 ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-600"
              />
            </div>
            <button
              onClick={RegisterAcc}
              className="border-0 text-xl bg-blue-600 text-white rounded-full p-2"
            >
              Register
            </button>
          </div>
          <p className="text-white">
            Already have an account?{" "}
            <a className="italic text-blue-400 no-underline" href="/login">
              Login
            </a>
          </p>
        </div>
      ) : (
        <div className="w-screen flex flex-col gap-3 items-center bg-slate-900 text-xl text-white justify-center h-screen">
          <h1> We sent you a confirmation Email! on {email} !</h1>
          <a
            href="/login"
            className="bg-opacity-50 flex gap-2 bg-green-500 p-3 rounded-md hover:bg-opacity-100 transition-all "
          >
            {" "}
            {/* <img src="/arrow.png" className="filter" alt="" />{" "} */}
            <p> go back home</p>
          </a>
        </div>
      )}
    </div>
  );
};

export default Register;
