import { motion, useAnimation } from "framer-motion";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../components/Card";
import { changeResult } from "../context/Slices.js";
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
    console.log(result);
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      let res = await fetch("http://localhost:5000/api/v1/user/matches", {
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
            if (cardArr.includes("shuffle")) {
              setTimeout(() => {
                window.location.reload();
                clearInterval(timer);
              }, 500);
            } else {
              if (cardArr.includes("defuse")) {
                console.log("Bomb is Defused");
                setTimeout(() => {
                  navigate("/result");
                  win();
                  console.log(result);

                  if (isAuthenticated) {
                    AddResult("win");
                  }
                  clearInterval(timer);
                }, 1000);
              } else {
                setTimeout(() => {
                  lose();
                  console.log(result);
                  if (isAuthenticated) {
                    AddResult("lose");
                  }
                  gameOver.start({ transform: "translateY(0)" });
                }, 100);
                clearInterval(timer);
              }
            }
          } else if (cardArr.includes("shuffle")) {
            setTimeout(() => {
              window.location.reload();
              clearInterval(timer);
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
    <div className="h-screen w-full  flex  justify-center items-start pt-20 overflow-hidden">
      <div className="grid grid-cols-3 items-center justify-center gap-4 w-2/4  ">
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
              transition={{ duration: 2, delay: 2, ease: "linear" }}
            >
              <Card key={idx} item={item} />
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-20">
        <button
          onClick={reload}
          className="text-[1.15vw] py-2 px-4 rounded-md text-neutral-200 bg-black"
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
