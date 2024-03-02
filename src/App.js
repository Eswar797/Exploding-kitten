import { motion, useAnimation } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetProfile, setIsAuthenticated } from "./context/Slices";
import Game from "./screens/Game";
import Home from "./screens/Home";
import LoginScreen from "./screens/Login";
import Result from "./screens/Result";
import SignUp from "./screens/SignUp";

function App() {
  const [showProfile, setShowProfile] = useState(false);

  const drawer = useAnimation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      dispatch(setIsAuthenticated(true));
      GetProfile(dispatch);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, dispatch]);

  const drawerOpener = useCallback(
    function () {
      if (showProfile) {
        drawer.start({ translateX: 0 });
      } else {
        drawer.start({ translateX: "120%" });
      }
    },
    [drawer, showProfile]
  );

  useEffect(() => {
    drawerOpener();
    GetProfile(dispatch);
  }, [showProfile, drawerOpener, isAuthenticated,dispatch]);
  console.log(isAuthenticated);

  return (
    <div className="  w-full h-full bg-neutral-950 text-neutral-200 font-normal">
      <header className="flex justify-between items-start px-6 pt-5 fixed w-full  z-[999]">
        <Link className=" cursor-pointer" to="/">
          <div className="h-[5vw] w-[5vw]">
            <img
              src="https://s3-storage.textopus.nl/wp-content/uploads/2016/01/18010947/Exploding-Kittens-icon.png"
              alt="catimage"
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
        {isAuthenticated ? (
          <div
            className={` ${
              isAuthenticated ? "flex" : "hidden"
            }cursor-pointer relative`}
          >
            <span
              onClick={() => setShowProfile(true)}
              className="bg-gradient-to-tl from-orange-600 via-red-700 to-yellow-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className={showProfile ? "hidden" : "w-12 h-12"}
              >
                {/* Define the linear gradient */}
                <defs>
                  <linearGradient
                    id="icon-gradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#FBBF24" />
                  </linearGradient>
                </defs>
                {/* Apply the gradient to the path */}
                <path
                  fill="url(#icon-gradient)"
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={showProfile ? "hidden" : "w-12 h-12 "}
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg> */}
            </span>
            <motion.div
              initial={{ translateX: "120%" }}
              animate={drawer}
              transition={{ duration: 1, delay: 0.2, ease: "circInOut" }}
              className={` absolute top-2 right-2 h-[25rem] w-[20vw] bg-neutral-950 rounded-lg shadow-2xl shadow-orange-900 profile-drawer`}
            >
              <span
                className="absolute top-1 right-1 cursor-pointer"
                onClick={() => setShowProfile(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="url(#icon-gradient2)"
                  className="w-12 h-12"
                >
                  <defs>
                    <linearGradient
                      id="icon-gradient2"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#EF4444" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                  </defs>
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <div className="py-4 px-5 border-y-[1px] border-neutral-600 mt-16 flex justify-evenly items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-16 h-16"
                  >
                    <defs>
                      <linearGradient
                        id="icon-gradient2"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#FBBF24" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#icon-gradient2)"
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[1.2vw] font-medium">
                    {user && user.name}
                  </span>
                </div>
                <div className="flex justify-center items-center flex-col py-4">
                  <span className=" text-[1.3vw] font-medium underline">
                    Matches
                  </span>
                  <div className="flex justify-evenly items-center border-b-[1px] border-neutral-600 w-full py-3">
                    <div className="flex justify-center items-center flex-col text-[1.2vw]">
                      <span>Total</span>
                      <span>{user.matches ? user.matches.total : 0}</span>
                    </div>
                    <div className="flex justify-center items-center flex-col text-[1.2vw]">
                      <span>Won</span>
                      <span>{user.matches ? user.matches.won : 0}</span>
                    </div>
                    <div className="flex justify-center items-center flex-col text-[1.2vw]">
                      <span>Lose</span>
                      <span>{user.matches ? user.matches.lose : 0}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <button
                    className="mt-4 bg-gradient-to-tl from-orange-600 via-red-700 to-yellow-600 py-1 px-3 rounded-md text-[1vw] font-medium gameOverText"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setShowProfile(false);
                      setIsAuthenticated(false);
                    }}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <Link to="/signup">
            <div
              className={`${
                location.pathname === "/signup" ||
                location.pathname === "/login"
                  ? "hidden"
                  : "bg-white text-neutral-700 text-[1.5vw] font-semibold py-2 px-4 rounded-lg whitespace-nowrap flex flex-row items-center justify-center gap-x-4 capitalize  cursor-pointer"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              <button className="capitalize">sign up</button>
            </div>
          </Link>
        )}
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
