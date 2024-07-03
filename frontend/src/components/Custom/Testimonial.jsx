"use client";
import { CardStack } from "./CardStack";
import { cn } from "../../../utils/cn";
import { TypewriterEffectSmooth } from "./TypeWritter";

const Testimonial = () =>{
  return (
    <div className="mt-[-80px] h-full flex items-center justify-center flex-col w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="mb-10">
            <TypewriterEffectSmooth words={words} />
        </div>
        <div>
            <CardStack items={CARDS}/>
        </div>
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "font-bold font-k2d bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const words = [
    {
        text: "See",
        className: "font-semibold"
    },
    {
        text: "what",
        className: "font-semibold"
    },
    {
        text: "our",
        className: "font-semibold"
    },
    {
        text: "users",
        className: "font-semibold"
    },
    {
        text: "say",
        className: "font-semibold"
    },
    {
        text: "About",
        className: "text-blue-500 dark:text-blue-500 font-bold",
    },
    {
        text: "Us",
        className: "text-blue-500 dark:text-blue-500 font-bold",
    }
]

const CARDS = [
  {
    id: 0,
    name: "Abenezer Walelign",
    designation: "Senior Software Engineer at OpenAI",
    content: (
      <p className="font-k2d">
        Armmo has been a lifesaver <Highlight>for managing stress and staying focused</Highlight> under pressure. 
        Its guided meditations are incredibly effective at reducing anxiety and improving my mental clarity.
      </p>
    ),
  },
  {
    id: 1,
    name: "Finhas Yohannes",
    designation: "Senior Project Manager at Microsoft",
    content: (
      <p className="font-k2d">
        Armmo has helped me prioritize tasks more effectively and reduce anxiety. 
        <Highlight>Its customizable features and calming atmosphere</Highlight> make it an essential part of my daily routine
      </p>
    ),
  },
  {
    id: 2,
    name: "Zelalem Amare",
    designation: "Senior Project Manager at Nvidia",
    content: (
      <p className="font-k2d">
       Armmo has been a game-changer for my productivity. 
       <Highlight>The app's meditation sessions</Highlight> help me stay focused and avoid burnout, allowing me to deliver high-quality work efficiently.
      </p>
    ),
  },
  {
    id: 3,
    name: "Naod Mesfin",
    designation: "Senior Software Engineer at Bloomberg",
    content: (
      <p className="font-k2d"><Highlight>Armmo's analytics</Highlight> help me track my progress and refine my meditation practice.</p>
    ),
  },
];


export default Testimonial;