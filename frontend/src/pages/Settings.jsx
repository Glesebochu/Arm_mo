import {
  LogOut,
  Bell,
  User,
  Menu,
  Settings2,
  SlidersHorizontal
} from "lucide-react"
import { IoLogoAppleAr } from "react-icons/io5";
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { useState } from "react"
import { motion } from "framer-motion";
import Profile from "../components/Custom/Profile"
import { cn } from "../../utils/cn";

const Settings = ()=> {
  const sidebarTabs = [
    {
      title: "My Account",
      value: "MyAccount",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-white border">
          <div className="flex justify-center">
            <Profile/>
          </div>
        </div>
      ),
    },
    {
      title: "Game Settings",
      value: "GameSettings",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-white border">
        </div>
      ),
    },
    {
      title: "Game Play Settings",
      value: "plaGamePlaySettingsyground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-white border">
        </div>
      ),
    },
  ];
  const [active, setActive] = useState(sidebarTabs[0]);
  const [tabs, setTabs] = useState(sidebarTabs);
  const [hovering, setHovering] = useState(false);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...sidebarTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/home" className="flex items-center gap-2 font-semibold">
              <IoLogoAppleAr className="h-6 w-6" />
              <span className="font-k2d text-lg"> Arm&rsquo;mo</span>
            </a>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sidebarTabs.map((tab, idx)=> {
                return (
                  <a
                    key={idx}
                    onClick={() => {
                      moveSelectedTabToTop(idx);
                    }}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                  >
                    {active.value === tab.value && (
                      <motion.div
                        layoutId="clickedbutton"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        className={cn(
                          "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-[8px] text-primary",
                        )}
                      />
                    )}
                    {tab.value == "MyAccount" ? <User className={`relative ${active.value == tab.value ? "text-primary" : ""}`}/> : ""}
                    {tab.value == "GameSettings" ? <Settings2 className={`relative ${active.value == tab.value ? "text-primary" : ""}`}/> : ""}
                    {tab.value == "plaGamePlaySettingsyground" ? <SlidersHorizontal className={`relative ${active.value == tab.value ? "text-primary" : ""}`}/> : ""}
                    <span className={`relative block dark:text-white font-k2d text-[16px] ${active.value == tab.value ? "text-primary" : ""}`}>
                      {tab.title}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle className="font-bold font-k2d">Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="lg" className="w-full font-k2d font-bold">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 p-[29px] justify-between md:justify-end lg:justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {sidebarTabs.map((tab, idx)=> {
                  return (
                    <a
                      key={idx}
                      onClick={() => {
                        moveSelectedTabToTop(idx);
                      }}
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                    >
                      {active.value === tab.value && (
                        <motion.div
                          layoutId="clickedbutton"
                          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                          className={cn(
                            "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-[8px] text-primary",
                          )}
                        />
                      )}

                      {tab.value == "MyAccount" ? <User className={`relative ${active.value == tab.value ? "text-primary" : ""}`}/> : ""}
                      {tab.value == "GameSettings" ? <Settings2 className={`relative ${active.value == tab.value ? "text-primary" : ""}`}/> : ""}
                      {tab.value == "plaGamePlaySettingsyground" ? <SlidersHorizontal className={`relative ${active.value == tab.value ? "text-primary" : ""}`}/> : ""}

                      <span className={`relative block dark:text-white font-k2d text-[16px] ${active.value == tab.value ? "text-primary" : ""}`}>
                        {tab.title}
                      </span>
                    </a>
                  );
                })}
              </nav>
                <div className="mt-auto p-4">
                  <Card x-chunk="dashboard-02-chunk-0">
                    <CardHeader className="p-2 pt-0 md:p-4">
                      <CardTitle className="font-bold font-k2d">Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our support
                        team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                      <Button size="lg" className="w-full font-k2d font-bold">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
            </SheetContent>
          </Sheet>
          <LogOut/>
        </header>
        <main className={`w-full h-full`}>
          <FadeInDiv
            tabs={tabs}
            active={active}
            key={active.value}
            hovering={hovering}
            className={cn(`w-full h-[563px] ${hovering ? "mt-6" : ""}`)}
          />
        </main>
      </div>
    </div>
  )
}


export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-ful">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};

export default Settings;