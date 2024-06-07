// Import necessary modules
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { AnimatedInput } from "../components/Custom/AnimatedInput";
import { Meteors } from "../components/Custom/Meteors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Slices/AuthSlice";
import { z } from "zod";
import { notifyError} from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define the schema for the signin form using zod
const signinSchema = z.object({
    Email: z.string().email("Invalid email address"),
    Password: z.string().min(1,"Invalid passsword"),
});

const Signin = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Use the useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
    // Use the useNavigate hook to navigate
    const navigate = useNavigate();
    // Use the useState hook to manage the state of the form data
    const [formData, setFormData] = useState({
        Email: "",
        Password: ""
    });

    const {error, isError} = useSelector(state => state.Auth);
    // Define a function to handle changes to the form data
    const handleChange = (e) => {
        // Update the form data state with the new value
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(()=> {
      if(isSubmitting){
        if(!isError){
            navigate("/usage")
        } 
        notifyError(error.title);
        setIsSubmitting(false);
      }
    }, [isSubmitting,isError]);

    // Define a function to handle the form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Try to parse the form data using the schema
        try {
            signinSchema.parse(formData);
        } catch (error) {
            // If there was an error, display an error notification
            if (error instanceof z.ZodError) {
                error.errors.forEach((errorMsg) => {
                    // Display an error notification for each error
                    notifyError(errorMsg.message);
                });
            }
        }
        // Dispatch the login action to the Redux store
        await dispatch(login(formData));
        setIsSubmitting(true);
    };

    // Return the JSX for the signin form
    return (
        <div className="container rounded flex h-screen w-screen flex-col items-center justify-center">
            <div className="relative overflow-hidden grid gap-6 bg-white w-[25%] shadow-input rounded-tl-none rounded-2xl p-8">
                <div className="grid gap-2 z-50">
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <AnimatedInput id="email" placeholder="name@example.com" name="Email" onChange={handleChange}/>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password">Password</Label>
                        <AnimatedInput id="password" type="password" name="Password"  placeholder="••••••••" onChange={handleChange}/>
                    </div>
                </div>
                <Button onClick={handleSubmit}>Sign In</Button>
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
            <ToastContainer/>
        </div>
    );
};

export default Signin;