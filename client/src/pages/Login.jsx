/*import React, { useState } from "react";
import reactsvg from "../assets/react.svg";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import withRouter from "../components/withRouter";
import { supabase } from "../supabase"; // Importez votre client Supabase

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const login = useAuth((state) => state.login);
  const navigate = useNavigate(); // Move useNavigate here

  const SignIn = async () => {
    console.log("qwdwqdqwd");
    if (username && password) {
      try {
        // Connexion de l'utilisateur
        const { user, error } = await supabase.auth.signIn({
          email: username,
          password: password,
        });

        if (error) {
          throw new Error(error.message);
        }

        // Récupération du nom et du prénom depuis Supabase
        const { data, error: supabaseError } = await supabase
          .from("User")
          .select("Nom, Prenom")
          .eq("Email", username)
          .single();

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        // Mise en localStorage
        localStorage.setItem("nom", data.Nom);
        localStorage.setItem("prenom", data.Prenom);

        // Redirection vers la page de chat
        navigate("/chat");
      } catch (error) {
        // Gestion de l'erreur
        console.error("Error during login:", error);
        setLoginError("Error during login: " + error.message);
      }
    } else {
      // Gestion du cas où le nom d'utilisateur ou le mot de passe est vide
      setLoginError("Please enter username and password.");
    }
  };

  return (
    <div className="flex justify-center flex-col gap-6 items-center bg-slate-600 h-screen ">
      <div className=" flex flex-col bg-slate-800 items-center w-[500px] gap-10 p-5 rounded-md relative">
        <img
          src={reactsvg}
          alt=""
          className="absolute -top-6 p-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 "
        />
        <div className=" mx-auto flex justify-center mt-10 gap-6 w-full flex-col">
        
          {loginError && (
            <p className="text-center text-red-600 font-bold">{loginError}</p>
          )}

        
          <input
            type="text"
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full block px-5 py-3  outline-none  rounded-full ring-3 focus:ring-4  ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-700"
          />

      
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password..."
            className="w-full px-5 py-3 outline-none rounded-full ring-3 focus:ring-4 ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-600"
          />

         
          <button
            onClick={SignIn}
            className="border-0 text-xl bg-blue-600 text-white rounded-full p-4"
          >
            Login
          </button>
        </div>

      
        <p className="text-white">
          you don't have an account yet?{" "}
          <a className="italic text-blue-400 no-underline" href="/register">
            Join us
          </a>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Login);
*/

import React, { useState } from "react";
import reactsvg from "../assets/react.svg";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import withRouter from "../components/withRouter";

import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

const supabase = createClient(supabaseUrl, supabaseKey);
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const login = useAuth((state) => state.login);
  const navigate = useNavigate(); // Move useNavigate here

  const SignIn = async () => {
    console.log("qwdwqdqwd");
    if (username && password) {
      localStorage.setItem("email", username);
      try {
        login({ email: username, password: password }, props.router);


       
       
        const { data1, error } = await supabase
        .from("User")
        .select("Nom")
        .eq("Email", username)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (!data1) {
        throw new Error("User not found");
       
      }
console.log(data1)
      // Mise en localStorage
      localStorage.setItem("nom", data1);
      localStorage.setItem("prenom", data1.Prenom);




        navigate("/chat");
        console.log(data1)
        //   const res = await axios.post("http://localhost:5000/user/Signin", {
        //     email: username,
        //     password: password,
        //   });
        //   // Handle successful response
        //   console.log(res); // Example: assuming the server returns data
      } catch (error) {
        // Handle error
        console.log(error);
        // setLoginError(error); // Update loginError with the error message
        //   console.error("Error during API call:", error);
      }
    } else {
      // Handle case when username or password is empty
    }
  };
  return (
    <div className="flex justify-center flex-col gap-6 items-center bg-slate-600 h-screen ">
      <div className=" flex flex-col bg-slate-800 items-center w-[500px] gap-10 p-5 rounded-md relative">
        <img
          src={reactsvg}
          alt=""
          className="absolute -top-6 p-2 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 "
        />
        <div className=" mx-auto flex justify-center mt-10 gap-6 w-full flex-col">
          {/* {loginError && (
            <p className="text-center text-red-600 font-bold">{loginError}</p>
          )} */}

          <input
            type="text"
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full block px-5 py-3  outline-none  rounded-full ring-3 focus:ring-4  ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-700"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password..."
            className="w-full px-5 py-3 outline-none rounded-full ring-3 focus:ring-4 ring-slate-400 focus:ring-blue-700 focus:shadow-md focus:shadow-blue-600"
          />
          <button
            onClick={SignIn}
            className="border-0 text-xl bg-blue-600 text-white rounded-full p-4"
          >
            Login
          </button>
        </div>
        <p className="text-white">
          you don't have an account yet?{" "}
          <a className="italic text-blue-400 no-underline" href="/register">
            Join us
          </a>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Login);