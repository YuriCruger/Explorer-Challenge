import { ChangeEvent, useEffect, useState } from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { PiReceiptLight } from "react-icons/pi";
import { Menu } from "./components/Menu";
import { Button } from "../Button";
import { MdLogout } from "react-icons/md";
import { useAuth } from "@/hooks/auth";
import { USER_ROLES } from "@/utils/roles";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "@/hooks/search";
import { useCartOrders } from "@/hooks/cartOrders";
import { FilterInput } from "../FilterInput";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
  const { updateSearchState } = useSearch();
  const { cartStore, getCartOrders } = useCartOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getCartOrders(user.id);
    }
  }, []);

  const cartItemCount = cartStore?.cartOrderItems.length || 0;

  function toggleMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  function handleLogout() {
    signOut();
    navigate("/");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    updateSearchState(query);
  }

  return (
    <header className="bg-dark-700 h-[114px] text-light-100 px-7 pt-14 flex items-center justify-between xl:px-32 lg:py-6 lg:h-[104px] lg:gap-8">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          aria-label={!isMenuOpen ? "Open menu" : "Close menu"}
          onClick={toggleMenu}
        >
          {!isMenuOpen ? <HiMenu size={26} /> : <HiOutlineX size={26} />}
        </button>

        {isMenuOpen && <p className="text-2xl">Menu</p>}
      </div>

      <div
        className={`flex items-center mx-auto lg:flex-col lg:items-end lg:flex ${
          isMenuOpen && "hidden"
        }`}
      >
        <Link to="/">
          <div className="flex items-center gap-3 pr-2 lg:pr-0">
            <img
              src="/polygon.png"
              alt="food explorer logo"
              className="h-[26px]"
            />
            <span className="font-bold text-2xl whitespace-nowrap">
              food explorer
            </span>
          </div>
        </Link>
        {user && user.role && [USER_ROLES.ADMIN].includes(user.role) && (
          <span className="text-cake-200 text-xs">admin</span>
        )}
      </div>

      {!isMenuOpen && (
        <>
          {user && user.role !== USER_ROLES.ADMIN && (
            <Link to="/orders">
              <div className="relative lg:hidden">
                <PiReceiptLight size={26} />
                <span className="bg-tomato-100 rounded-full h-5 w-5 absolute -top-1.5 -right-1.5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              </div>
            </Link>
          )}
        </>
      )}

      {isMenuOpen && (
        <Menu
          handleLogout={handleLogout}
          role={user?.role}
          toggleMenu={toggleMenu}
          handleSearch={handleSearch}
        />
      )}

      <FilterInput className="flex-1 hidden lg:block" onChange={handleSearch} />

      <div className="hidden lg:block">
        {user && user.role === USER_ROLES.ADMIN ? (
          <div className="flex items-center gap-5">
            <Link to="/new-dish">
              <Button title="Novo prato" className="w-[180px] " />
            </Link>

            <Link to="/order-management">
              <Button title="Gerenciar pedidos" className="w-[180px] " />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link to="/favorites">
              <Button
                title="Favoritos"
                className="flex items-center justify-center gap-1 w-[180px]"
              />
            </Link>

            <Link to="/cart-orders">
              <Button
                title={`Carrinho (${cartItemCount})`}
                className="flex items-center justify-center gap-1 w-[180px]"
              >
                <PiReceiptLight size={26} />
              </Button>
            </Link>
          </div>
        )}
      </div>

      <button className="hidden lg:block" onClick={handleLogout}>
        <MdLogout size={28} />
      </button>
    </header>
  );
}
