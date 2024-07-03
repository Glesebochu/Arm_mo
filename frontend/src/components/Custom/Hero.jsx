import AppWindow from "./AppWindow";
import { FlipWords } from "./FlipWords";
import { FaArrowRight } from "react-icons/fa";
import Arc from "./Arc";
import UnderLine from "./Underline";
import React, { useEffect, useRef } from 'react'
import { SparklesCore } from "./Sparkles";
import { useNavigate } from "react-router-dom";

const words = ["Inner Peace", "Focus", "Zen"];
const Hero = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);

  const navigateToSignupScreen = ()=> {
    navigate("/Signup")
  }

  return (
    <div className="flex items-center justify-between w-full max-w-[1400px] m-auto mt-10 flex-col lg:flex-row">
      {/* Left Hero pannel */}
      <div className="flex-[.4] flex flex-col items-center">
        <div className="font-normal text-neutral-600 dark:text-neutral-400">
          {/* Logo with sparkle effect */}
          <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md lg:hidden mb-10">
            <h1 className="md:text-7xl text-7xl lg:text-9xl font-bold text-center text-neutral-500 relative z-20 font-k2d translate-x-1">
              Armm'o
            </h1>
            <div className="w-[26rem] h-16 relative">
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-44 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#0000"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </div>
          {/* end */}
          <div>
            <h2 className="scroll-m-20 pb-8 text-[40px] tracking-tight first:mt-0">
              <div className="relative pb-8 font-k2d font-bold text-center hidden lg:text-start lg:block">
                Arm&rsquo;mo
                <span className="absolute top-0 lg:left-0 w-full mt-2">
                    <UnderLine width={130} height={100}/>
                </span>
              </div>
            </h2>
            <p className="leading-6 text-3xl lg:text-[28px] font-k2d font-semibold mt-[-10px]">
              Transform your{" "}
              <span className="relative inline-block pb-4">
                <span className="font-k2d font-bold">Mind</span>
                <span className="absolute bottom-0 left-10 w-full">
                  <Arc width={100} height={120}/>
                </span>
              </span>{" "}
              and <span className="font-k2d font-bold">Body</span> <br /> Unlock your{""}
              <strong>
                <FlipWords words={words}/>
              </strong>
            </p>
          </div>
        </div>
        <div className="mt-20 lg:mt-12 lg:ml-[-195px] ">
          <button onClick={navigateToSignupScreen} className="flex items-center px-8 py-1.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
            <span className="font-k2d font-bold">Get Started</span> <FaArrowRight className="m-2"/>
          </button>
        </div>
      </div>

      {/* Right Hero pannel */}
      <div className="hidden lg:flex-[.6] lg:flex justify-center ">
        <div
          className="w-[580px] h-[330px] transition-transform duration-500"
          style={{
            transform: "perspective(1000px) rotateY(-10deg)",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform =
              "perspective(1000px) rotateY(0deg)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform =
              "perspective(1000px) rotateY(-10deg)")
          }
        >
          <AppWindow type="browser" browserTabs={[]}>
            <video className="w-full h-auto mt-[-20px]" src="../../../public/video5.mp4" autoPlay muted loop ref={videoRef}></video>
          </AppWindow>
        </div>
      </div>
    </div>
  );
};

export default Hero;
