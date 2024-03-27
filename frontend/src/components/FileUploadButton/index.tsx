import { FiUpload } from "react-icons/fi";

interface FileUploadButtonProps {
  title: string;
  onFileChange: any;
}

export const FileUploadButton = ({
  title,
  onFileChange,
}: FileUploadButtonProps) => {
  return (
    <label
      htmlFor="dish-image"
      className="bg-dark-900 rounded-lg text-light-100 px-3.5 py-3 flex items-center gap-3 cursor-pointer lg:justify-center"
    >
      <FiUpload size={20} />
      {title}
      <input
        onChange={onFileChange}
        className="hidden"
        id="dish-image"
        type="file"
        accept="image/*"
      />
    </label>
  );
};
