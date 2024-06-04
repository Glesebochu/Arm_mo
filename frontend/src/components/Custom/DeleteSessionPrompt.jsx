import React, { useState } from "react";
import axios from "axios";

function DeleteSessionPrompt({ sessionId, onDelete, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `http://localhost:5158/api/Analyzer/DeleteSession?SessionId=${id}`
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Delay to allow animation to play
    } catch (error) {
      console.error("There was an error deleting the session!", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transition-transform duration-500 ${
          isDeleting
            ? "transform scale-0 opacity-0"
            : "transform scale-100 opacity-100"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to remove this session?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(sessionId)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSessionPrompt;
