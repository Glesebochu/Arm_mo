import React, { useState, useEffect } from "react";
import axios from "axios";

function RestoreSessionPrompt({ sessionId, onCancel }) {
  const [isRestoring, setisRestoring] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleRestore = async (id) => {
    setisRestoring(true);
    try {
      await axios.post(
        `http://localhost:5158/api/Analyzer/RestoreSession?SessionId=${id}`,
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("There was an error restoring the session!", error);
      setisRestoring(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transition-transform duration-500 transform ${
          isRestoring ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Restore</h2>
        <p className="mb-6">Are you sure you want to restore this session?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-grey-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handleRestore(sessionId)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestoreSessionPrompt;
