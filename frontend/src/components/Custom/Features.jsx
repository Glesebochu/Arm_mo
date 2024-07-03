"use client";
import React from "react";
import { StickyScroll } from "./StickyScrollRevil";
import Circle from "./Circle";
import { useEffect, useRef } from 'react';


const Features = ()=> {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);

  const content = [
    {
      title: "Guided Meditation Transition ",
      description:
        "Elevate your meditation practice with our innovative Guided Meditation Transition Feature. This interactive experience guides you through a structured series of steps designed to gradually narrow your focus from the broad present moment to a single meditation object. Each phase is carefully crafted to enhance your mindfulness, improve concentration, and deepen your meditation practice. Watch our video to see how you can effortlessly move through each transition phase, add personalized observable objects, and achieve your meditation goals.",
      content: (
        <div className="flex items-center justify-center border max-w-[38rem] mx-auto">
          <video class="w-full h-auto" src="/video2.mp4" autoPlay muted loop ref={videoRef}></video>
        </div>
      ),
    },
    {
      title: "Preparation",
      description:
        "Welcome to the Preparation Phase of your meditation journey. This step-by-step guide is designed to help you set clear goals, establish a meaningful motivation, and create a focused environment free from distractions. Follow each step to ensure you are fully prepared for a productive and peaceful meditation session. Let's begin your path to mindfulness and inner peace.",
      content: (
        <div className="flex items-center justify-center border max-w-[38rem] mx-auto">
          <video class="w-full h-auto" src="/video1.mp4" autoPlay muted loop ref={videoRef}></video>
        </div>
      ),
    },
    {
      title: "App Activity",
      description:
            "Provides you with a graph that shows you the time you spent on the app in a given week.",
      content: (
        <div className="flex items-center justify-center border max-w-[38rem] mx-auto">
          <video class="w-full h-auto" src="/video3.mp4" autoPlay muted loop ref={videoRef}></video>
        </div>
      ),
    },
    {
      title: "Sessions Summary",
      description:
            "View a comprehensive summary of the sessions you had recently in a tabular format.",
      content: (
        <div className="flex items-center justify-center border max-w-[38rem] mx-auto">
          <video class="w-full h-auto" src="/video4.mp4" autoPlay muted loop ref={videoRef}></video>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center mt-28">
        <h1 className="mb-12 font-k2d font-bold text-4xl my-8 text-neutral-600">Features {" "}
        <div className="relative inline">
          <span className="font-k2d font-bold">We Offer</span>
          <span className="absolute top-[-30px] left-[-8px] w-full">
            <Circle width={158} height={100} />
          </span>
        </div>
        </h1>
      <StickyScroll content={content}/>
    </div>
  );
}

export default Features;
