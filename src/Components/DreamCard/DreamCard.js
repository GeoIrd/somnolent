import React, { useState } from "react";
import { Heart, HalfHeart, Trash } from "../Icons/Icons";
import "./DreamCard.css";

const formatDream = (text) => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formattedText = formattedText.replace(/(\d+)\.\s/g, "<br /><br />$1. ");
  return formattedText;
};

const DreamCard = ({
  title,
  description,
  isFavorite,
  toggleFavorite,
  deleteDream,
  searchTerm,
  showDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleFavorite = () => {
    toggleFavorite();
  };

  const handleDelete = () => {
    if (window.confirm("Ești sigur că vrei să ștergi acest vis?")) {
      deleteDream();
    }
  };

  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const formattedDescription = formatDream(description);

  return (
    <div className="dream-card">
      <div className="float">
        <div className="card-actions">
          <div className="favorite-icon" onClick={handleToggleFavorite}>
            {isFavorite ? <Heart /> : <HalfHeart />}
          </div>
          {showDelete && (
            <div className="delete-icon" onClick={handleDelete}>
              <Trash />
            </div>
          )}
        </div>
        <div className="card-header">
          <h3
            className="card-title"
            dangerouslySetInnerHTML={{
              __html: highlightText(title, searchTerm),
            }}
          ></h3>
        </div>
      </div>
      <div
        className={`card-description ${isExpanded ? "expanded" : "collapsed"}`}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: highlightText(formattedDescription, searchTerm),
          }}
        ></p>
      </div>
      {description.length > 200 && (
        <div className="expand-btn" onClick={toggleExpand}>
          {isExpanded ? "Ascunde Visul" : "Citeste Visul"}
        </div>
      )}
    </div>
  );
};

export default DreamCard;
