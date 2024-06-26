import React, { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeInput } from "@nextui-org/date-input";
import { Time } from "@internationalized/date";
import { X } from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllGoals } from "../../../slices/GoalsSlice.js";
import { CreatePreparationPhaseThunk } from "../../../slices/PreparationPhaseSlice.js";
import { GoalsTable } from "@/components/GoalsTable.jsx";
import DistractionsTable from "@/components/DistractionsTable.jsx";
import "normalize.css";
import { motion } from "framer-motion";

export default function CreatePreparationPhase() {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.Goals.goals);

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  const [stepIndex, setStepIndex] = useState(0);
  const [preparationData, setPreparationData] = useState({
    duration: new Time(1, 0),
    Motivation: "",
    // Goals: [],
    Expectation: "",
    Distractions: [{ title: "", type: "" }], // Initialize with an empty row
    StartDateTime: "",
    EndDateTime: "",
  });
  const [stepErrorClasses, setStepErrorClasses] = useState({
    // goals: [],
    duration: "",
    motivation: "",
    distractions: [],
    expectation: "",
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
      errorComponent: (
        <Alert variant="destructive" className="bg-red-100 h-10 p-3.5">
          <ExclamationTriangleIcon className="h-4 w-5 p-0 m-0 font-bold" />
          <AlertDescription className="font-bold ml-2">
            Please select one or more goals.
          </AlertDescription>
        </Alert>
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
          value={preparationData.Motivation}
          onChange={(e) =>
            setPreparationData({
              ...preparationData,
              Motivation: e.target.value,
            })
          }
          className="text-2xl "
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
      errorComponent: (
        <Alert variant="destructive" className="bg-red-100 h-10 font-bold">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>
            Please add your distraction(s) correctly.
          </AlertDescription>
        </Alert>
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
          className="text-2xl"
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

  const handleNext = () => {
    let hasError = false;
    const newStepErrorClasses = { ...stepErrorClasses };
    const newDistractionErrors = preparationData.Distractions.map(
      (distraction) => ({
        title: "",
        type: "",
      })
    );

    if (
      stepIndex === 1 &&
      preparationData.duration.hour === 0 &&
      preparationData.duration.minute === 0 &&
      preparationData.duration.second === 0
    ) {
      newStepErrorClasses.duration = "border-red-500";
      hasError = true;
      console.log(preparationData.duration);
    } else {
      newStepErrorClasses.duration = "border-grey-500";
    }

    // if (stepIndex === 2 && preparationData.Motivation.length <= 1) {
    //   newStepErrorClasses.motivation = "border-red-500";
    //   hasError = true;
    // } else {
    //   newStepErrorClasses.motivation = "";
    // }

    // if (stepIndex === 4 && preparationData.Expectation.length <= 1) {
    //   newStepErrorClasses.expectation = "border-red-500";
    //   hasError = true;
    // } else {
    //   newStepErrorClasses.expectation = "";
    // }

    // if (stepIndex === 3) {
    //   preparationData.Distractions.forEach((distraction, index) => {
    //     if (distraction.title.length <= 1) {
    //       newDistractionErrors[index].title = "border-red-500";
    //       hasError = true;
    //     }

    //     if (distraction.type === "select type") {
    //       newDistractionErrors[index].type = "border-red-500";
    //       hasError = true;
    //     }
    //   });
    // }

    // newStepErrorClasses.distractions = newDistractionErrors;
    // setStepErrorClasses(newStepErrorClasses);

    if (!hasError) {
      setStepIndex((prevIndex) => prevIndex + 1);
      // console.log(preparationData.duration);
    }
  };

  const handlePrevious = () => {
    setStepIndex((prevIndex) => prevIndex - 1);
  };

  const handleSave = () => {
    preparationData.EndDateTime = new Date().toISOString();
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
      duration: new Time(1, 0),
      Motivation: "",
      Goals: [],
      Expectation: "",
      Distractions: [],
      StartDateTime: "",
      EndDateTime: "",
    });
    const [selectedGoals, setSelectedGoals] = useState([]);

    useEffect(() => {
      if (stepIndex === 0) {
        setPreparationData({
          ...preparationData,
          StartDateTime: new Date().toISOString(),
        });
      }
    }, [stepIndex]);
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
            className="text-2xl "
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
            className="text-2xl"
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

    return (
      <div className="grid grid-cols-9 grid-rows-11 gap-2 h-[85vh] m-20">
        <Progress
          value={progress}
          className=" h-1.5 col-start-1 col-span-9 row-start-1 w-full"
        />
        <Button
          onClick={handleCancel}
          className="col-start-9 row-start-2 font-bold bg-white border-2 border-solid border-red-200"
          variant="secondary"
        >
          Cancel
        </Button>
        {isFirstStep && (
          <>
            <div className="col-start-1 col-span-9 row-start-2 row-span-2 font-bold">
              <h2 className="col-start-1 col-span-4 row-start-2 text-5xl font-bold mt-0">
                {currentStep.title}
              </h2>
              <p className="col-start-1 col-span-9 row-start-3 text-xl font-bold mt-6 text-gray-600 ">
                {currentStep.instruction}
              </p>
            </div>
            <div className="col-start-1 col-span-9 row-start-4 row-span-6 mt-5 overflow-auto no-scrollbar scrollbar-hide">
              {currentStep.component}
            </div>
            <div className="col-start-1 col-span-3 row-start-11 row-span-2 h-10 mt-5">
              {currentStep.errorComponent}
            </div>
            <Button
              onClick={handleNext}
              className="col-start-8 col-span-2 row-start-11 row-span-2 h-10 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Next
            </Button>
          </>
        )}
        {!isFirstStep && !isSixthStep && !isLastStep && !(stepIndex == 3) && (
          <>
            <h2 className="col-start-1 col-span-4 row-start-2 text-5xl font-bold mt-0">
              {currentStep.title}
            </h2>
            <p className="col-start-1 col-span-9 row-start-3 text-2xl font-bold text-gray-600 mt-10">
              {currentStep.instruction}
            </p>
            {stepIndex === 1 && (
              <>
                <label className="col-start-4 col-span-9 row-start-6 text-xl">
                  Timer
                </label>
                <div
                  className="col-start-4 col-span-2 row-start-6 p-0 row-span-3 mt-10 mr-10 tracking-widest rounded-md hover:bg-gray-100 transition duration-50 
         text-8xl"
                >
                  {currentStep.component}
                </div>
              </>
            )}
            {!(stepIndex === 1) && (
              <div className="col-start-1 col-span-9 row-start-6 mt-5 ml-5 text-xl">
                {currentStep.component}
              </div>
            )}
            <Button
              onClick={handlePrevious}
              className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Previous
            </Button>
          </>
        )}
        {stepIndex == 3 && (
          <>
            <h2 className="col-start-1 col-span-4 row-start-2 text-5xl font-bold mt-0">
              {currentStep.title}
            </h2>

            <p className="col-start-1 col-span-9 row-start-3 text-2xl font-bold text-gray-600 mt-10">
              {currentStep.instruction}
            </p>
            <div className="col-start-1 col-span-3 row-start-5 h-10 ml-0">
              {currentStep.errorComponent}
            </div>

            <div className="col-start-1 col-span-9 row-start-6 row-span-6 text-xl overflow-auto position-sticky no-scrollbar scrollbar-hide">
              {currentStep.component}
            </div>

            <Button
              onClick={handlePrevious}
              className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Previous
            </Button>
          </>
        )}
        {isSixthStep ? (
          <>
            <h1 className="col-start-1 col-span-4 row-start-2 text-5xl font-bold mt-0">
              {currentStep.title}
            </h1>
            <div className="col-start-1 col-span-9 row-start-4 text-4xl">
              <h3 className="text-4xl mt-5 font-bold text-gray-600">
                {currentStep.instruction}
              </h3>
              <p className=" font-bold text-xl text-gray-500 tracking-wider mt-5">
                Click 'Ready' to proceed.
              </p>
            </div>
            <Button
              onClick={handlePrevious}
              className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="col-start-8 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Ready
            </Button>
          </>
        ) : isLastStep ? (
          <>
            <h1 className="col-start-1 col-span-4 row-start-2 text-5xl font-bold mt-0">
              {currentStep.title}
            </h1>
            <div className="col-start-1 col-span-9 row-start-4 text-4xl">
              <h3 className="text-4xl mt-5 font-bold text-gray-600">
                {currentStep.instruction}
              </h3>
              <p className=" font-bold text-xl text-gray-500 tracking-wider mt-5">
                Click 'Ready' to proceed.
              </p>
            </div>
            <Button
              onClick={handlePrevious}
              className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Previous
            </Button>
            <Button
              onClick={handleSave}
              className="col-start-8 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
              variant="secondary"
            >
              Save
            </Button>
          </>
        ) : (
          !isFirstStep && (
            <>
              <Button
                onClick={handleCancel}
                className="col-start-9 row-start-1 font-bold"
                variant="destructive"
              >
                Cancel
              </Button>
              {isFirstStep && (
                <>
                  <h1 className="col-start-1 col-span-5 row-start-1 text-5xl mt-0">
                    Prepare To Meditate!
                  </h1>
                  <Progress
                    value={progress}
                    className=" h-1.5 col-start-1 col-span-9 row-start-2 w-full mt-5"
                  />

                  <div className="col-start-1 col-span-9 row-start-3 row-span-2 font-bold ml-5">
                    <h2 className="col-start-1 col-span-4 row-start-3 text-5xl font-bold mt-0">
                      {currentStep.title}
                    </h2>
                    <p className="col-start-1 col-span-9 row-start-4 text-xl font-bold m-3 mt-6 text-gray-600 ">
                      {currentStep.instruction}
                    </p>
                  </div>
                  <div className="col-start-1 col-span-9 row-start-5 row-span-6 ml-8 mt-5 overflow-auto no-scrollbar scrollbar-hide">
                    {currentStep.component}
                  </div>
                  <Button
                    onClick={handleNext}
                    className="col-start-8 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
                    variant="secondary"
                  >
                    Next
                  </Button>
                </>
              )}

              {!isFirstStep &&
                !isSixthStep &&
                !isLastStep &&
                !(stepIndex == 3) && (
                  <>
                    <h1 className="col-start-1 col-span-5 row-start-1 text-5xl mt-0">
                      {currentStep.title}
                    </h1>
                    <Progress
                      value={progress}
                      className=" h-1.5 col-start-1 col-span-9 row-start-2 w-full mt-5"
                    />

                    <p className="col-start-1 col-span-9 row-start-3 text-3xl m-5 font-bold text-gray-600 ">
                      {currentStep.instruction}
                    </p>
                    {stepIndex === 1 && (
                      <>
                        <label className="col-start-1 col-span-9 row-start-5 text-xl mt-5 ml-5">
                          Timer
                        </label>
                        <div
                          className="col-start-1 col-span-9 row-start-6 p-0 row-span-2 mt-5 ml-5 tracking-widest rounded-md hover:bg-gray-100 transition duration-50 border 
          border-grey text-5xl"
                        >
                          {currentStep.component}
                        </div>
                      </>
                    )}
                    {!(stepIndex === 1) && (
                      <div className="col-start-1 col-span-9 row-start-6 mt-5 ml-5 text-xl">
                        {currentStep.component}
                      </div>
                    )}
                    <Button
                      onClick={handlePrevious}
                      className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
                      variant="secondary"
                    >
                      Previous
                    </Button>
                  </>
                )}
              {stepIndex == 3 && (
                <>
                  <h1 className="col-start-1 col-span-5 row-start-1 text-5xl mt-0">
                    {currentStep.title}
                  </h1>
                  <Progress
                    value={progress}
                    className=" h-1.5 col-start-1 col-span-9 row-start-2 w-full mt-5"
                  />

                  <p className="col-start-1 col-span-9 row-start-3 text-3xl m-5 font-bold text-gray-600 ">
                    {currentStep.instruction}
                  </p>

                  <div
                    className="col-start-1 col-span-9 row-start-5 row-span-6 mt-5 ml-5 text-xl overflow-auto position-sticky no-scrollbar scrollbar-hide
"
                  >
                    {currentStep.component}
                  </div>
                  <Button
                    onClick={handlePrevious}
                    className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
                    variant="secondary"
                  >
                    Previous
                  </Button>
                </>
              )}
              {isSixthStep ? (
                <>
                  <h1 className="col-start-1 col-span-5 row-start-1 text-5xl mt-0">
                    {currentStep.title}
                  </h1>
                  <Progress
                    value={progress}
                    className=" h-1.5 col-start-1 col-span-9 row-start-2 w-full mt-5"
                  />
                  <div className="col-start-1 col-span-9 row-start-4 text-4xl m-5">
                    <h3 className="text-4xl mt-5 font-bold text-gray-600">
                      {currentStep.instruction}
                    </h3>
                    <p className=" font-bold text-xl text-gray-500 tracking-wider mt-5">
                      Click 'Ready' to proceed.
                    </p>
                  </div>
                  <Button
                    onClick={handlePrevious}
                    className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
                    variant="secondary"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="col-start-8 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
                    variant="secondary"
                  >
                    Ready
                  </Button>
                </>
              ) : isLastStep ? (
                <>
                  <h1 className="col-start-1 col-span-5 row-start-1 text-5xl mt-0">
                    {currentStep.title}
                  </h1>
                  <Progress
                    value={progress}
                    className=" h-1.5 col-start-1 col-span-9 row-start-2 w-full mt-5"
                  />
                  <div className="col-start-1 col-span-9 row-start-4 text-4xl m-5">
                    <h3 className="text-4xl mt-5 font-bold text-gray-600">
                      {currentStep.instruction}
                    </h3>
                    <p className=" font-bold text-xl text-gray-500 tracking-wider mt-5">
                      Click 'Ready' to proceed.
                    </p>
                  </div>
                  <Button
                    onClick={handlePrevious}
                    className="col-start-1 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
                    variant="secondary"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="col-start-8 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
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
                      className="col-start-8 col-span-2 row-start-11 row-span-2 h-15 mt-5 text-xl bg-gray-100 font-bold border-b-2 border-solid shadow-m"
                      variant="secondary"
                    >
                      Next
                    </Button>
                  </>
                )
              )}
            </>
          )
        )}
      </div>
    );
  };
}
