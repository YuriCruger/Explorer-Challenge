import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/auth";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export function Menu() {
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <div className="h-screen w-full absolute top-[114px] left-0 bg-dark-400 z-50">
      <div className="px-7 py-8">
        <div className="relative">
          <div className="text-light-500 absolute translate-y-[-50%] top-[50%] left-3.5">
            <HiMiniMagnifyingGlass size={26} />
          </div>

          <Input
            className="w-full pl-12"
            placeholder="Busque por pratos ou ingredientes"
          />
        </div>

        <div className="border-b-2 border-dark-1000 mt-9">
          <button className="pb-2 text-2xl text-start" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
