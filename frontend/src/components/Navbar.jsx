import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = () => {

  const [open,setOpen] = useState(false);
  const [loginOpen,setLoginOpen] = useState(false);
  const [signupOpen,setSignupOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");

    window.location.reload();

  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-gradient-to-r from-purple-700/30 via-purple-00/0 to-indigo-300/80 shadow-lg border-b border-purple-600/90">

        {/* liquid blur elements */}

        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 opacity-30 blur-3xl rounded-full"></div>
        <div className="absolute -top-10 right-10 w-40 h-40 bg-indigo-400 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

          {/* LOGO */}

          <Link
            to="/"
            className="text-4xl font-bold tracking-wide bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent hover:scale-105 transition"
          >
            EVORA
          </Link>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center space-x-6 font-medium">

            <Link className="hover:text-purple-200 transition" to="/">
              Home
            </Link>

            <Link className="hover:text-purple-200 transition" to="/about">
              About
            </Link>

            {token && (
              <Link className="hover:text-purple-200 transition" to="/dashboard">
                Dashboard
              </Link>
            )}

            {!token && (
              <>
                <button
                  onClick={()=>setLoginOpen(true)}
                  className="px-4 py-2 rounded-lg border border-white/40 hover:bg-white/20 transition"
                >
                  Login
                </button>

                <button
                  onClick={()=>setSignupOpen(true)}
                  className="px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:scale-105 transition"
                >
                  Sign Up
                </button>
              </>
            )}

            {token && (
              <div className="flex items-center gap-3">

                <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">

                  <div className="w-6 h-6 bg-purple-300 rounded-full"></div>

                  <span> {username || "User"}</span>

                </div>

                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition text-white  rounded-xl shadow-lg mb-1 px-4 py-2 rounded-lg hover:bg-red-900 transition"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

          {/* MOBILE MENU ICON */}

          <div
            className="md:hidden cursor-pointer"
            onClick={()=>setOpen(!open)}
          >
            {open ? <FiX size={24}/> : <FiMenu size={24}/>}
          </div>

        </div>

        {/* MOBILE MENU */}

        {open && (

          <div className="md:hidden bg-purple-700/90 backdrop-blur px-6 py-5 flex flex-col gap-4 text-white">

            <Link to="/">Home</Link>

            <Link to="/about">About</Link>

            {token && <Link to="/dashboard">Dashboard</Link>}

            {!token && (
              <>
                <button onClick={()=>setLoginOpen(true)}>Login</button>
                <button onClick={()=>setSignupOpen(true)}>Sign Up</button>
              </>
            )}

            {token && (
              <>
                <span>Hi {username}</span>

                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        )}

      </nav>

      {loginOpen && <LoginModal close={()=>setLoginOpen(false)}/>}

      {signupOpen && <SignupModal close={()=>setSignupOpen(false)}/>}

    </>
  );
};

export default Navbar;