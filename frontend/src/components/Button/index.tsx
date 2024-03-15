import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function Button({ title, children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-tomato-100 rounded-md py-3 text-light-100 hover:bg-tomato-200 transition-colors w-full",
        className
      )}
    >
      {children}
      {title}
    </button>
  );
}
