import { FiUpload } from "react-icons/fi";

export function FileUploadButton({ register }: any) {
  return (
    <label
      htmlFor="dish-image"
      className="bg-dark-900 rounded-lg text-light-100 px-3.5 py-3 flex items-center gap-3 cursor-pointer lg:justify-center"
    >
      <FiUpload size={20} />
      Selecione uma imagem
      <input
        {...register}
        className="hidden"
        id="dish-image"
        type="file"
        accept="image/*"
      />
    </label>
  );
}
