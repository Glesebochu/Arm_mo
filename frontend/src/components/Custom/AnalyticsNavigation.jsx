import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import "@/Styles/NavBar.css"; // Ensure you import your CSS file

export function NavigationBar({ setSelectedView }) {
  const [hideNav, setHideNav] = useState(false);
  const navigate = useNavigate();
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop >= 30) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInsightsClick = () => {
    setSelectedView("Insights");
  };

  return (
    <div className="ParentContainer">
      <NavigationMenu
        className={`fixed top-0 left-0 right-0 mt-4 z-50 bg-white transition-transform ${
          hideNav ? "hidden" : ""
        } shrink-nav`}
      >
        <NavigationMenuList className="flex justify-between items-center w-full">
          <NavigationMenuItem className="nav-item z-100">
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent className="overflow-y-auto">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <p className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Arm_mo Analytics
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        View all your analytic data here. You can easily see
                        trends across all of your sessions.
                      </p>
                    </p>
                  </NavigationMenuLink>
                </li>
                <ListItem title="Home" onClick={() => navigate("/home")}>
                  Navigate back to the Home page.
                </ListItem>
                <ListItem
                  title="Sessions Summary"
                  onClick={() => setSelectedView("DataTable")}
                >
                  View a comprehensive summary of the sessions you had recently
                  in a tabular format.
                </ListItem>
                <ListItem title="Insights" onClick={handleInsightsClick}>
                  Peek into your Meditation status.
                </ListItem>
                <ListItem
                  title="Weekly Activity"
                  onClick={() => setSelectedView("UsageView")}
                >
                  Provides you with a graph that shows you the time you spent on
                  the app in a given week.
                </ListItem>
                <ListItem
                  title="Removed Sessions"
                  onClick={() => setSelectedView("RemovedSessions")}
                >
                  Allows you to view and restore your removed sessions.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuLink
            className={`nav-item ${navigationMenuTriggerStyle()}`}
            onClick={() => navigate("/Home")}
          >
            Home
          </NavigationMenuLink>
          <NavigationMenuItem className="nav-item">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedView("DataTable")}
            >
              Sessions Summary
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="nav-item">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedView("UsageView")}
            >
              App Activity
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="nav-item">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={handleInsightsClick}
            >
              Insights
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="nav-item">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedView("RemovedSessions")}
            >
              Removed Sessions
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, onClick, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            onClick={onClick}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
