"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { Icon } from "./Icon";

export const StickyScroll = ({
  content,
  contentClassName,
}
) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "transparent",
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[28rem] w-[1150px] overflow-y-auto no-scrollbar flex justify-center relative space-x-10 rounded-md p-4 scrollbar-hide"
      ref={ref}
    >
      <div className="div relative flex items-start px-4 flex-1">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-8">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                }}
                className="text-3xl text-center lg:text-start font-bold text-slate-500 font-k2d"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                }}
                className="text-kg text-slate-500 max-w-sm mt-8 font-k2d"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        className={cn(
          "hidden lg:block rounded-md bg-white sticky top-10 h-fit",
        // "border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start mx-auto p-4 relative w-max", 
          contentClassName
        )}
      >
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-primary" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-primary" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-primary" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-primary" />
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};
