"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [frameworks, setFrameworks] = useState([]);

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5158/api/Home/GetMeditatorById?meditatorId=1"
      );
      const userData = response.data;
      setUser(userData);

      // Determine the maximum practiced stage
      const maxPracticedStage = Math.max(
        ...userData.practicedStages.map((stage) => stage.stageId)
      );


      // Set frameworks up to the maximum practiced stage
      const stages = Array.from({ length: maxPracticedStage }, (_, i) => ({
        value: numberToString(i + 1).toLowerCase(),
        label: numberToString(i + 1),
      }));
      setFrameworks(stages);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleStageSelect = (currentValue) => {
    console.log(`Selected stage: ${currentValue}`);
    setValue(currentValue);
    setOpen(false);
  };

  const filteredFrameworks = frameworks;
  console.log("User profile picture:", user?.profilePicture);

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
                    <CommandEmpty>No framework found.</CommandEmpty>
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

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-3 py-4 rounded-full">
                <Avatar className="h-10 w-10">
                  {user?.profilePicture ? (
                    <AvatarImage src={`/profilePics/${user.profilePicture}`} />
                  ) : (
                    <AvatarFallback className="flex items-center justify-center bg-black text-white">
                      {user?.firstName.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" align="end">
              <div className="grid gap-4 p-4">
                <div className="text-center">
                  <h4 className="text-lg font-medium">
                    {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                  </h4>
                  <Avatar className="h-16 w-16 mx-auto">
                    {user?.profilePicture ? (
                      <AvatarImage
                        src={`/profilePics/${user.profilePicture}`}
                      />
                    ) : (
                      <AvatarFallback className="bg-black text-white">
                        {user?.firstName.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <p className="text-sm text-muted-foreground mt-2">
                    {user ? `@${user.username}` : "Loading..."}
                  </p>
                  <a
                    href="/edit-account"
                    className="text-blue-600 hover:underline mt-2"
                  >
                    Edit your Account
                  </a>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <div className="grid grid-cols-3 items-center space-x-2">
                      <Label htmlFor="email">
                        <b>Email</b>
                      </Label>
                      <label className="col-span-2 h-7" htmlFor="email">
                        {user ? user.email : "Loading..."}
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-9 w-9" />
                    <div className="grid grid-cols-3 items-center">
                      <Label htmlFor="currentStage">
                        <b>Stage</b>
                      </Label>
                      <label className="col-span-2 h-13" htmlFor="currentStage">
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
                      // Handle analytics logic here
                    }}
                  >
                    <BarChart2 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-start space-x-2 pl-0"
                    onClick={() => {
                      // Handle sign out logic here
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
