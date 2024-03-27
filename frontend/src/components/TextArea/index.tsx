import { TextareaHTMLAttributes, forwardRef } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className="bg-dark-900 h-40 rounded-lg text-light-500 px-3.5 py-3 resize-none focus:outline-none placeholder:text-light-500 focus:ring-1 focus:ring-light-400 lg:h-52"
      />
    );
  }
);
