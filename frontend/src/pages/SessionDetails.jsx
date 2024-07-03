import React, { useEffect, useState } from "react";
import axios from "axios";
import ObservableObjectCard from "@/components/Custom/ObservableObjectCard";
import AhaMomentCard from "@/components/Custom/AhaMomentCard";
import StageCard from "@/components/Custom/PracticedStageCard"; // Import the StageCard component
import SessionDuration from "@/components/Custom/SessionDuration"; // Import the new SessionDuration component
import "@/Styles/SessionDetails.css"; // Make sure to import the CSS file
import { useParams } from "react-router-dom";
import { IoLogoAppleAr } from "react-icons/io5";

function SessionDetails({ sessionId: sessionIdParam = null }) {

  const { sessionId } = useParams();
  // Check if there is a passed id through the parameter
  if (sessionIdParam == null) {
    console.log("SessionId", sessionIdParam);
    console.log("SessionIdfromparam", sessionId);
    sessionIdParam = sessionId;
  }
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({});
  const [ahaCounts, setAhaCounts] = useState({});
  const [observableObjectsByType, setObservableObjectsByType] = useState({
    SensoryStimulus: [],
    MentalObject: [],
  });

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        console.log(`Fetching session data for session ID: ${sessionIdParam}`);

        // Fetch session data
        const sessionResponse = await axios.get(
          `http://localhost:5158/api/Analyzer/GetSession?SessionId=${sessionIdParam}`,
          {
            withCredentials: true,
          }
        );
        const sessionData = sessionResponse.data;
        setSessionData(sessionData);

        // Fetch the meditator ID for this session
        const meditatorResponse = await axios.get(
          `http://localhost:5158/api/Analyzer/GetMeditatorForSession?sessionId=${sessionIdParam}`,
          {
            withCredentials: true,
          }
        );
        const meditatorId = meditatorResponse.data;

        // Fetch counts and types for each observable object
        const countsAndTypesPromises = sessionData.observableObjects.map(
          async (object) => {
            const countResponse = await axios.get(
              `http://localhost:5158/api/Analyzer/GetCountOfObservableObjectForMeditator`,
              {
                withCredentials: true,
                params: {
                  observableObject: object.title,
                  meditatorId: meditatorId,
                },
              }
            );

            const typeResponse = await axios.get(
              `http://localhost:5158/api/analyzer/GetTypeForAnObservableObject`,
              {
                withCredentials: true,
                params: {
                  observableObjectId: object.id,
                },
              }
            );

            return {
              ...object,
              count: countResponse.data,
              type: typeResponse.data,
            };
          }
        );

        const countsAndTypesResults = await Promise.all(countsAndTypesPromises);
        const newCounts = countsAndTypesResults.reduce((acc, obj) => {
          acc[obj.title] = obj.count;
          return acc;
        }, {});

        const organizedByType = countsAndTypesResults.reduce(
          (acc, obj) => {
            acc[obj.type].push(obj);
            return acc;
          },
          { SensoryStimulus: [], MentalObject: [] }
        );

        // Fetch counts for each Aha Moment
        const ahaCountsPromises = sessionData.ahaMoments.map((moment) =>
          axios
            .get(
              `http://localhost:5158/api/Analyzer/GetCountOfAhaMomentForMeditator`,
              {
                withCredentials: true,
                params: {
                  ahaMoment: moment.label,
                  meditatorId: meditatorId,
                },
              }
            )
            .then((response) => {
              return { label: moment.label, count: response.data };
            })
        );

        const ahaCountsResults = await Promise.all(ahaCountsPromises);
        const newAhaCounts = ahaCountsResults.reduce(
          (acc, { label, count }) => {
            acc[label] = count;
            return acc;
          },
          {}
        );

        setCounts(newCounts);
        setAhaCounts(newAhaCounts);
        setObservableObjectsByType(organizedByType);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionIdParam]);

  if (loading) {
    return <div>Loading session data...</div>;
  }

  if (error) {
    return <div>Error fetching session data: {error}</div>;
  }

  if (!sessionData) {
    return <div>No session data available.</div>;
  }

  const sessionTitle =
    sessionData.preparationPhase?.goals[0]?.parentGoal &&
      sessionData.preparationPhase?.goals[0]?.parentGoal.activity?.title &&
      sessionData.preparationPhase?.goals[0]?.parentGoal.meditationObject?.title
      ? `${sessionData.preparationPhase.goals[0].parentGoal.activity.title}: ` +
      `${sessionData.preparationPhase.goals[0].parentGoal.meditationObject.title}`
      : sessionData.preparationPhase?.goals[0]?.activity?.title &&
        sessionData.preparationPhase?.goals[0]?.meditationObject?.title
        ? `${sessionData.preparationPhase.goals[0].activity.title}: ` +
        `${sessionData.preparationPhase.goals[0].meditationObject.title}`
        : "Session Details";

  return (
    <div className="session-details-container">
      <a
        href="/home"
        className="flex self-start gap-2 font-bold"
      >
        <IoLogoAppleAr className="h-8 w-8" />
        <span className="font-k2d text-2xl"> Arm'mo</span>
      </a>
      <h1 className="mt-7 text-2xl font-semibold leading-none tracking-tight text-black lg:text-5xl dark:text-white">
        {sessionTitle}
      </h1>
      <div className="text-center mb-4">
        <SessionDuration sessionId={sessionIdParam} />
      </div>
      <div className="card-container">
        <div className="card">
          <h2 className="mb-4 text-xl font-light leading-none tracking-tight text-black md:text-4xl lg:text-3xl dark:text-white">
            Observable Objects
          </h2>
          {observableObjectsByType.SensoryStimulus.length > 0 && (
            <>
              <h3 className="section-title text-lg font-light">
                Sensory Stimulus
              </h3>
              <div className="cards-container">
                {observableObjectsByType.SensoryStimulus.map((object) => (
                  <ObservableObjectCard
                    key={object.id}
                    object={object.title}
                    description={object.description}
                    icon={object.icon}
                    count={counts[object.title] || 0} // Use the fetched count data here
                  />
                ))}
              </div>
            </>
          )}
          {observableObjectsByType.MentalObject.length > 0 && (
            <>
              <h3 className="section-title text-lg font-light">
                Mental Objects
              </h3>
              <div className="cards-container">
                {observableObjectsByType.MentalObject.map((object) => (
                  <ObservableObjectCard
                    key={object.id}
                    deletedSession={false}
                    object={object.title}
                    description={object.description}
                    count={counts[object.title] || 0} // Use the fetched count data here
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="card">
          <h2 className="mb-4 text-xl font-light leading-none tracking-tight text-black md:text-4xl lg:text-3xl dark:text-white">
            Aha Moments
          </h2>
          {sessionData.ahaMoments.length > 0 && (
            <div className="cards-container">
              {sessionData.ahaMoments.map((moment) => (
                <AhaMomentCard
                  key={moment.id}
                  label={moment.label}
                  count={ahaCounts[moment.label] || 0} // Use the fetched count data here
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="card-container">
        <h2 className="mb-4 text-xl font-light w-full text-center leading-none tracking-tight text-black md:text-4xl lg:text-4xl dark:text-white">
          Practiced Stages
        </h2>
        {sessionData.practicedStages.length > 0 && (
          <div className="stage-cards">
            {sessionData.practicedStages.map((stage) => (
              <StageCard key={stage.stageId} stageId={stage.stageId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

}

export default SessionDetails;
