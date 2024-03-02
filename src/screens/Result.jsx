import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Result() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <span className={isAuthenticated ? "hidden" : "absolute top-12"}>
        * Note: Log in to Keep Track of your Score
      </span>{" "}
      <h1 className="text-[4vw] font-semibold gameOverText whitespace-nowrap">
        Congratulations 🎉
      </h1>
      <h2 className="text-[3vw] font-medium gameOverText">You won the Game</h2>
      <Link to="/">
        <button className="py-2 px-4 bg-white rounded-lg font-semibold text-neutral-700 text-[1.2vw] mt-16">
          Play Again
        </button>
      </Link>
    </div>
  );
}

export default Result;
