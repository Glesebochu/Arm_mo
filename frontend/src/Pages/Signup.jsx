"use client";
import React from "react";
import { Button } from "../components/ui/button";
import { AnimatedInput } from "../components/Custom/AnimatedInput";
import { Label } from "../components/ui/label";
import { cn } from "../../utils/cn";
import { FaGoogle } from "react-icons/fa";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div>
      <div className="flex flex-col m-auto max-w-md w-full rounded-tl-none rounded-2xl mt-4 p-8 shadow-input">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Armmo
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          create an account by signing up if you're new, or login to continue the
          journey!!
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <div>
              <Label>First Name</Label>
              <AnimatedInput placeholder="Abenezer" />
            </div>
            <div>
              <Label>Last Name</Label>
              <AnimatedInput placeholder="Walelign" />
            </div>
          </div>
          <div className="mb-4">
            <Label>Email</Label>
            <AnimatedInput placeholder="name@example.com" />
          </div>
          <div className="mb-8">
            <Label>Password</Label>
            <AnimatedInput placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full">
            Sign up &rarr;
            <BottomGradient />
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col space-y-4">
            <Button variant="outline" className="w-full">
              <FaGoogle className="mr-2 h-4 w-4 text-primary" />
              Google
              <BottomGradient />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Signup;
