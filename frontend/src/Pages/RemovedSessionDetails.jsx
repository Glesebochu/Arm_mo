import React, { useEffect, useState } from "react";
import axios from "axios";
import ObservableObjectCard from "@/components/Custom/ObservableObjectCard";
import AhaMomentCard from "@/components/Custom/AhaMomentCard";
import StageCard from "@/components/Custom/PracticedStageCard"; // Import the StageCard component
import RemovedSessionDuration from "@/components/Custom/RemovedSessionDuration"; // Import the new SessionDuration component
import "@/Styles/SessionDetails.css"; // Make sure to import the CSS file

function RemovedSessionDetails({ sessionId }) {
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
        console.log(`Fetching session data for session ID: ${sessionId}`);

        // Fetch session data
        const sessionResponse = await axios.get(
          `http://localhost:5158/api/Analyzer/GetRemovedSession?SessionId=${sessionId}`
        );
        const sessionData = sessionResponse.data;
        console.log(sessionData);
        setSessionData(sessionData);

        // Fetch the meditator ID for this session
        const meditatorResponse = await axios.get(
          `http://localhost:5158/api/Analyzer/GetMeditatorForRemovedSession?sessionId=${sessionId}`
        );
        const meditatorId = meditatorResponse.data;

        // Fetch counts and types for each observable object
        const countsAndTypesPromises = sessionData.observableObjects.map(
          async (object) => {
            const countResponse = await axios.get(
              `http://localhost:5158/api/Analyzer/GetCountOfObservableObjectForMeditator`,
              {
                params: {
                  observableObject: object.title,
                  meditatorId: meditatorId,
                },
              }
            );

            const typeResponse = await axios.get(
              `http://localhost:5158/api/analyzer/GetTypeForAnObservableObject`,
              {
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
  }, [sessionId]);

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
      <h1 className="mb-4 text-2xl font-semibold leading-none tracking-tight text-black md:text-6xl lg:text-5xl dark:text-white">
        {sessionTitle}
      </h1>
      <div className="text-center mb-8">
        <RemovedSessionDuration sessionId={sessionId} />
      </div>
      <div className="card-container">
        <div className="card">
          <h2 className="mb-4 text-xl font-light leading-none tracking-tight text-black md:text-4xl lg:text-3xl dark:text-white">
            Observable Objects
          </h2>
          <h3 className="section-title text-lg font-light">
            Sensory Stimulus{" "}
          </h3>
          <div className="cards-container">
            {observableObjectsByType.SensoryStimulus.length > 0 ? (
              observableObjectsByType.SensoryStimulus.map((object) => (
                <ObservableObjectCard
                  key={object.id}
                  object={object.title}
                  description={object.description}
                  icon={object.icon}
                  count={counts[object.title] || 0} // Use the fetched count data here
                />
              ))
            ) : (
              <p>No sensory stimulus objects available.</p>
            )}
          </div>
          <h3 className="section-title text-lg font-light">Mental Objects</h3>
          <div className="cards-container">
            {observableObjectsByType.MentalObject.length > 0 ? (
              observableObjectsByType.MentalObject.map((object) => (
                <ObservableObjectCard
                  key={object.id}
                  object={object.title}
                  description={object.description}
                  count={counts[object.title] || 0} // Use the fetched count data here
                />
              ))
            ) : (
              <p>No mental objects available.</p>
            )}
          </div>
        </div>
        <div className="card">
          <h2 className="mb-4 text-xl font-light leading-none tracking-tight text-black md:text-4xl lg:text-3xl dark:text-white">
            Aha Moments
          </h2>
          <div className="cards-container">
            {sessionData.ahaMoments.length > 0 ? (
              sessionData.ahaMoments.map((moment) => (
                <AhaMomentCard
                  key={moment.id}
                  label={moment.label}
                  count={ahaCounts[moment.label] || 0} // Use the fetched count data here
                />
              ))
            ) : (
              <p>No Aha Moments available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="stage-card-container">
        <h2 className="mb-4 text-xl font-light leading-none tracking-tight text-black md:text-4xl lg:text-3xl dark:text-white">
          Practiced Stages
        </h2>
        <div className="stage-cards">
          {sessionData.practicedStages.length > 0 ? (
            sessionData.practicedStages.map((stage) => (
              <StageCard key={stage.stageId} stageId={stage.stageId} />
            ))
          ) : (
            <p>No practiced stages available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RemovedSessionDetails;
