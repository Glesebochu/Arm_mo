import React from "react";
import "@/Styles/ObservableObjectCard.css"; // Ensure to import the updated CSS file
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ObservableObjectCard({ deletedSession,object, description, icon, count }) {
  return (
    <div className="object-card">
      <div className="object-info">
        <div className="object-text">
          <p className="object-name">{object}</p>
          <p className="object-description">{description}</p>
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

export default ObservableObjectCard;
