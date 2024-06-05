import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SessionDetails from "./pages/SessionDetails"; // Import the new component for session details
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UsageView from "./pages/Usage";
import Insights from "./pages/Insights";
import Landing from "./pages/Landing";
import ProtectedRoute from "../utils/ProtectedRoute";
import { useEffect } from "react";
import { fetchMe } from "../Slices/AuthSlice";
import { useDispatch } from "react-redux";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/Usage" element={
          <ProtectedRoute>
            <UsageView />
          </ProtectedRoute>
        } 
        />
        <Route path="/session/:sessionId" element={<SessionDetails />} />
        <Route path="/Insights" element={<Insights />} />
      </Routes>
    </Router>
  );
}

export default App;
