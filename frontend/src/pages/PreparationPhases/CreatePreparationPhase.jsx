import React, { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeInput } from "@nextui-org/date-input";
import { Time } from "@internationalized/date";
import { IoLogoAppleAr } from "react-icons/io5";
import { X } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllGoals } from "../../../slices/GoalsSlice.js";
import { GoalsTable } from "@/components/GoalsTable.jsx";
import DistractionsTable from "@/components/DistractionsTable.jsx";
import "normalize.css";
import { motion } from "framer-motion";
// * For navigating to another page
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../../utils/Toast.js";
import { ToastContainer } from "react-toastify";
// import { title } from "process";

export default function CreatePreparationPhase() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.Goals.goals);

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [preparationData, setPreparationData] = useState({
    duration: new Time(1, 0),
    motivation: "",
    goals: [],
    expectation: "",
    distractions: [{ title: "", type: "" }], // Initialize with an empty row
    startDateTime: "",
    endDateTime: "",
  });
  // const [stepErrorClasses, setStepErrorClasses] = useState({
  //   Goals: [],
  //   duration: "",
  //   motivation: "",
  //   distractions: [],
  //   expectation: "",
  // });
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
        <GoalsTable goals={goals} onSelectedGoals={setSelectedGoals} />
      ),
    },
    {
      title: "Duration",
      instruction: "Set a reasonable timer for your meditation session.",
      component: (
        <TimeInput
          hourCycle={24}
          value={preparationData.duration}
          onChange={(value) =>
            setPreparationData((prevData) => ({
              ...prevData,
              duration: value,
            }))
          }
          className="tracking-wide self-center text-[8vw] w-[22vw] h-[26.5vh] p-0 m-0"
        />
      ),
      errorComponent: null,
    },
    {
      title: "Motivation",
      instruction:
        "Write a complete and meaningful statement about what motivates you to meditate.",
      component: (
        <Input
          placeholder="e.g., To improve my focus."
          value={preparationData.motivation}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              motivation: e.target.value,
            })
          }
          className="text-xl focus-visible:ring-1 ${stepErrorClasses}"
        />
      ),
      errorComponent: null,
    },
    {
      title: "Distraction",
      instruction:
        "Properly articulate any potential distractions that may affect your meditation.",
      component: (
        <DistractionsTable
          rows={preparationData.distractions}
          onRowChange={(index, title, type) => {
            const newDistractions = [...preparationData.distractions];
            newDistractions[index] = { title, type };
            setPreparationData({
              ...preparationData,
              distractions: newDistractions,
            });
          }}
          onAddRow={() => {
            setPreparationData({
              ...preparationData,
              distractions: [
                ...preparationData.distractions,
                { title: "", type: "" },
              ],
            });
          }}
          onDeleteRow={(index) => {
            const newDistractions = [...preparationData.distractions];
            newDistractions.splice(index, 1);
            setPreparationData({
              ...preparationData,
              distractions: newDistractions,
            });
            var a = index;
            console.log(a);
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
          value={preparationData.expectation}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              expectation: e.target.value,
            })
          }
          className="text-xl focus-visible:ring-1"
        />
      ),
      errorComponent: null,
    },
    {
      title: "Diligence",
      instruction: "Intend to focus diligently during your meditation.",
      component: null,
      errorComponent: null,
    },
    {
      title: "Posture",
      instruction: "Correct your posture according to the user guide.",
      component: null, // No additional components
      errorComponent: null,
    },
  ];
  useEffect(() => {
    setPreparationData({
      ...preparationData,
      goals: selectedGoals,
    });
  }, [selectedGoals]);

  // if (stepIndex == 0) {
  //   preparationData.goals = selectedGoals;
  // }
  const handleNext = () => {
    let hasError = false;
    // const newStepErrorClasses = { ...stepErrorClasses };
    const newDistractionErrors = preparationData.distractions.map(
      (distraction) => ({
        title: "",
        type: "",
      })
    );

    if (stepIndex == 0 && preparationData.goals.length == 0) {
      notifyError("Please select one or more goals.", "bottom-left", true);
      hasError = true;
    } else if (
      stepIndex === 1 &&
      preparationData.duration.hour === 0 &&
      preparationData.duration.minute === 0 &&
      preparationData.duration.second === 0
    ) {
      hasError = true;
      notifyError("Please add an appropriate duration.", "bottom-left", true);
      hasError = true;
    } else if (stepIndex === 2 && preparationData.motivation.length <= 1) {
      notifyError("Please add your motivation correctly.", "bottom-left", true);
      hasError = true;
    } else if (stepIndex === 3) {
      preparationData.distractions.forEach((distraction, index) => {
        if (distraction.title.length <= 1 && distraction.type === "") {
          notifyError(
            "Please enter you distraction(s) correctly.",
            "bottom-left",
            true
          );
          hasError = true;
        } else if (distraction.title.length <= 1) {
          notifyError(
            "Please specify the title of your distraction(s).",
            "bottom-left",
            true
          );
          hasError = true;
        } else if (distraction.type === "") {
          notifyError(
            "Please select the type of your distraction(s).",
            "bottom-left",
            true
          );
          hasError = true;
        }
      });
    } else if (stepIndex === 4 && preparationData.expectation.length <= 1) {
      notifyError(
        "Please add your expectation correctly.",
        "bottom-left",
        true
      );
      hasError = true;
    }
    if (!hasError) {
      setStepIndex((prevIndex) => prevIndex + 1);
      console.log(preparationData.distractions);
    }
  };

  const handlePrevious = () => {
    setStepIndex((prevIndex) => prevIndex - 1);
  };

  const handleSave = () => {
    preparationData.endDateTime = new Date().toISOString();
    console.log(preparationData);

    navigate("/TransitionPhase", { state: preparationData });
  };

  const handleCancel = () => {
    setPreparationData({
      duration: new Time(1, 0),
      motivation: "",
      goals: [],
      expectation: "",
      distractions: [],
      startDateTime: "",
      endDateTime: "",
    });
    setStepIndex(0);
  };

  useEffect(() => {
    if (stepIndex === 0) {
      setPreparationData({
        ...preparationData,
        startDateTime: new Date().toISOString(),
      });
    }
  }, [stepIndex]);

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isSixthStep = stepIndex === 5;
  const isLastStep = stepIndex === steps.length - 1;

  const progress = stepIndex === 0 ? 0 : ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="grid grid-cols-9 grid-rows-11 gap-2 h-[85vh] m-20 mt-5">
      <a
        href="/home"
        className="col-start-1 row-start-1 flex items-center gap-2 font-semibold"
      >
        <IoLogoAppleAr className="h-6 w-6" />
        <span className="font-k2d text-lg"> Arm&rsquo;mo</span>
      </a>
      <Progress
        value={progress}
        className=" h-1.5 col-start-1 col-span-9 row-start-2 w-full mt-5"
      />
      <Button
        onClick={handleCancel}
        className="col-start-9 row-start-1 font-bold mt-5 hover:bg-gray-50 bg-white border-b-2 shadow-m border-2 border-solid border-red-200 w-[10vw]"
        variant="ghost"
      >
        Cancel
      </Button>
      {isFirstStep && (
        <>
          <div className="col-start-1 col-span-9 row-start-3 row-span-2 font-bold">
            <h2 className="col-start-1 col-span-4 row-start-3 text-4xl font-bold pb-2">
              {currentStep.title}
            </h2>
            <p className="col-start-1 col-span-9 row-start-3 text-xl font-bold mt-6 text-gray-600 ">
              {currentStep.instruction}
            </p>
          </div>
          <div className="col-start-1 col-span-9 row-start-5 row-span-6 mt-5 overflow-auto no-scrollbar scrollbar-hide pl-3">
            {currentStep.component}
          </div>
          <div className="col-start-1 col-span-3 row-start-10 row-span-2 h-10 mt-5 w-[20vw] overflow-hidden">
            {currentStep.errorComponent}
          </div>
          <Button
            onClick={handleNext}
            className="col-start-8 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
            variant="secondary"
          >
            Next
          </Button>
        </>
      )}

      {!isFirstStep && !isSixthStep && !isLastStep && !(stepIndex == 3) && (
        <>
          <h2 className="col-start-1 col-span-4 row-start-3 text-4xl font-bold pb-2">
            {currentStep.title}
          </h2>
          <p className="col-start-1 col-span-9 row-start-4 text-xl font-bold text-gray-600 mt-5">
            {currentStep.instruction}
          </p>
          {stepIndex === 1 && (
            <>
              <div
                className=" col-start-4 col-span-2 row-start-6 row-span-3 p-0 m-0
                rounded-md bg-gray-50 hover:bg-gray-100 transition duration-50 w-[22vw] h-[26.5vh] shadow-xl self-center items-center"
              >
                {currentStep.component}
              </div>
            </>
          )}
          {!(stepIndex === 1) && (
            <div className="col-start-1 col-span-9 row-start-6 mt-5 text-xl">
              {currentStep.component}
            </div>
          )}
          <Button
            onClick={handlePrevious}
            className="col-start-1 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
            variant="secondary"
          >
            Previous
          </Button>
        </>
      )}
      {stepIndex == 3 && (
        <>
          <h2 className="col-start-1 col-span-4 row-start-3 text-4xl font-bold pb-2">
            {currentStep.title}
          </h2>

          <p className="col-start-1 col-span-9 row-start-4 text-xl font-bold text-gray-600 mt-5">
            {currentStep.instruction}
          </p>
          <div className="col-start-1 col-span-2 row-start-4 h-10 ml-0 overflow-hidden">
            {currentStep.errorComponent}
          </div>

          <div className="col-start-1 col-span-9 row-start-6 row-span-5 text-xl overflow-auto position-sticky no-scrollbar scrollbar-hide">
            {currentStep.component}
          </div>

          <Button
            onClick={handlePrevious}
            className="col-start-1 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
            variant="secondary"
          >
            Previous
          </Button>
        </>
      )}
      {isSixthStep ? (
        <>
          <h2 className="col-start-1 col-span-4 row-start- text-4xl font-bold pb-2">
            {currentStep.title}
          </h2>
          <div className="col-start-1 col-span-9 row-start-5 text-4xl">
            <h3 className="text-4xl mt-5 font-bold text-gray-600">
              {currentStep.instruction}
            </h3>
            <p className=" font-bold text-xl text-gray-500 tracking-wider mt-5">
              Click 'Ready' to proceed.
            </p>
          </div>
          <Button
            onClick={handlePrevious}
            className="col-start-1 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
            variant="secondary"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="col-start-8 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
            variant="secondary"
          >
            Ready
          </Button>
        </>
      ) : isLastStep ? (
        <>
          <h2 className="col-start-1 col-span-4 row-start- text-4xl font-bold pb-2">
            {currentStep.title}
          </h2>
          <div className="col-start-1 col-span-9 row-start-5 text-4xl">
            <h3 className="text-4xl mt-5 font-bold text-gray-600">
              {currentStep.instruction}
            </h3>
            <p className=" font-bold text-xl text-gray-500 tracking-wider mt-5">
              Click 'Ready' to proceed.
            </p>
          </div>
          <Button
            onClick={handlePrevious}
            className="col-start-1 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
            variant="secondary"
          >
            Previous
          </Button>
          <Button
            onClick={handleSave}
            className="col-start-8 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
            variant="secondary"
          >
            Save
          </Button>
        </>
      ) : (
        !isFirstStep && (
          <>
            <Button
              onClick={handleNext}
              className="col-start-8 col-span-2 row-start-11 row-span-2 h-[7vh] mt-5 w-[20vw] overflow-hidden text-xl bg-gray-100 hover:bg-white font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Next
            </Button>
          </>
        )
      )}
      <ToastContainer />
    </div>
  );
}
