import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { DISH_CATEGORIES, DishCategories } from "@/utils/dish-categories";
import { useFormContext } from "react-hook-form";

export const Select = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const { setValue, register } = useFormContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleCheckedChange() {
    setIsChecked((prevState) => !prevState);
  }

  function onSelected(name: string) {
    setCategoryName(name);
    setValue("category", name);
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
        className={`bg-dark-900 text-light-100 flex items-center justify-between px-3.5 py-3 rounded-lg cursor-pointer ${
          isChecked && "ring-1 ring-light-400"
        }`}
      >
        <input
          type="text"
          readOnly
          className="bg-transparent focus:outline-none placeholder:text-light-500 pointer-events-none"
          placeholder="Selecione uma categoria"
          {...register("category")}
        />

        {!isChecked ? <FaChevronDown /> : <FaChevronUp />}
      </div>

      {isChecked && (
        <div
          ref={dropdownRef}
          className="bg-dark-900 absolute top-14 z-10 flex-col w-full text-light-500 rounded-lg cursor-pointer divide-y divide-light-500 overflow-hidden shadow shadow-light-500"
        >
          {Object.keys(DISH_CATEGORIES).map((categoryKey) => (
            <div
              key={categoryKey}
              onClick={() =>
                onSelected(DISH_CATEGORIES[categoryKey as keyof DishCategories])
              }
              className="px-3.5 py-3.5 flex items-center justify-between hover:bg-dark-700"
            >
              <p>{DISH_CATEGORIES[categoryKey as keyof DishCategories]}</p>
              {categoryKey === categoryName && <FaCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
