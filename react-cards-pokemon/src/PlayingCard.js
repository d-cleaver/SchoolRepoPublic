import React from "react";
import { useFlip } from "./hooks/useFlip";
import backOfCard from "./back.png";
import "./PlayingCard.css";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [isFlipped, flipCard] = useFlip();
  return (
    <img
      src={isFlipped ? front : back}
      alt="playing card"
      onClick={flipCard}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
