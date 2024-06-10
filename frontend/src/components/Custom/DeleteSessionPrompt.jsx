import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteSessionPrompt({ sessionId, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `http://localhost:5158/api/Analyzer/DeleteSession?SessionId=${id}`,
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the session!", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transition-transform duration-500 transform ${
          isDeleting ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to remove this session?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(sessionId)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSessionPrompt;
