import React, { useState } from "react";
import axios from "axios";

function RestoreSessionPrompt({ sessionId, onDelete, onCancel }) {
  const [isRestoring, setisRestoring] = useState(false);

  const handleRestore = async (id) => {
    setisRestoring(true);
    try {
      await axios.post(
        `http://localhost:5158/api/Analyzer/RestoreSession?SessionId=${id}`
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Delay to allow animation to play
    } catch (error) {
      console.error("There was an error restoring the session!", error);
      setisRestoring(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transition-transform duration-500 ${
          isRestoring
            ? "transform scale-0 opacity-0"
            : "transform scale-100 opacity-100"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Restore</h2>
        <p className="mb-6">Are you sure you want to restore this session?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => handleRestore(sessionId)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestoreSessionPrompt;
