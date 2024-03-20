import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { DISH_CATEGORIES } from "@/utils/dish-categories";

interface SelectProps {
  handleSelectCategory: (name: string) => void;
  categoryName: string | undefined;
  register: any;
}

export function Select({
  handleSelectCategory,
  categoryName,
  register,
}: SelectProps) {
  const [isChecked, setIsChecked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleCheckedChange() {
    setIsChecked((prevState) => !prevState);
  }

  function onSelected(name: string) {
    handleSelectCategory(name);
    setIsChecked((prevState) => !prevState);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsChecked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative">
      <div
        onClick={handleCheckedChange}
        className={`bg-dark-900 text-light-500 flex items-center justify-between px-3.5 py-3 rounded-lg cursor-pointer ${
          isChecked && "ring-1 ring-light-400"
        }`}
      >
        <input
          {...register}
          type="text"
          readOnly
          className="bg-transparent focus:outline-none placeholder:text-light-500 pointer-events-none"
          defaultValue={categoryName}
        />

        {!isChecked ? <FaChevronDown /> : <FaChevronUp />}
      </div>

      {isChecked && (
        <div
          ref={dropdownRef}
          className="bg-dark-900 absolute top-14 z-10 flex-col w-full text-light-500 rounded-lg cursor-pointer divide-y divide-light-500 overflow-hidden shadow shadow-light-500"
        >
          {Object.keys(DISH_CATEGORIES).map((category) => (
            <div
              key={category}
              onClick={() => onSelected(category)}
              className="px-3.5 py-3.5 flex items-center justify-between hover:bg-dark-700"
            >
              <p>{category}</p>
              {category === categoryName && <FaCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
