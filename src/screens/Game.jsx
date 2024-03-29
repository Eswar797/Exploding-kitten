import { motion, useAnimation } from "framer-motion";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../components/Card";
import { changeResult, serverUrl } from "../context/Slices.js";
import { cards } from "../data/Cards";

function Game() {
  const [cardArr, setCardArr] = useState([]);
  const gameOver = useAnimation();
  const removeCard = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];
  let navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  let newCards = _.shuffle(cards);
  newCards = _.take(newCards, 5);

  function reload() {
    window.location.reload();
  }

  const result = useSelector((state) => state.user.result);
  const dispatch = useDispatch();

  const win = useCallback(
    function () {
      dispatch(changeResult("win"));
    },
    [dispatch]
  );

  const lose = useCallback(
    function () {
      dispatch(changeResult("lose"));
    },
    [dispatch]
  );

  async function AddResult(result) {
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      let res = await fetch(`${serverUrl}/api/v1/user/matches`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ result }),
      });

      let data = await res.json();
      if (data.success === true) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        return toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      let addToLose = false;
      if (cardArr.length === 5) {
        clearInterval(timer);
        if (!cardArr.includes("exploding") && !cardArr.includes("shuffle")) {
          setTimeout(() => {
            navigate("/result");
            win();
            if (isAuthenticated) {
              AddResult("win");
            }
            clearInterval(timer);
          }, 1000);
        } else {
          if (cardArr.includes("exploding")) {
            clearInterval(timer);
            if (cardArr.includes("shuffle")) {
              clearInterval(timer);
              setTimeout(() => {
                window.location.reload();
              }, 500);
            } else {
              if (cardArr.includes("defuse")) {
                console.log("Bomb is Defused");
                clearInterval(timer);
                setTimeout(() => {
                  navigate("/result");
                  win();

                  if (isAuthenticated) {
                    AddResult("win");
                  }
                }, 1000);
              } else {
                setTimeout(() => {
                  clearInterval(timer);
                  lose();
                  if (isAuthenticated && !addToLose) {
                    addToLose = true;
                    AddResult("lose");
                  }
                  gameOver.start({ transform: "translateY(0)" });
                }, 100);
              }
            }
          } else if (cardArr.includes("shuffle")) {
            clearInterval(timer);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }
      }
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [cardArr, isAuthenticated, navigate, result, gameOver, lose, win]);

  return (
    <div className="h-screen w-full  flex  justify-center items-center flex-col pt-0 gap-y-12 overflow-hidden relative">
      <span className={isAuthenticated ? "hidden" : "absolute top-28 sm:top-36 lg:top-24 xl:top-8 2xl:top-12"}>
        * Note: Log in to Keep Track of your Score
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-center gap-y-2 gap-x-6 lg:gap-x-4 mt-24 h-3/5 xl:h-4/6 sm:w-3/4  lg:w-2/3 xl:w-2/4  ">
        {newCards.map((item, idx) => {
          return (
            <motion.div
              key={idx}
              onClick={() => {
                // setCardArr((prev) => [...prev, item.type]);
                cardArr.push(item.type);
                if (item.type === "cat" || item.type === "defuse") {
                  removeCard[idx].start({ visibility: "hidden" });
                }
              }}
              initial={{ display: "flex" }}
              animate={removeCard[idx]}
              transition={{ duration: 3, delay: 2, ease: "linear" }}
            >
              <Card key={idx} item={item} />
            </motion.div>
          );
        })}
      </div>
      <div className="">
        <button
          onClick={reload}
          className=" sm:text-[2.5vw] lg:text-[2vw] xl:text-[1.5vw] 2xl:text-[1.15vw] py-2 px-4 rounded-md text-neutral-800 bg-white"
        >
          Refresh Page
        </button>
      </div>

      <motion.div
        initial={{ transform: "translateY(100%)" }}
        animate={gameOver}
        transition={{ duration: 2, ease: [0.68, -0.6, 0.32, 1.6] }}
        className="h-screen w-full flex  justify-center items-center flex-col bg-neutral-950 absolute left-0 bottom-0 z-[999]"
      >
        <h1 className="gameOverText text-[4vw]">Boom Boom 💣</h1>
        <h1 className="gameOverText text-[6vw]">Game Over 😿</h1>
        <Link className="absolute bottom-28 " to="/">
          <button className="py-2 px-4 bg-white rounded-lg text-[1.5vw] text-neutral-800 ">
            Restart Game
          </button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Game;
