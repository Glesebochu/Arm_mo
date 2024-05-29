import React from "react";
import "@/Styles/AhaMomentCard.css"; // Ensure to import the updated CSS file

function AhaMomentCard({ label, count }) {
  return (
    <div className="object-card">
      <div className="object-info">
        <div className="object-text">
          <p className="object-name">{label}</p>
          <p className="object-count">
            {count > 1
              ? `Has appeared ${count} times in past sessions.`
              : `Has appeared in only this session.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AhaMomentCard;
