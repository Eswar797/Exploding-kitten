import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-y-10">
      <span className={isAuthenticated ? "hidden" : "absolute text-[3.5vw] sm:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw] 2xl:text-[1.2vw] top-48 xl:top-12"}>
        * Note: Log in to Keep Track of your Score
      </span>
      <h1 className=" text-[18vw]  sm:text-[15vw] lg:text-[12vw] xl:text-[7vw] font-semibold capitalize text-center ">Exploding kitten</h1>
      <Link
        className="bg-gradient-to-tl from-orange-600 via-red-700 to-yellow-600 py-2 px-4 rounded-lg text-neutral-100 font-medium text-[3.5vw] sm:text-[3vw]  lg:text-[2.5vw]  xl:text-[1.2vw] gameOverText"
        to="/game"
      >
        <button className="">Start Game</button>
        <span className="text-[2vw] leading-none ml-4">😼</span>
      </Link>
    </div>
  );
}

export default Home;
