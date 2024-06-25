// Import necessary modules
import { toast } from "react-toastify";
import { Slide } from "react-toastify";

// Export a function to display an error notification
// with a specified message at the bottom-right position
export const notifyError = (message) => {
    // Use toast.error from react-toastify to display the error message
    // with the specified options
    toast.error(message, {
        // Set the position of the notification to bottom-right
        position: "bottom-right",
        // Set the theme of the notification to light
        theme: "light",
        // Set the autoClose time to 5000 milliseconds (5 seconds)
        autoClose: 5000,
        // Show the progress bar
        hideProgressBar: false,
        // Close the notification when clicked
        closeOnClick: true,
        // Pause the notification when hovered
        pauseOnHover: true,
        // Make the notification draggable
        draggable: true,
        // Set the transition to Slide
        transition: Slide,
    });
};

// Export a function to display a success notification
// with a specified message at the top-right position
export const notifySuccess = (message, position="top-right") => {
    // Use toast.success from react-toastify to display the success message
    // with the specified options
    toast.success(message, {
        // Set the position of the notification to top-right
        position: position,
        // Set the theme of the notification to light
        theme: "light",
        // Set the autoClose time to 5000 milliseconds (5 seconds)
        autoClose: 5000,
        // Show the progress bar
        hideProgressBar: false,
        // Close the notification when clicked
        closeOnClick: true,
        // Pause the notification when hovered
        pauseOnHover: true,
        // Make the notification draggable
        draggable: true,
    });
};