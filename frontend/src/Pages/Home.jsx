"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Check,
  ChevronsUpDown,
  LogOut,
  Mail,
  Target,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import "@/Styles/StartButton.css";
import { logout } from "../../slices/AuthSlice";
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";

const numberToString = (number) => {
  const numberStrings = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ];
  return numberStrings[number];
};

const Home = () => {
  const user = useSelector((state) => state.Auth.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [frameworks, setFrameworks] = useState([]);
  // useEffect(() => {
  //   console.log(user, "We printed the user");
  // }, []);

  useEffect(() => {
    console.log(user);
    // Determine the maximum practiced stage
    var maxPracticedStage = Math.max(
      ...user.practicedStages.map((stage) => stage.stageId)
    );

    // Set frameworks up to the maximum practiced stage
    let stages = Array.from({ length: maxPracticedStage }, (_, i) => ({
      value: numberToString(i + 1).toLowerCase(),
      label: numberToString(i + 1),
    }));

    // Check if stages is empty and add "One" if it is
    if (stages.length === 0) {
      stages.push({ value: "one", label: "One" });
    }

    setFrameworks(stages);
  }, []);

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleStageSelect = (currentValue) => {
    setValue(currentValue);
    console.log(`Selected stage: ${currentValue}`);
    setOpen(false);
  };

  const filteredFrameworks = frameworks;

  return (

    <div className="pt-4">
      <div className="flex justify-between items-center px-6 h-1/6">
        <div>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleSettingsClick}
            className="px-3 py-4 rounded-full"
          >
            <GoGear size={44} />
          </Button>
        </div>

        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[240px] justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select Stage..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
              <Command>
                <CommandList>
                  {filteredFrameworks.length === 0 ? (
                    <CommandGroup>
                      <CommandItem
                        value="one"
                        onSelect={() => handleStageSelect("one")}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === "one" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        One
                      </CommandItem>
                    </CommandGroup>
                  ) : (
                    <CommandGroup>
                      {filteredFrameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={handleStageSelect}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* user profile */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 rounded-[50%]">
                <Avatar className="h-10 w-10">
                  {user?.profilePicture ? (
                    <AvatarImage src={`${user.profilePicture}`} />
                  ) : (
                    <AvatarFallback className="flex items-center justify-center bg-black text-white">
                      {user?.firstName.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-96 mt-[-4px] border mr-12 rounded-tr-none"
              align="end"
            >
              <div className="grid gap-4 p-4">
                <div className="text-center">
                  <h4 className="text-lg font-medium font-k2d mb-2">
                    {user
                      ? `${user.firstName} ${
                          user.lastName ? user.lastName : ""
                        }`
                      : "Loadings..."}
                  </h4>
                  <div className="relative flex justify-center">
                    <div className="border-[10px] w-fit rounded-[50%]">
                      <Avatar className="h-16 w-16 mx-auto">
                        {user?.profilePicture ? (
                          <AvatarImage src={`${user.profilePicture}`} />
                        ) : (
                          <AvatarFallback className="bg-black text-white font-k2d font-bold text-xl">
                            {user?.firstName.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className="bg-[#E2E8F0] p-1 rounded-[50%] w-fit absolute left-[42%] bottom-[6%] rotate-6 cursor-pointer"
                        onClick={() => navigate("/settings")}
                      >
                        <FaPen className="text-black text-[16px] -rotate-12" />
                      </div>
                    </div>
                  </div>

                  <p
                    className={
                      user.username
                        ? `text-sm text-muted-foreground mt-2`
                        : "hidden"
                    }
                  >
                    {user.username ? `@${user.username}` : ""}
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center space-x-2">
                    <Mail className="" />
                    <div className="flex items-center">
                      <Label htmlFor="email">
                        <b>Email</b>
                      </Label>
                      <label className="ml-4" htmlFor="email">
                        {user.email ? user.email : ""}
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Target className="mr-2" />
                    <div className="flex items-center">
                      <Label htmlFor="currentStage">
                        <b>Stage</b>
                      </Label>
                      <label className="ml-4" htmlFor="currentStage">
                        {user?.currentStage
                          ? user.currentStage.goal
                          : "Loading..."}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="border-t mt-4 pt-4">
                  <Button
                    variant="outline"
                    className="w-full mb-2 flex items-center justify-start space-x-2 pl-0"
                    onClick={() => {
                      navigate("/sessionsummary");
                    }}
                  >
                    <BarChart2 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-start space-x-2 pl-0"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="h-3/5 flex justify-center items-center">
        <div className="start-circle-container">
          <div className="start-circle">
            <div className="start-circle-content">
              <p className="start-text">START</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
