import { useFormContext } from "react-hook-form";
import { FiUpload } from "react-icons/fi";

interface FileUploadButtonProps {
  title: string;
}

export const FileUploadButton = ({ title }: FileUploadButtonProps) => {
  const { register } = useFormContext();

  return (
    <label
      htmlFor="dish-image"
      className="bg-dark-900 rounded-lg text-light-100 px-3.5 py-3 flex items-center gap-3 cursor-pointer lg:justify-center"
    >
      <FiUpload size={20} />
      {title}
      <input
        className="hidden"
        id="dish-image"
        type="file"
        accept="image/*"
        {...register("image")}
      />
    </label>
  );
};
