import React, { useEffect, useState } from "react";
import axios from "axios";
import { Target } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ResponsiveContainer } from "recharts";
import "@/Styles/StageCard.css"; // Ensure to create and import the CSS file for styling

function StageCard({ stageId }) {
  const [stageData, setStageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Analyzer/GetStage?stageId=${stageId}`,
          {
            withCredentials: true,
          }
        );
        setStageData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStageData();
  }, [stageId]);

  if (loading) {
    return <div>Loading stage data...</div>;
  }

  if (error) {
    return <div>Error fetching stage data: {error}</div>;
  }

  if (!stageData) {
    return <div>No stage data available.</div>;
  }

  return (
    <div className="stage-card">
      <div className="stage-card-content">
        <Target className="h-4 w-4" />
        <div>
          <AlertTitle className="font-bold text-lg">
            Stage {stageData.id}
          </AlertTitle>
          <AlertDescription className="text-md">
            {stageData.goal}
          </AlertDescription>
        </div>
        {/* <div className="mt-2">
          <AlertTitle className="font-bold text-lg">Intentions</AlertTitle>
          <ul className="stage-list">
            {stageData.intentions.map((intention, index) => (
              <li key={index} className="text-md">{intention}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <AlertTitle className="font-bold text-lg">Skills</AlertTitle>
          <ul className="stage-list">
            {stageData.skills.map((skill, index) => (
              <li key={index} className="text-md">{skill}</li>
            ))}
          </ul>
        </div> */}
        <div className="mt-2">
          <AlertTitle className="font-bold text-lg">Obstacles</AlertTitle>
          <ul className="stage-list">
            {stageData.obstacles.map((obstacle, index) => (
              <li key={index} className="text-md">
                {obstacle}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <AlertTitle className="font-bold text-lg">
            Mastery Requirements
          </AlertTitle>
          <ul className="stage-list">
            {stageData.masteryRequirements.map((requirement, index) => (
              <li key={index} className="text-md">
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StageCard;
