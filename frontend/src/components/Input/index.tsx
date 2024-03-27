import { cn } from "@/utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "bg-dark-900 rounded-lg text-light-500 px-3.5 py-3 focus:outline-none placeholder:text-light-500 focus:ring-1 focus:ring-light-400",
          className
        )}
      />
    );
  }
);
