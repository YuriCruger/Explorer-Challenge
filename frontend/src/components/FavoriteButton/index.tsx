import { ReactNode, useState } from "react";
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

  const handleClick = () => {
    if (!animate) {
      setAnimate(true);
      handleFavoriteToggle();
      setTimeout(() => {
        setAnimate(false);
      }, 600);
    }
  };

  return (
    <button
      className={`button hover:scale-110 transition-all ${
        animate ? "animate" : ""
      }`}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
};
