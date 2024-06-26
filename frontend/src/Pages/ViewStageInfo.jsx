import React, { useEffect, useState } from "react";
import axios from "axios";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ViewStageInfo() {
  const [stageId, setStageId] = useState(1);
  const [stageData, setStageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStageData = async (id) => {
    try {
      const response = await axios.get(
       ` http://localhost:5158/api/Analyzer/GetStage?stageId=${id}`
      );
      setStageData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStageData(stageId);
  }, [stageId]);

  const handlePrevious = () => {
    setStageId((prevId) => prevId - 1);
    setLoading(true);
    setError(null);
    setStageData(null);
  };

  const handleNext = () => {
    setStageId((prevId) => prevId + 1);
    setLoading(true);
    setError(null);
    setStageData(null);
  };

  if (!stageData) {
    return null;
  }

  return (
    <div className="grid grid-cols-11 grid-rows-13 ml-[10vw] mr-[10vw] mt-[10vh] h-[85vh]">
      <Target className="col-start-1 row-start-1 h-full w-full m-0 self-center" />
      <h1 className="col-start-2 row-start-1 col-span-full font-bold text-5xl mt-5 ml-5 self-center text-black">
        Stage {stageData.id}
      </h1>
      <h3 className="col-start-1 row-start-3 text-4xl col-span-full ml-5">
        Goal
      </h3>
      <h3 className="col-start-1 row-start-4 text-xl col-span-full mt-5 h-10 ml-5">
        {stageData.goal}
      </h3>
      <div className="col-start-1 row-start-5 col-span-full mt-2 border border-solid p-2 ml-5">
        <h2 className="col-start-1 row-start-5 font-bold text-xl mb-5">Obstacles</h2>
        <ul className="col-start-1 row-start-6 stage-list">
          {stageData.obstacles.map((obstacle, index) => (
            <li key={index} className="text-lg">
              {obstacle}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-start-1 row-start-6 col-span-full mt-2 border border-solid p-2 ml-5">
        <h2 className="col-start-1 row-start-6 font-bold text-xl mb-5">Mastery Requirements</h2>
        <ul className="stage-list">
          {stageData.masteryRequirements.map((requirement, index) => (
            <li key={index} className="text-lg">
              {requirement}
            </li>
          ))}
        </ul>
      </div>
      {stageId !== 1 && (
        <Button
          onClick={handlePrevious}
          className="col-start-1 col-span-2 row-start-8 row-span-2 mt-5 ml-5 h-10 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
          variant="secondary"
        >
          Previous
        </Button>
      )}
      {stageId !== 10 && (
        <Button
          onClick={handleNext}
          className="col-start-10 col-span-2 row-start-8 row-span-2 mt-5 h-10 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
          variant="secondary"
        >
          Next
        </Button>
      )}
 </div>
);
}
