import React, { useEffect, useState } from "react";
import axios from "axios";
import { Target } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import { ResponsiveContainer } from "recharts";

export function CurrentStageAlert() {
  const [currentStage, setCurrentStage] = useState(null);
  const [goal, setGoal] = useState("");
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/analyzer/GetCurrentStageOfMeditator?meditatorId=${user.id}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setCurrentStage(data.id);
        setGoal(data.goal);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer className="w-full p-4">
      <div>
        <Target className="h-4 w-4" />
        <div>
          <AlertTitle className="font-bold text-lg">Current Stage</AlertTitle>
          <AlertDescription className="text-md">
            {currentStage ? `You are on stage ${currentStage}` : "Loading..."}
          </AlertDescription>
        </div>
        <div className="mt-2">
          <AlertTitle className="font-bold text-lg">Goal</AlertTitle>
          <AlertDescription className="text-md">{goal}</AlertDescription>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
