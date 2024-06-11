import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeInput } from "@nextui-org/date-input";
import { Time } from "@internationalized/date";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../slices/GoalsSlice.js";
import { CreatePreparationPhaseThunk } from "../../../slices/PreparationPhaseSlice.js";

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
    Goals: [],
    Expectation: "",
    Distractions: [],
    StartDateTime: "",
    EndDateTime: "",
  });

  const steps = [
    {
      title: "Goal",
      instruction:
        "Set a complete and achievable goal for your meditation session",
      component: (
        <Input
          value={preparationData.Goals}
          onChange={(e) =>
            setPreparationData({ ...preparationData, Goals: e.target.value })
          }
        />
      ),
      buttons: ["Next step", "Cancel"],
    },
    {
      title: "Duration",
      instruction: "Set a reasonable timer for your meditation session",
      component: (
        <TimeInput
          defaultValue={new Time(1, 0)}
          onChange={(e) =>
            setPreparationData({ ...preparationData, Duration: e.target.value })
          }
        />
      ),
      buttons: ["Previous", "Next step", "Cancel"],
    },
    {
      title: "Motivation",
      instruction:
        "Write a complete and meaningful statement about what motivates you to meditate.",
      component: (
        <Input
          value={preparationData.Motivation}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              Motivation: e.target.value,
            })
          }
        />
      ),
      buttons: ["Previous", "Next step", "Cancel"],
    },
    {
      title: "Distraction",
      instruction:
        "Properly articulate any potential distractions that may affect your meditation.",
      component: (
        <Input
          value={preparationData.Distractions}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              Distractions: e.target.value.split(","),
            })
          }
        />
      ),
      buttons: ["Previous", "Next step", "Cancel"],
    },
    {
      title: "Expectation",
      instruction:
        "Write a complete and meaningful statement about your expectations for this session.",
      component: (
        <Input
          value={preparationData.Expectation}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              Expectation: e.target.value,
            })
          }
        />
      ),
      buttons: ["Previous", "Next step", "Cancel"],
    },
    {
      title: "Diligence",
      instruction:
        "Intend to focus diligently during your meditation. Click 'Ready' to proceed.",
      component: <Input />, // Placeholder for any additional components
      buttons: ["Previous", "Cancel", "Ready"],
    },
    {
      title: "Posture",
      instruction:
        "Correct your posture according to the user guide. Click 'Save' to save all your data & move on to the transition phase.",
      component: null, // No additional components
      buttons: ["Previous", "Cancel", "Save"],
    },
  ];

  const handleNext = () => {
    setStepIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setStepIndex((prevIndex) => prevIndex - 1);
  };

  const handleSave = () => {
    const preparationPhaseData = {
      Duration: preparationData.Duration.toString(),
      Motivation: preparationData.Motivation,
      Goals: preparationData.Goals,
      Expectation: preparationData.Expectation,
      Distractions: preparationData.Distractions,
      StartDateTime: preparationData.StartDateTime,
      EndDateTime: new Date().toISOString(),
    };
    dispatch(CreatePreparationPhaseThunk(preparationPhaseData)); // Save preparation phase data
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
      const timer = setTimeout(() => {
        setPreparationData({
          ...preparationData,
          StartDateTime: new Date().toISOString(),
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stepIndex]);

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  return (
    <div>
      <h1>Main Instruction → Prepare to meditate</h1>
      <p>
        Instruction Description → Hey there! Let's take your meditation practice
        to the next level by answering some important questions.
      </p>
      <Progress value={stepIndex + 1} max={steps.length} />
      <h2>Title- {currentStep.title}</h2>
      <p>Instruction- {currentStep.instruction}</p>
      {currentStep.component}
      <div>
        {!isFirstStep && <Button onClick={handlePrevious}>Previous</Button>}
        {currentStep.buttons.map((buttonLabel) => (
          <Button key={buttonLabel} onClick={() => handleAction(buttonLabel)}>
            {buttonLabel}
          </Button>
        ))}
      </div>
    </div>
  );
}
