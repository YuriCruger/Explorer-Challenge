import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ ...props }: TextAreaProps) => {
  const { register } = useFormContext();
  return (
    <textarea
      {...register("description")}
      {...props}
      className="bg-dark-900 h-40 rounded-lg text-light-100 px-3.5 py-3 resize-none focus:outline-none placeholder:text-light-500 focus:ring-1 focus:ring-light-400 lg:h-52"
    />
  );
};
