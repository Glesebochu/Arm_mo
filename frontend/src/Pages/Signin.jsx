import { Button } from "../components/ui/button"
import { Label  } from "../components/ui/label"
import { FaGoogle } from "react-icons/fa"
import { AnimatedInput } from "../components/Custom/AnimatedInput"
import { Meteors } from "../components/Custom/Meteors";

const Signin = () => {
  return (
    <div className="container rounded flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative overflow-hidden grid gap-6 bg-white w-[25%] shadow-input rounded-tl-none rounded-2xl p-8">
        <div className="grid gap-2 z-50">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <AnimatedInput id="email" placeholder="name@example.com" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <AnimatedInput id="password" type="password"  placeholder="••••••••"/>
          </div>
        </div>
        <Button>Sign In</Button>
        <div className="relative">
          <div className="absolute flex inset-0 items-center">
            <span className="bg-red-500 w-full border-t border-slate-300 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex justify-center z-50">
          <Button variant="outline" className="w-full">
            <FaGoogle className="mr-2 h-4 w-4 text-primary"/>
            Google
          </Button>
        </div>
        <Meteors number={20}/>
      </div>
    </div>
  );
};

export default Signin;
