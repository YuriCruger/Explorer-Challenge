import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
}

export function Label({ title, ...props }: LabelProps) {
  return (
    <label {...props} className="text-light-400 mb-2 w-fit">
      {title}
    </label>
  );
}
