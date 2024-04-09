import { cn } from "@/utils/cn";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name?: string;
}

export const FormInput = ({ className, name = "", ...props }: InputProps) => {
  const { register } = useFormContext();

  return (
    <input
      id={name}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className={cn(
        "bg-dark-900 rounded-lg text-light-100 px-3.5 py-3 focus:outline-none placeholder:text-light-500 focus:ring-1 focus:ring-light-400",
        className
      )}
      {...register(name)}
      {...props}
    />
  );
};
