import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { FaPen } from "react-icons/fa";
import { AnimatedInput } from "./AnimatedInput";
import { useEffect, useRef, useState } from "react";
import { updateUserAccount } from "../../../slices/UserSlice";
import { z } from "zod";
import { notifyError, notifySuccess } from "../../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { updateUserPassword } from "../../../slices/UserSlice";

// Define the schema for the signin form using zod
const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Current Password must be at least 6 characters"),
  newPassword: z.string().min(6, "New Password must be at least 6 characters"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.Auth.user);
  
  const [userAccount, setUserAccount] = useState({
    profilePicture: "", 
    firstName: "",
    lastName: "",
    username: "",
  });
  
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  
  const {passwordStatus} = useSelector(state => state.Account);
  const handlePasswordSubmit = async (e)=> {
    try{
      passwordSchema.parse(userPassword);
      const resultAction = await dispatch(updateUserPassword(userPassword));
      console.log(resultAction, "result action")
      if (updateUserPassword.fulfilled.match(resultAction)) {
        const status = resultAction.payload;
        if (status === "succeded") {
          notifySuccess("Password changed successfully", "bottom-right");
        } else {
          notifyError("Your current password is incorrect", "bottom-right");
        }
      }
    }catch(error){ 
      if(error instanceof z.ZodError){
        error.errors.forEach(err => notifyError(err.message))
      }
    }
  }

  const handlePasswordChange  = (e) => {
    setUserPassword({
      "id": user.id,
      ...userPassword,
      [e.target.name] : e.target.value
    });
  }

  const handleAccountChange = (e) => {
    if(e.target.name == "profilePicture"){
      setUserAccount({
        ...userAccount,
        [e.target.name]: e.target.files[0],
      });
    }
    else{
      setUserAccount({
        ...userAccount,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  }

  const handleAccountSubmit = () => {
    const data = {
      ...userAccount,
      id: user.id
    }
    dispatch(updateUserAccount(data));
  };

  return (
    <Tabs defaultValue="account" className="w-[400px] font-k2d font-bold">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="relative overflow-hidden">
        <Card>
          <CardHeader className="flex items-center">
            <div className="relative flex justify-center z-50">
              <div className="border-[10px] w-fit rounded-[50%]">
                <Avatar className="h-16 w-16 mx-auto">
                  {user?.profilePicture ? (
                    <AvatarImage src={`http://localhost:5158${user.profilePicture}`} />
                  ) : (
                    <AvatarFallback className="bg-black text-white">
                      {user?.firstName.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="bg-[#E2E8F0] p-1 rounded-[50%] w-fit absolute left-[14%] bottom-[7%] rotate-6 cursor-pointer">
                  <input type="file" ref={fileInputRef} onChange={handleAccountChange} name="profilePicture" hidden/>
                  <FaPen className="text-black text-[16px] -rotate-12" onClick={handleIconClick}/>
                </div>
              </div>
            </div>
            {/* <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="mt-[-35px]">
            <div className="font-k2d">
              <Label htmlFor="firstName">First Name</Label>
              <AnimatedInput
                id="firstName"
                name="firstName"
                placeholder={user.firstName}
                onChange={handleAccountChange}
              />
            </div>
            <div className="font-k2d">
              <Label htmlFor="lastName">Last Name</Label>
              <AnimatedInput
                id="lastName"
                name="lastName"
                placeholder={
                  user.lastName ? `${user.lastName}` : "You don't have lastname"
                }
                onChange={handleAccountChange}
              />
            </div>
            <div className="font-k2d">
              <Label htmlFor="username">Username</Label>
              <AnimatedInput
                id="username"
                name="username"
                placeholder={
                  user.username
                    ? `@${user.username}`
                    : "You don't have username"
                }
                onChange={handleAccountChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleAccountSubmit}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            {/* <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="">
              <Label htmlFor="current">Current password</Label>
              <AnimatedInput id="current" type="password" name="currentPassword" value={userPassword["currentPassword"]} onChange={handlePasswordChange} />
            </div>
            <div className="mt-[-2px] font-k2d">
              <Label htmlFor="new">New password</Label>
              <AnimatedInput id="new" type="password"  name="newPassword" onChange={handlePasswordChange} value={userPassword["newPassword"]}/>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handlePasswordSubmit}>Change password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <ToastContainer className="text-sm font-k2d"/>
    </Tabs>
  );
};

export default Profile;