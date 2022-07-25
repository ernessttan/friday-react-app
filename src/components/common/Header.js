import { useState } from "react";
import { MenuIcon } from "@heroicons/react/solid";
import Navbar from "../navigation/Navbar";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <header className="py-3 flex justify-between">
      <button onClick={toggleNav} type="button" className="w-8 h-8 text-orange-500">
        <MenuIcon />
      </button>
      <Navbar isOpen={isOpen} toggleNav={toggleNav} />
    </header>
  );
}

export default Header;
