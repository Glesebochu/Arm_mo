"use client";

import Tabs from "../components/AnimatedTabs";
import Profile from "../components/Profile";

const Settings = () => {
  const tabs = [
    {
      title: "My Account",
      value: "MyAccount",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-white border border-primary">
          <p className="text-black">My Profile</p>
          <div className="flex justify-center mt-6"><Profile/></div>
        </div>
      ),
    },
    {
      title: "Game Settings",
      value: "GameSettings",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-white border border-primary">
          <p className="text-black">Game Settings</p>
        </div>
      ),
    },
    {
      title: "Game Play Settings",
      value: "plaGamePlaySettingsyground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-white border border-primary">
          <p className="text-black">Game Play Settings</p>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-6">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default Settings