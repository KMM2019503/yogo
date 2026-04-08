"use client";
import dynamic from "next/dynamic";
import React from "react";
import animationData from "@/public/json/sorry.json";

const Player = dynamic(() => import("lottie-react"), { ssr: false });

const SorryAnimation = () => {
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

export default SorryAnimation;
