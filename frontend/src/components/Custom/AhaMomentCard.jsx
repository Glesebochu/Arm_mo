import React from "react";
import "@/Styles/AhaMomentCard.css"; // Ensure to import the updated CSS file

function AhaMomentCard({ deletedSession, label, count }) {
  return (
    <div className="object-card">
      <div className="object-info">
        <div className="object-text">
          <p className="object-name">{label}</p>
          <p className="object-count">
            {deletedSession == false
              ? count > 1
                ? `Has appeared ${count} times in past sessions.`
                : count > 0
                ? `Has appeared in only this session.`
                : `Has not appeared in a non-removed session.`
              : count > 1
              ? `Has appeared ${count} times in past sessions.`
              : count > 0
              ? `Has appeared once in a non-removed session.`
              : `Has not appeared in non-removed sessions.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AhaMomentCard;
