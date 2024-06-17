import React, { useEffect, useState } from "react";
import axios from "axios";
import { Activity } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import { ResponsiveContainer } from "recharts";

export function MostVisitedActivityAlert() {
  const [activity, setActivity] = useState("");
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Analyzer/GetMostFrequentedActivity?meditatorId=${user.id}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setActivity(data.activity);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer className="w-full p-4">
      <div>
        <Activity className="h-4 w-4" />
        <div>
          <AlertTitle className="font-bold text-lg">
            Most Visited Activity
          </AlertTitle>
          <AlertDescription className="text-md">
            {activity ? `${activity}` : "Loading..."}
          </AlertDescription>
        </div>
        <div className="mt-2">
          <AlertTitle className="font-bold text-lg">Visit Count</AlertTitle>
          <AlertDescription className="text-md">
            {count
              ? `You have visited this activity ${count} times`
              : "Loading..."}
          </AlertDescription>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
