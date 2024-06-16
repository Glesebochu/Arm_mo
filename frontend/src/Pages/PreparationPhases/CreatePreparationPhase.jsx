import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeInput } from "@nextui-org/date-input";
import { Time } from "@internationalized/date";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../slices/GoalsSlice.js";
import { CreatePreparationPhaseThunk } from "../../../slices/PreparationPhaseSlice.js";
import { GoalsTable } from "@/components/GoalsTable.jsx";
import DistractionsTable from "@/components/DistractionsTable.jsx";

export default function CreatePreparationPhase() {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.Goals.goals);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const [stepIndex, setStepIndex] = useState(0);
  const [preparationData, setPreparationData] = useState({
    Duration: new Time(1, 0),
    Motivation: "",
    // Goals: [],
    Expectation: "",
    Distractions: [{ title: "", type: "" }], // Initialize with an empty row
    StartDateTime: "",
    EndDateTime: "",
  });

  // The function that updates the goaltable's preparation data
  // const handleGoalsSelection = (selectedGoals) => {
  //   setPreparationData({ ...preparationData, Goals: selectedGoals });
  // };

  const steps = [
    {
      title: "Goal",
      instruction:
        "Set a complete and achievable goal for your meditation session.",
      component: (
        <GoalsTable goals={goals} />
        // <GoalsTable goals={goals} onGoalsSelection={handleGoalsChange} />
      ),
    },
    {
      title: "Duration",
      instruction: "Set a reasonable timer for your meditation session.",
      component: (
        <TimeInput
          hourCycle={24}
          value={preparationData.Duration}
          onChange={(value) =>
            setPreparationData((prevData) => ({
              ...prevData,
              Duration: value,
            }))
          }
        />
      ),
    },
    {
      title: "Motivation",
      instruction:
        "Write a complete and meaningful statement about what motivates you to meditate.",
      component: (
        <Input
          placeholder="e.g., To improve my focus."
          value={preparationData.Motivation}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              Motivation: e.target.value,
            })
          }
          className="col-span-7 p-5 text-2xl mr-[50px]"
        />
      ),
    },
    {
      title: "Distraction",
      instruction:
        "Properly articulate any potential distractions that may affect your meditation.",
      component: (
        <DistractionsTable
          rows={preparationData.Distractions}
          onRowChange={(index, title, type) => {
            const newDistractions = [...preparationData.Distractions];
            newDistractions[index] = { title, type };
            setPreparationData({
              ...preparationData,
              Distractions: newDistractions,
            });
          }}
          onAddRow={() => {
            setPreparationData({
              ...preparationData,
              Distractions: [
                ...preparationData.Distractions,
                { title: "", type: "" },
              ],
            });
          }}
          onDeleteRow={(index) => {
            const newDistractions = [...preparationData.Distractions];
            newDistractions.splice(index, 1);
            setPreparationData({
              ...preparationData,
              Distractions: newDistractions,
            });
          }}
        />
      ),
    },
    {
      title: "Expectation",
      instruction:
        "Write a complete and meaningful statement about your expectations for this session.",
      component: (
        <Input
          placeholder="e.g., To stay focused without any distractions for 10 minutes. "
          style={{ "::placeholder": { fontSize: "50px" } }}
          value={preparationData.Expectation}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              Expectation: e.target.value,
            })
          }
          className="col-span-7 p-5 text-2xl mr-[50px]"
        />
      ),
    },
    {
      title: "Diligence",
      instruction: "Intend to focus diligently during your meditation.",
      component: null,
    },
    {
      title: "Posture",
      instruction: "Correct your posture according to the user guide.",
      component: null, // No additional components
    },
  ];

  const handleNext = () => {
    setStepIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setStepIndex((prevIndex) => prevIndex - 1);
  };

  const handleSave = () => {
    preparationData.EndDateTime = new Date().toISOString();
    const preparationPhaseData = {
      // Goals: preparationData.Goals,
      duration: preparationData.Duration.toString(),
      motivation: preparationData.Motivation,
      distractions: preparationData.Distractions,
      expectation: preparationData.Expectation,
      startDateTime: preparationData.StartDateTime,
      endDateTime: preparationData.EndDateTime,
    };
    console.log(preparationData);
    dispatch(CreatePreparationPhaseThunk(preparationPhaseData)).then(
      (response) => {
        // const prepPhaseId = response.data.id;
        // history.push({
        //   pathname: "/transition",
        //   state: { prepPhaseId },
      }
    );
  };

  const handleCancel = () => {
    setPreparationData({
      Duration: new Time(1, 0),
      Motivation: "",
      Goals: [],
      Expectation: "",
      Distractions: [],
      StartDateTime: "",
      EndDateTime: "",
    });
    setStepIndex(0);
  };

  const handleAction = (buttonLabel) => {
    if (buttonLabel === "Next step" || buttonLabel === "Ready") {
      handleNext();
    } else if (buttonLabel === "Save") {
      handleSave();
    } else if (buttonLabel === "Cancel") {
      handleCancel();
    }
  };

  useEffect(() => {
    if (stepIndex === 0) {
      setPreparationData({
        ...preparationData,
        StartDateTime: new Date().toISOString(),
      });
    }
  }, [stepIndex]);

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isSixthStep = stepIndex === 5;
  const isLastStep = stepIndex === steps.length - 1;

  const progress = stepIndex === 0 ? 0 : ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="grid grid-cols-8 grid-rows-6 gap-2 h-[90vh] w-Full m-[70px]">
      {isFirstStep && (
        <>
          <div className="col-start-1 col-span-7 row-start-1 row-span-2 mt-0 ml-[50px] mr-[50px] w-full">
            <h1 className="col-start-1 col-span-7 p-0">Prepare To Meditate!</h1>
            <Progress
              value={progress}
              className="p-0 h-1.5 col-start-1 col-span-7 mt-[40px] w-full mr-0"
            />
            <h3 className="col-start-1 col-span-7 text-4xl font-bold ml-[40px] p-0">
              {currentStep.title}
            </h3>
            <p className="col-start-1 col-span-7 text-xl ml-[40px] p-0 mt-5">
              {currentStep.instruction}
            </p>
          </div>

          <div className="col-start-1 col-span-7 row-start-3 row-span-2 p-5 text-xl mt-[30px] ml-[90px] overflow-auto w-full">
            {currentStep.component}
          </div>
          <Button
            onClick={handleNext}
            className="col-start-1 row-start-5 p-4  h-[70px] w-[300px] mt-[70px] ml-[80px] mr-[60px] text-2xl"
          >
            Next Step
          </Button>
          <Button
            onClick={handleCancel}
            className="col-start-7 col-span-2 row-start-5 p-4 mt-[70px] w-[300px] h-[70px] text-2xl"
          >
            Cancel
          </Button>
        </>
      )}

      {!isFirstStep && !isSixthStep && !isLastStep && (
        <>
          <div className="col-start-1 col-span-7 row-start-1 mt-0 ml-[50px] mr-[50px] w-full">
            <h1>{currentStep.title}</h1>
            <Progress
              value={progress}
              className="p-0 h-1.5 mt-[40px] w-full mr-0"
            />
            <p className="text-xl mt-5">{currentStep.instruction}</p>
          </div>
          {stepIndex === 1 && (
            <>
              <label className="text-xl col-start-1 col-span-7 ml-[65px] row-start-3">
                Timer
              </label>
              <div
                className="col-start-1 col-span-7 row-start-3 mt-10 ml-[65px] tracking-widest rounded-md hover:bg-gray-100 transition duration-100 border 
          border-grey text-5xl"
              >
                {currentStep.component}
              </div>
            </>
          )}
          {!(stepIndex === 1) && (
            <div className="col-start-1 col-span-7 row-start-2 row-span-3 p-5 text-xl mt-[70px] ml-[50px] mr-[50px] overflow-auto w-full">
              {currentStep.component}
            </div>
          )}
          <Button
            onClick={handlePrevious}
            className="col-start-1 row-start-5 p-4 h-[70px] w-[300px] mt-[70px] ml-[50px] mr-[60px] text-2xl"
          >
            Previous
          </Button>
        </>
      )}
      {isSixthStep ? (
        <>
          <div className="col-start-1 col-span-7 row-start-1 ml-[40px] w-full">
            <h1 className="col-start-1 col-span-7 row-start-1 ">
              {currentStep.title}
            </h1>
            <Progress
              value={progress}
              className="p-0 h-1.5 mt-[40px] col-start-1 col-span-7 row-start-2 w-full mr-0"
            />
          </div>

          <div className="col-start-1 col-span-7 row-start-2 ml-[60px] mt-[60px] text-4xl mb-0 ">
            <h3 className="mt-5 text-4xl ">{currentStep.instruction}</h3>
            <p className=" font-bold text-sm text-gray-500 tracking-wider mt-5">
              Click 'Ready' to proceed.
            </p>
          </div>
          <Button
            onClick={handlePrevious}
            className="col-start-1 row-start-5 p-4 h-[70px] w-[300px] mt-[70px] ml-[50px] mr-[60px] text-2xl"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="col-start-4 row-start-5 p-4 h-[70px] w-[300px] mt-[70px] ml-[20px] mr-[60px] text-2xl"
          >
            Ready
          </Button>
          <Button
            onClick={handleCancel}
            className="col-start-7 col-span-2 row-start-5 p-4 mt-[70px] w-[300px] h-[70px] text-2xl"
          >
            Cancel
          </Button>
        </>
      ) : isLastStep ? (
        <>
          <div className="col-start-1 col-span-7 row-start-1 ml-[40px] ">
            <h1 className="col-start-1 col-span-7 row-start-1 ">
              {currentStep.title}
            </h1>
            <Progress
              value={progress}
              className="p-0 h-1.5 mt-[40px] col-start-1 col-span-7 row-start-2 w-full mr-0"
            />
          </div>
          <div className="col-start-1 col-span-7 row-start-2 ml-[60px] mt-[60px] text-4xl mb-0 ">
            <h3 className="mt-5 text-4xl ">{currentStep.instruction}</h3>
            <p className=" font-bold text-sm  text-gray-500 tracking-wider mt-5">
              Click 'Save' to save all your data & move on to the transition
              phase.
            </p>
          </div>

          <Button
            onClick={handlePrevious}
            className="col-start-1 row-start-5 p-4 h-[70px] w-[300px] mt-[70px] ml-[50px] mr-[60px] text-2xl"
          >
            Previous
          </Button>
          <Button
            onClick={handleSave}
            className="col-start-4 row-start-5 p-4  h-[70px] w-[300px] mt-[70px]  ml-[20px] mr-[60px] text-2xl"
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            className="col-start-7 col-span-2 row-start-5 p-4 mt-[70px] w-[300px] h-[70px] text-2xl"
          >
            Cancel
          </Button>
        </>
      ) : (
        !isFirstStep && (
          <>
            <Button
              onClick={handleNext}
              className="col-start-4 row-start-5 p-4  h-[70px] w-[300px] mt-[70px]  ml-[20px] mr-[60px] text-2xl"
            >
              Next Step
            </Button>
            <Button
              onClick={handleCancel}
              className="col-start-7 col-span-2 row-start-5 p-4 mt-[70px] w-[300px] h-[70px] text-2xl"
            >
              Cancel
            </Button>
          </>
        )
      )}
    </div>
  );
}
