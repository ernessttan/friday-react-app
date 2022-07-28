import { useState } from "react";
import { MenuIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/outline";
import Navbar from "./Navigation/Navbar";
import AddTask from "./addtask/AddTask";

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
      <button
        onClick={toggleModal}
        className="add-btn"
        type="button"
      >
        <PlusIcon className="h-5 w-5" />
        Add Task
      </button>
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
