"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

import animationData from "./error-animation.json";
import React from "react";

const Error = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <Player src={animationData} loop speed={0.6} autoplay />
      </div>
    </>
  );
};

export default Error;
