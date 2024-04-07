import React, { useState } from "react";
import reactsvg from "../assets/react.svg";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center flex-col gap-5 items-center bg-slate-600 h-screen ">
      <img src={reactsvg} alt="" />
      <form
        className="w-[450px] mx-auto flex justify-center gap-5 flex-col"
        action=""
      >
        <input
          type="text"
          placeholder="username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full block px-5 py-3  outline-none  rounded-full ring-2 ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-700"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password..."
          className="w-full px-5 py-3 outline-none rounded-full ring-2 ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-700"
        />
        <button className="border-0 bg-blue-600 text-white rounded-full p-4">
          Login
        </button>
      </form>
      <p className="text-white">
        you don't have an account yet?{" "}
        <a className="italic text-blue-400 no-underline" href="/register">
          Join us
        </a>
      </p>
    </div>
  );
};

export default Register;
