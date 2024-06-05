import AppWindow from "./AppWindow";
import { FlipWords } from "./FlipWords";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import Arc from "./Arc";
import UnderLine from "./Underline";
import React from 'react';



const words = ["Inner Peace", "Focus", "Zen"];
const Hero = () => {
  return (
    <div className="flex items-center justify-between w-full max-w-[1200px] m-auto mt-10 md:flex-none md:flex-row">
      <div className="flex-[.4] flex flex-col items-center">
        <div className="font-normal text-neutral-600 dark:text-neutral-400">
          <div>
            <h2 className="scroll-m-20 pb-8 text-3xl tracking-tight first:mt-0">
              <div className="relative pb-2 font-k2d font-bold">
                Arm&rsquo;mo
                <span className="absolute top-0 left-0 w-full">
                    <UnderLine width={100} height={100}/>
                </span>
              </div>
            </h2>
            <p className="leading-6 text-2xl font-k2d font-semibold">
              Transform your{" "}
              <span className="relative inline-block pb-4">
                Mind
                <span className="absolute bottom-0 left-7 w-full">
                  <Arc width={100} height={120}/>
                </span>
              </span>{" "}
              and Body <br /> Unlock your{""}
              <strong className="font-delius font-bold">
                <FlipWords words={words} />
              </strong>
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button className="ml-[-165px] font-k2d font-bold">
            Get Started <FaArrowRight className="m-2" />
          </Button>
        </div>
      </div>
      <div className="flex-[.6] flex justify-center">
        <div
          className="w-[550px] h-[350px] transition-transform duration-500"
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
          <AppWindow type="browser" browserTabs={[]}></AppWindow>
        </div>
      </div>
    </div>
  );
};

export default Hero;
