"use client";
import dynamic from "next/dynamic";
import React from "react";
import animationData from "@/public/json/pending.json";

const Player = dynamic(() => import("lottie-react"), { ssr: false });

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
