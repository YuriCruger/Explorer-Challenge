import { ChangeEvent, useState } from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { PiReceiptLight } from "react-icons/pi";
import { Menu } from "./components/Menu";
import { Input } from "../Input";
import { Button } from "../Button";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { useAuth } from "@/providers/auth";
import { USER_ROLES } from "@/utils/roles";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "@/providers/search";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut, role } = useAuth();
  const { updateSearchState } = useSearch();
  const navigate = useNavigate();

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

      {!isMenuOpen && (
        <>
          <div className="flex items-center mx-auto lg:flex-col lg:items-end">
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
            {role && [USER_ROLES.ADMIN].includes(role) && (
              <span className="text-cake-200 text-xs">admin</span>
            )}
          </div>

          {role !== USER_ROLES.ADMIN && (
            <div className="relative lg:hidden">
              <PiReceiptLight size={26} />
              <span className="bg-tomato-100 rounded-full h-5 w-5 absolute -top-1.5 -right-1.5 flex items-center justify-center">
                0
              </span>
            </div>
          )}
        </>
      )}

      {isMenuOpen && (
        <Menu
          handleLogout={handleLogout}
          role={role}
          toggleMenu={toggleMenu}
          handleSearch={handleSearch}
        />
      )}

      <div className="relative flex-1 hidden lg:block">
        <div className="text-light-500 absolute translate-y-[-50%] top-[50%] left-4">
          <HiMiniMagnifyingGlass size={26} />
        </div>
        <Input
          placeholder="Busque por pratos ou ingredientes"
          className="w-full pl-14"
          onChange={handleSearch}
        />
      </div>

      <div className="w-[216px] hidden lg:block">
        {role === USER_ROLES.ADMIN ? (
          <Link to="/new-dish">
            <Button
              title="Novo prato"
              className="flex items-center justify-center gap-1"
            />
          </Link>
        ) : (
          <Button
            title="Pedidos (0)"
            className="flex items-center justify-center gap-1"
          >
            <PiReceiptLight size={26} />
          </Button>
        )}
      </div>

      <button className="hidden lg:block" onClick={handleLogout}>
        <MdLogout size={28} />
      </button>
    </header>
  );
}
