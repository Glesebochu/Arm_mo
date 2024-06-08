import SessionDetails from "./pages/SessionDetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UsageView from "./pages/Usage";
import Insights from "./pages/Insights";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import ProtectedRoute from "../utils/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Landing />
        } 
        />
        <Route path="/Home" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />
        <Route path="/Usage" element={
          <ProtectedRoute>
            <UsageView />
          </ProtectedRoute>
        } 
        />
        <Route path="/session/:sessionId" element={
          <ProtectedRoute>
            <SessionDetails/>
          </ProtectedRoute>
        } />
        <Route path="/Insights" element={
          <ProtectedRoute>
            <Insights/>
          </ProtectedRoute>
        } />
        <Route path="/Settings" element={
          <ProtectedRoute>
            <Settings/>
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <Signup/>
        }/>
        <Route path="/signin" element={
          <Signin/>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
