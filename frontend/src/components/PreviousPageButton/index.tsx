import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function PreviousPageButton() {
  const navigate = useNavigate();

  function navigateToPreviousPage() {
    navigate(-1);
  }

  return (
    <button
      aria-label="Previous page"
      className="text-light-100 flex items-center gap-1"
      onClick={navigateToPreviousPage}
    >
      <IoChevronBack size={24} /> <p className="lg:text-2xl">voltar</p>
    </button>
  );
}
