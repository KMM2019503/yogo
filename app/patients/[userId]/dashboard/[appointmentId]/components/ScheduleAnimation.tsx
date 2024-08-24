"use client";
import Player from "lottie-react";
import React from "react";
import animationData from "@/public/json/shedule.json";
const PendingAnimation = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <Player
        autoplay
        loop
        animationData={animationData}
        className="w-full h-36"
      />
    </div>
  );
};

export default PendingAnimation;
