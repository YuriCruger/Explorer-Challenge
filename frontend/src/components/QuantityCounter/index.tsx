import { FaMinus, FaPlus } from "react-icons/fa6";

interface QuantityCounterProps {
  quantity: number;
  handleIncrement: any;
  handleDecrement: any;
}

export function QuantityCounter({
  quantity,
  handleIncrement,
  handleDecrement,
}: QuantityCounterProps) {
  return (
    <div className="text-light-300 flex items-center gap-5">
      <button
        onClick={() => {
          handleDecrement();
        }}
      >
        <FaMinus size={20} />
      </button>

      <span className="text-xl">{quantity}</span>

      <button
        onClick={() => {
          handleIncrement();
        }}
      >
        <FaPlus size={20} />
      </button>
    </div>
  );
}
