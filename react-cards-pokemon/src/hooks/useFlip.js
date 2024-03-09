import { useState } from "react";

function useFlip(initialState = true) {
  const [isFlipped, setIsFlipped] = useState(initialState);
  const flipCard = () => {
    setIsFlipped((faceUp) => !faceUp);
  };
  return [isFlipped, flipCard];
}

export { useFlip };
