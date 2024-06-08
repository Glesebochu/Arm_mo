// Import necessary modules
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { AnimatedInput } from "../components/Custom/AnimatedInput";
import { Label } from "../components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../slices/AuthSlice";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/Toast";
import { injectStyle } from "react-toastify/dist/inject-style";
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from "../../slices/AuthSlice";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Inject the necessary styles for react-toastify
injectStyle();

// Define the schema for the signup form using zod
const signupSchema = z.object({
    FirstName: z.string().min(1, "First Name is required"),
    LastName: z.string().min(1, "Last Name is required"),
    Email: z.string().email("Invalid email address"),
    Password: z.string().min(6, "Password must be at least 6 characters"),
});

// Export a functional component for the signup form
const Signup = () => {
    const navigate = useNavigate();
    // Use the useSelector hook to select the necessary state from the Redux store
    const { error, isLoading, isError } = useSelector((state) => state.Auth);
    // Use the useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
    // Use the useState hook to manage the state of the form data
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
    });
    // Use the useState hook to manage the state of the form submission
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define a function to handle changes to the form data
    const handleChange = (e) => {
        // Update the form data state with the new value
        setFormData({
          ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Use the useEffect hook to handle the form submission
    useEffect(() => {
      // Check if the form is being submitted
      if (isSubmitting) {
        // Check if there was an error
        if (!isError) {
            // Display a success notification
            notifySuccess("Registered Successfully");

            // Set up a timeout to navigate after 5000 milliseconds
            const timeout = setTimeout(() => {
                navigate("/Signin");
            }, 5000);

            // Clean up the timeout to prevent it from recurring
            return () => clearTimeout(timeout);
        } else {
            // Display an error notification
            notifyError(error);
        }
        // Reset the isSubmitting state
        setIsSubmitting(false);
      }
    }, [isError, isSubmitting, navigate, notifyError, notifySuccess, error]);

    // Define a function to handle the form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Try to parse the form data using the schema
        try {
            signupSchema.parse(formData);
            // Dispatch the register action to the Redux store
            await dispatch(register(formData));
            // Set the isSubmitting state to true
            setIsSubmitting(true);
        } catch (error) {
            // If there was an error, display an error notification
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => notifyError(err.message));
            }
        }
    };

  // Return the JSX for the signup form
  return (
    <div>
      <div className="flex flex-col m-auto max-w-md w-full rounded-tl-none rounded-2xl mt-4 p-8 shadow-input">
        <h2 className="font-k2d font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Armmo
        </h2>
        <p className="font-k2d text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Create an account by signing up if you're new, or login to continue
          the journey!!
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <div>
              <Label className="font-k2d">First Name</Label>
              <AnimatedInput
                placeholder="Abenezer"
                name="FirstName"
                onChange={handleChange}
                className="font-k2d"
              />
            </div>
            <div>
              <Label className="font-k2d">Last Name</Label>
              <AnimatedInput
                placeholder="Walelign"
                name="LastName"
                onChange={handleChange}
                className="font-k2d"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label className="font-k2d">Email</Label>
            <AnimatedInput
              placeholder="name@example.com"
              name="Email"
              onChange={handleChange}
              className="font-k2d"
            />
          </div>
          <div className="mb-8">
            <Label className="font-k2d">Password</Label>
            <AnimatedInput
              placeholder="••••••••"
              name="Password"
              onChange={handleChange}
              className="font-k2d"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center">
              <span className="font-k2d text-[16px]">Signup</span> <FaArrowRight className="mt-1 ml-2" />
            </div>
            <BottomGradient />
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  await dispatch(
                    loginWithGoogle({ IdToken: credentialResponse.credential })
                  );
                  navigate("/home");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                // text="continue_with"
                width={600}
                useOneTap
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default Signup;
