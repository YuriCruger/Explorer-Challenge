import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export function QuantityCounter() {
  const [dishQuantity, setDishQuantity] = useState(1);

  function incrementQuantity() {
    if (dishQuantity >= 10) {
      return;
    }
    setDishQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decrementQuantity() {
    if (dishQuantity <= 1) {
      return;
    }
    setDishQuantity((prevQuantity) => prevQuantity - 1);
  }

  return (
    <div className="text-light-300 flex items-center gap-5">
      <button onClick={decrementQuantity}>
        <FaMinus size={20} />
      </button>

      <span className="text-xl">{dishQuantity}</span>

      <button onClick={incrementQuantity}>
        <FaPlus size={20} />
      </button>
    </div>
  );
}
