"use client";
import { Spotlight } from "./Spotlight";

const ContactUs = ()=> {
  return (
        <div className="m-auto relative p-[50px] lg:w-[1200px] rounded-md flex flex-col items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.05]">
            <Spotlight
                className="-top-25 left-[530px]"
                fill="white"
            />
            <div className="max-w-[100%] flex flex-col items-start">
                <h1 className="font-k2d font-bold text-4xl text-white">So what are you waiting for?</h1>
                <p className="mt-6 font-k2d text-[18px] text-white/80">We are here to help you with everything. Get in touch</p>
                <p className="font-k2d text-[18px] text-white/80">with us and we will get back to you as soon as possible.</p>
                <button className="self-center font-k2d mt-8 px-8 py-2 rounded-md bg-primary text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-primary">
                    Contact Us
                </button>
            </div>
        </div>
  );
}

export default ContactUs;