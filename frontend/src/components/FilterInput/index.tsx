import { cn } from "@/utils/cn";
import { InputHTMLAttributes } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const FilterInput = ({ className, ...props }: InputProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="text-light-500 absolute translate-y-[-50%] top-[50%] left-4">
        <HiMiniMagnifyingGlass size={26} />
      </div>

      <input
        placeholder="Busque por pratos ou ingredientes"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="bg-dark-900 rounded-lg text-light-100 px-3.5 py-3 focus:outline-none placeholder:text-light-500 focus:ring-1 focus:ring-light-400 w-full pl-12"
        {...props}
      />
    </div>
  );
};
