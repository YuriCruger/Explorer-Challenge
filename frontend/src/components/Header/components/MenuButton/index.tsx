import { ButtonHTMLAttributes } from "react";

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function MenuButton({ title, ...props }: MenuButtonProps) {
  return (
    <button
      {...props}
      className="py-3 text-2xl text-start border-b-2 border-dark-1000 w-full"
    >
      {title}
    </button>
  );
}
