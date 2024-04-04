import { MouseEvent, ReactNode, useState } from "react";
import "./index.css";

interface FavoriteButtonProps {
  children: ReactNode;
  handleFavoriteToggle: () => void;
}

export const FavoriteButton = ({
  children,
  handleFavoriteToggle,
}: FavoriteButtonProps) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    handleFavoriteToggle();
    setTimeout(() => {
      setAnimate(false);
    }, 600);
  };

  return (
    <button
      className={`button ${animate ? "animate" : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
