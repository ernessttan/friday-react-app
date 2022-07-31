import { useState } from "react";
import { MenuIcon, PlusIcon } from "@heroicons/react/solid";
import Navbar from "./Navigation/Navbar";
import AddTask from "./Task/AddTask";
import Button from "./Buttons/Button";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <header className="py-3 flex justify-between">
      <button
        onClick={toggleNav}
        type="button"
        className="w-8 h-8 text-orange-500"
      >
        <MenuIcon />
      </button>
      <Button
        handleClick={toggleModal}
        name="New Task"
      >
        <PlusIcon className="h-5 w-5" />
      </Button>
      <Navbar
        isOpen={isOpen}
        toggleNav={toggleNav}
      />
      <AddTask
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
    </header>
  );
}

export default Header;
