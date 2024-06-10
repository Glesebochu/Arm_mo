import { AnimatedTooltip } from "./AnimatedTooltip";
import Ab from "../../assets/Ab.jpg";
import Gus from "../../assets/Gus.jpg";
import Zola from "../../assets/Zola.jpeg";
import Naod from "../../assets/Naod.jpeg";
import Dave from "../../assets/Dave.jpg";
import Yan from "../../assets/Yan.jpg";
import Edom from "../../assets/Edom.jpg";

const people = [
  {
    id: 1,
    name: "Zelalem Amare",
    designation: "Chief Executive Officer",
    image: Zola
  },
  {
    id: 2,
    name: "Finhas Yohannes",
    designation: "Chief Operating Officer",
    image: Gus
  },
  {
    id: 3,
    name: "Abenezer Walelign",
    designation: "Chief Technology Officer",
    image: Ab
  },
  {
    id: 4,
    name: "Edomiyas Wondwossen",
    designation: "Chief Marketing Officer",
    image: Edom
  },
  {
    id: 5,
    name: "Dawit Nebretu",
    designation: "Chief Financial Officer",
    image: Dave 
  },
  {
    id: 6,
    name: "Yanet Abrham",
    designation: "Chief Content Officer",
    image: Yan
  },
  {
    id: 7,
    name: "Naod Mesfin",
    designation: "Head of Customer Success",
    image: Naod
  },
];


const ConnectedSquares = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative flex items-center justify-center p-8 border border-blue-500">
        {/* Squares */}
        <div className="absolute top-[-6px] left-[-5px] z-10">
          <svg width=".7rem" height="1rem" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="white"></rect>
            <rect x="1" y="1" width="8" height="8" rx="1" stroke="#457FE5" strokeWidth="1.5"></rect>
          </svg>
        </div>
        <div className="absolute top-[-8px] right-[-5px] z-10">
          <svg width=".7rem" height="1rem" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="white"></rect>
            <rect x="1" y="1" width="8" height="8" rx="1" stroke="#457FE5" strokeWidth="1.5"></rect>
          </svg>
        </div>
        <div className="absolute bottom-[-8px] right-[-5px] z-10">
          <svg width=".7rem" height="1rem" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="white"></rect>
            <rect x="1" y="1" width="8" height="8" rx="1" stroke="#457FE5" strokeWidth="1.5"></rect>
          </svg>
        </div>
        <div className="absolute bottom-[-8px] left-[-5px] z-10">
          <svg width=".7rem" height="1rem" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="white"></rect>
            <rect x="1" y="1" width="8" height="8" rx="1" stroke="#457FE5" strokeWidth="1.5"></rect>
          </svg>
        </div>

        <div className="absolute bottom-[-30px] right-[-24px]">
          <svg width="1.875rem" height="1.875rem" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_52_19289)">
          <path d="M28.3 8.9C28.4259 8.80557 28.5 8.65738 28.5 8.5C28.5 8.34262 28.4259 8.19443 28.3 8.1L26.3 6.6C26.1485 6.48637 25.9458 6.46809 25.7764 6.55279C25.607 6.63748 25.5 6.81061 25.5 7V7.5H24.5V6.5H25C25.1894 6.5 25.3625 6.393 25.4472 6.22361C25.5319 6.05421 25.5136 5.85151 25.4 5.7L23.9 3.7C23.8056 3.5741 23.6574 3.5 23.5 3.5C23.3426 3.5 23.1944 3.5741 23.1 3.7L21.6 5.7C21.4864 5.85151 21.4681 6.05421 21.5528 6.22361C21.6375 6.393 21.8106 6.5 22 6.5H22.5V7.5H21.5V7C21.5 6.81061 21.393 6.63748 21.2236 6.55279C21.0542 6.46809 20.8515 6.48637 20.7 6.6L18.7 8.1C18.5741 8.19443 18.5 8.34262 18.5 8.5C18.5 8.65738 18.5741 8.80557 18.7 8.9L20.7 10.4C20.8515 10.5136 21.0542 10.5319 21.2236 10.4472C21.393 10.3625 21.5 10.1894 21.5 10V9.5H22.5V10.5H22C21.8106 10.5 21.6375 10.607 21.5528 10.7764C21.4681 10.9458 21.4864 11.1485 21.6 11.3L23.1 13.3C23.1944 13.4259 23.3426 13.5 23.5 13.5C23.6574 13.5 23.8056 13.4259 23.9 13.3L25.4 11.3C25.5136 11.1485 25.5319 10.9458 25.4472 10.7764C25.3625 10.607 25.1894 10.5 25 10.5H24.5V9.5H25.5V10C25.5 10.1894 25.607 10.3625 25.7764 10.4472C25.9458 10.5319 26.1485 10.5136 26.3 10.4L28.3 8.9Z" fill="black" stroke="white" strokeLinejoin="round"></path>
          <g filter="url(#filter1_d_52_19289)">
          <path d="M10 6L24 19H16L11 26L10 6Z" fill="black"></path>
          <path d="M11.4277 24.541L10.5608 7.20304L22.7267 18.5H16H15.7427L15.5931 18.7094L11.4277 24.541Z" stroke="white"></path>
          </g>
          </g>
          <defs>
          <filter id="filter0_d_52_19289" x="0" y="0" width="34" height="34.2324" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"></feColorMatrix>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_52_19289"></feBlend>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_52_19289" result="shape"></feBlend>
          </filter>
          <filter id="filter1_d_52_19289" x="8" y="5" width="18" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"></feColorMatrix>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_52_19289"></feBlend>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_52_19289" result="shape"></feBlend>
          </filter>
          </defs>
          </svg>
        </div>
        <div className="z-50 flex flex-col items-center">
            <div className="flex">
                <AnimatedTooltip items={people}/>
            </div>
        </div>
        {/* Lines connecting the squares */}
        <div className="absolute top-0 left-0 w-full h-full border-t border-l border-blue-500"></div>
        <div className="absolute top-0 right-0 w-full h-full border-t border-r border-blue-500"></div>
        <div className="absolute bottom-0 right-0 w-full h-full border-b border-r border-blue-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-full border-b border-l border-blue-500"></div>

        {/* Content Component in the middle */}
        <div className="flex justify-center items-center">
        
        </div>
      </div>
    </div>
  );
};

export default ConnectedSquares;