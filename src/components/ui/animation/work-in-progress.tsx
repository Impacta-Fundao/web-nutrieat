"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

import animationData from "./workInProgress.json";
import React from "react";

const WorkInProgress = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <h1 className="text-lg">Módulo em Desenvolvimento</h1>
        <Player src={animationData} loop speed={0.6} autoplay />
      </div>
    </>
  );
};

export default WorkInProgress;
