import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-y-10">
      <span className={isAuthenticated ? "hidden" : "absolute top-12"}>
        * Note: Log in to Keep Track of your Score
      </span>
      <h1 className="text-[7vw] font-semibold capitalize">Exploding kitten</h1>
      <Link
        className="bg-gradient-to-tl from-orange-600 via-red-700 to-yellow-600 py-2 px-4 rounded-lg text-neutral-100 font-medium text-[1.2vw] gameOverText"
        to="/game"
      >
        <button className="">Start Game</button>
        <span className="text-[2vw] leading-none ml-4">😼</span>
      </Link>
    </div>
  );
}

export default Home;
