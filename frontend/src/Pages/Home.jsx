"use client"
import { Button } from "@/components/ui/button";
import UsageView from "../Pages/Usage"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import * as React from "react"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const frameworks = [
  {
    value: "one",
    label: "One",
  },
  {
    value: "two",
    label: "Two",
  },
  {
    value: "three",
    label: "Three",
  },
  {
    value: "four",
    label: "Four",
  },
]


const Home = () => {

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className="h-screen">
      {/* <UsageView /> */}
      <div className="flex justify-between h-1/4 items-center px-14" >
        <div>
          <Button variant="ghost" onClick={handleSettingsClick} className="px-3 py-8 rounded-full">
            <GoGear size={44}/>
          </Button>
        </div>

        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)?.label
                  : "Select Stage..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Stage..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-3 py-8 rounded-full">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocI6lCsv2hHzouIhHQH-qA7n996HHGRtgT82TrbdI7E7WGASkA=s96-c"/>
                  </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none"><b>Current Personal Information</b></h4>
                  {/* <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p> */}
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="fullName"><b>Full Name</b></Label>
                    <label className="col-span-2 h-7" htmlFor="fullName">Naod Mesfin</label>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="username"><b>Username</b></Label>
                    <label className="col-span-2 h-7" htmlFor="username">Username</label>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="email"><b>Email</b></Label>
                    <label className="col-span-2 h-7" htmlFor="email">Email</label>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="currentStage"><b>Current Stage</b></Label>
                    <label className="col-span-2 h-7" htmlFor="currentStage">Current Stage</label>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="progress"><b>Progress</b></Label>
                    <label className="col-span-2 h-7" htmlFor="progress">Progress</label>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="achievements"><b>Achievements</b></Label>
                    <label className="col-span-2 h-7" htmlFor="achievements">Achievements</label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="h-3/4 flex justify-center pt-40">
        <Button variant="outline"  className="px-11 py-16 rounded-full">
          START
        </Button>
      </div>
    </div>
  );
};

export default Home;
