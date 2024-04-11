import { MenuButton } from "../MenuButton";
import { USER_ROLES } from "@/utils/roles";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { useSearch } from "@/hooks/search";
import { FilterInput } from "@/components/FilterInput";

interface MenuProps {
  handleLogout: () => void;
  role: string | null;
  toggleMenu: () => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Menu({
  handleLogout,
  role,
  toggleMenu,
  handleSearch,
}: MenuProps) {
  const navigate = useNavigate();
  const { search } = useSearch();

  function handleNewDishNavigation() {
    toggleMenu();
    navigate("/new-dish");
  }

  function handleFavoritesPageNavigation() {
    toggleMenu();
    navigate("/favorites");
  }

  function handleOrdersPageNavigation() {
    toggleMenu();
    navigate("/cart-orders");
  }

  function handleOrdersManagementPageNavigation() {
    toggleMenu();
    navigate("/order-management");
  }

  return (
    <div className="h-screen w-full absolute top-[114px] left-0 bg-dark-400 z-50 lg:hidden">
      <div className="px-7 py-8">
        <FilterInput onChange={handleSearch} defaultValue={search} />

        <div className="mt-9">
          {role && [USER_ROLES.ADMIN].includes(role) ? (
            <>
              <MenuButton
                title="Novo prato"
                onClick={handleNewDishNavigation}
              />
              <MenuButton
                title="Gerenciar pedidos"
                onClick={handleOrdersManagementPageNavigation}
              />
            </>
          ) : (
            <>
              <MenuButton
                title="Favoritos"
                onClick={handleFavoritesPageNavigation}
              />
              <MenuButton
                title="Carrinho"
                onClick={handleOrdersPageNavigation}
              />
            </>
          )}

          <MenuButton title="Sair" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}
