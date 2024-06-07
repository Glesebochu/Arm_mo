"use client";
import React from "react";
import { StickyScroll } from "./StickyScrollRevil";
import Circle from "./Circle";

const content = [
  {
    title: "Feature #1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, consequuntur quo provident amet vero molestias facere perspiciatis suscipit, sed eos quibusdam veniam, similique beatae laboriosam. Dolorem nulla aliquid cupiditate ipsa?",
    content: (
      <div className="flex items-center justify-center border h-full">
        Feature #1 Content
      </div>
    ),
  },
  {
    title: "Feature #2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, consequuntur quo provident amet vero molestias facere perspiciatis suscipit, sed eos quibusdam veniam, similique beatae laboriosam. Dolorem nulla aliquid cupiditate ipsa?",
    content: (
      <div className="flex items-center justify-center border h-full">
        Feature #2 Content
      </div>
    ),
  },
  {
    title: "Feature #3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, consequuntur quo provident amet vero molestias facere perspiciatis suscipit, sed eos quibusdam veniam, similique beatae laboriosam. Dolorem nulla aliquid cupiditate ipsa?",
    content: (
      <div className="flex items-center justify-center border h-full">
        Feature #3 Content
      </div>
    ),
  },
];

const Features = ()=> {
  return (
    <div className="p-10 flex flex-col items-center mt-10">
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
