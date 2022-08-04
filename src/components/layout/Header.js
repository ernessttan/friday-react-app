import { useContext, useState } from 'react';
import { MenuIcon, PlusIcon } from '@heroicons/react/solid';
import AuthContext from '../../context/AuthContext';
import Button from '../buttons/Button';
import Navbar from './Navbar';
import CreateTask from '../task/CreateTask';

function Header() {
  const auth = useContext(AuthContext);
  const [isNavOpen, setisNavOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  const toggleNav = () => setisNavOpen(!isNavOpen);

  const toggleModal = () => setisModalOpen(!isModalOpen);

  return (
    <header className="flex justify-between">
      <button
        onClick={toggleNav}
        type="button"
        className="w-8 h-8 text-orange-500"
      >
        <MenuIcon />
      </button>
      <Button onClick={toggleModal}>
        <PlusIcon className="w-5 h-5" />
        Create Task
      </Button>
      <Navbar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        logout={auth.logout}
      />
      <CreateTask
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </header>
  );
}

export default Header;
