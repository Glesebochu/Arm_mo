import SessionDetails from "./pages/SessionDetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UsageView from "./pages/Usage";
import Insights from "./pages/Insights";
import Home from "./pages/Home";
import { TransitionPhase } from "./pages/TransitionPhase";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import ProtectedRoute from "../utils/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SessionSummary from "./pages/AnalyticsPage";
import { useSelector } from "react-redux";
import CreatePreparationPhase from "./pages/PreparationPhases/CreatePreparationPhase";
// import PracticedStageCard from "./components/Custom/PracticedStageCard";
import StageCard from "./components/Custom/PracticedStageCard";
import ViewStageInfo from "./pages/ViewStageInfo";
import { Goals } from "./pages/Goals";


function App() {
  // const user = useSelector((state) => state.Auth.user);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", endUsage);

  //   return () => {
  //     window.removeEventListener("beforeunload", endUsage);
  //   };
  // }, []);
  // const endUsage = async () => {
  //   alert("closing!");
  // };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Sessionsummary"
          element={
            <ProtectedRoute>
              <SessionSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Usage"
          element={
            <ProtectedRoute>
              <UsageView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session/:sessionId"
          element={
            <ProtectedRoute>
              <SessionDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PreparationPhase"
          element={
            <ProtectedRoute>
              <CreatePreparationPhase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TransitionPhase"
          element={
            <ProtectedRoute>
              <TransitionPhase />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
