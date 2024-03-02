import { motion, useAnimation } from "framer-motion";
import React from "react";

function Card({ item }) {
  const card = useAnimation();
  const mainCard = useAnimation();

  function cardFlip() {
    card.start({
      transform: "rotateY(1260deg) scale(1.3)",
      margin: "1rem",
      top: "2rem",
      zIndex: "50",
    });
    mainCard.start({
      zIndex: "50",
    });
  }

  return (
    <>
      <motion.div
        className="min-h-full min-w-2/3 flex justify-center items-center card  "
        onClick={() => {
          cardFlip();
        }}
        initial={{ zIndex: "10" }}
        animate={mainCard}
      >
        <motion.div
          initial={{ transform: "rotateY(0deg)" }}
          animate={card}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          className=" min-h-full min-w-full flex justify-center items-center p-3 inner-card"
        >
          <div className=" text-[2vw] font-semibold front-card flex justify-center items-center rounded-xl   text-black">
            <div className="flex justify-between items-center flex-col h-5/6 w-5/6 border-[6px] border-[#785d3a] rounded-lg p-4">
              <img
                src={item.img}
                alt={`${item.type}img`}
                className="h-[8vw] w-[8vw] object-contain"
              />
              <span className="text-[1vw] ">{item.name}</span>
            </div>
          </div>
          <div className=" text-[2vw] font-semibold back-card   flex justify-center items-center rounded-xl">
            <div className=" h-5/6 w-5/6  border-orange-300 border-[10px] rounded-lg flex justify-center items-center">
              Card
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Card;
