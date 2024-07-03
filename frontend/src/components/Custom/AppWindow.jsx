import clsx from "clsx";
import { SkeletonMd } from "./Skeleton";
import { useState, useEffect, useRef } from "react";
function BrowserTab({ icon, title, isActive }) {
  return (
    <div
      className={clsx("flex h-6 items-center truncate rounded-lg", [
        isActive
          ? [
              "bg-slate-200 text-slate-600",
              "dark:bg-slate-100/20 dark:text-slate-300",
            ]
          : ["bg-slate-200/50 text-slate-500", "dark:bg-slate-100/5"],
      ])}
      style={{ width: 200 }}
    >
      <div className={clsx("flex w-full gap-2 px-2 text-xs")}>
        {icon}
        <div className={clsx("flex-1 truncate font-k2d font-bold w-40")}>
          <TypewriterEffect word={"https://Arm'mo.com"} typingDelay={150}/> 
        </div>
      </div>
    </div>
  );
}

export const TypewriterEffect = ({ word, typingDelay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isTypingComplete) {
          startTyping();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isTypingComplete]);

  const startTyping = () => {
    const typingInterval = setInterval(() => {
      setDisplayText((prevText) => {
        const nextChar = word[prevText.length];
        if (nextChar !== undefined) {
          return prevText + nextChar;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
          return prevText;
        }
      });
    }, typingDelay);
  };

  return <span ref={elementRef}>{displayText}</span>;
};

function AppWindow({
  children = null,
  type = "app",
  browserTabs = [],
}) {
  const isWithBrowserTabs = type === "browser" && browserTabs;

  return (
    <div
      role="presentation"
      className={clsx(
        "border-divider-light  flex h-full w-full  flex-col overflow-hidden rounded-xl border bg-white",
        "dark:border-divider-dark  from-white bg-gradient-to-br to-white"
      )}
    >
      <div
        className={clsx(
          "border-divider-light relative box-border",
          "dark:border-divider-dark",
        )}
        // className={clsx(
        //   "border-divider-light relative box-border border-b",
        //   "dark:border-divider-dark",
        //   [isWithBrowserTabs ? "h-20" : "h-10"]
        // )}
      >
        <div
          className={clsx(
            "absolute left-4 top-0 flex h-10 items-center gap-1.5"
          )}
        >
          <div
            className={clsx(
              "h-3 w-3 rounded-full bg-red-300",
              "dark:bg-slate-500"
            )}
          />
          <div
            className={clsx(
              "h-3 w-3 rounded-full bg-amber-300",
              "dark:bg-slate-500"
            )}
          />
          <div
            className={clsx(
              "h-3 w-3 rounded-full bg-green-300",
              "dark:bg-slate-500"
            )}
          />
        </div>
        {type === "browser" && (
          <>
            <div className={clsx("flex h-10 items-center justify-center")}>
              <BrowserTab
                  title={"Arm'mo.com"}
                  isActive={true}
                    
              />
            </div>
            {isWithBrowserTabs && (
              <div className={clsx("mt-2 flex gap-2 px-3")}>
                {browserTabs.map(({ icon, title, isActive }) => (
                  <BrowserTab
                    key={title}
                    icon={icon}
                    title={title}
                    isActive={isActive}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className={clsx("flex-1 overflow-hidden")}>{children}</div>
    </div>
  );
}

export default AppWindow;