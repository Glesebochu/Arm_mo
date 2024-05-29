import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ObservableObjectCard from "@/components/Custom/ObservableObjectCard";
import AhaMomentCard from "@/components/Custom/AhaMomentCard"; // Import the new AhaMomentCard component
import "@/Styles/SessionDetails.css"; // Make sure to import the CSS file

function SessionDetails() {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({});
  const [ahaCounts, setAhaCounts] = useState({});

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        console.log(`Fetching session data for session ID: ${sessionId}`);

        // Fetch session data
        const sessionResponse = await axios.get(
          `http://localhost:5158/api/Analyzer/GetSession?SessionId=${sessionId}`
        );
        const sessionData = sessionResponse.data;
        console.log("Session Data:", sessionData);
        setSessionData(sessionData);

        // Fetch the meditator ID for this session
        const meditatorResponse = await axios.get(
          `http://localhost:5158/api/Analyzer/GetMeditatorForSession?sessionId=${sessionId}`
        );
        const meditatorId = meditatorResponse.data;
        console.log("Meditator ID:", meditatorId);

        // Fetch counts for each observable object
        const countsPromises = sessionData.observableObjects.map((object) =>
          axios
            .get(
              `http://localhost:5158/api/Analyzer/GetCountOfObservableObjectForMeditator`,
              {
                params: {
                  observableObject: object.title,
                  meditatorId: meditatorId,
                },
              }
            )
            .then((response) => {
              console.log(`Count for ${object.title}:`, response.data);
              return { title: object.title, count: response.data };
            })
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
              console.log(`Count for ${moment.label}:`, response.data);
              return { label: moment.label, count: response.data };
            })
        );

        const countsResults = await Promise.all(countsPromises);
        const newCounts = countsResults.reduce((acc, { title, count }) => {
          acc[title] = count;
          return acc;
        }, {});

        const ahaCountsResults = await Promise.all(ahaCountsPromises);
        const newAhaCounts = ahaCountsResults.reduce(
          (acc, { label, count }) => {
            acc[label] = count;
            return acc;
          },
          {}
        );

        console.log("Counts Data:", newCounts);
        console.log("Aha Counts Data:", newAhaCounts);
        setCounts(newCounts);
        setAhaCounts(newAhaCounts);
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

  return (
    <div className="session-details-container">
      <div className="card-container">
        <div className="card">
          <h1>Observable Objects</h1>
          <div className="cards-container">
            {sessionData.observableObjects.length > 0 ? (
              sessionData.observableObjects.map((object) => (
                <ObservableObjectCard
                  key={object.id}
                  object={object.title}
                  description={object.description}
                  icon={object.icon}
                  count={counts[object.title] || 0} // Use the fetched count data here
                />
              ))
            ) : (
              <p>No observable objects available.</p>
            )}
          </div>
        </div>
        <div className="card">
          <h1>Aha Moments</h1>
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
    </div>
  );
}

export default SessionDetails;
