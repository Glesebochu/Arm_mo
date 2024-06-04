import React from "react";
import "@/Styles/ObservableObjectCard.css"; // Ensure to import the updated CSS file
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ObservableObjectCard({ object, description, icon, count }) {
  return (
    <div className="object-card">
      <div className="object-info">
        <Avatar>
          <AvatarImage src={`/src/Icons/${icon}`} alt={object} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="object-text">
          <p className="object-name">{object}</p>
          <p className="object-description">{description}</p>
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

export default ObservableObjectCard;
