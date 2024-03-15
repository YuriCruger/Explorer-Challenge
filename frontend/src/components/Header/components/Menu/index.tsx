import { Input } from "@/components/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { MenuButton } from "../MenuButton";
import { USER_ROLES } from "@/utils/roles";

interface MenuProps {
  handleLogout: () => void;
  role: string | null;
}

export function Menu({ handleLogout, role }: MenuProps) {
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

        <div className="mt-9">
          {role && [USER_ROLES.ADMIN].includes(role) && (
            <MenuButton title="Novo prato" />
          )}
          <MenuButton title="Sair" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}
