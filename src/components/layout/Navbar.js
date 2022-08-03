import { XIcon } from '@heroicons/react/solid';
import { HomeIcon, ClipboardListIcon } from '@heroicons/react/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import Proptypes from 'prop-types';

function Navbar({ isNavOpen, toggleNav, logout }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className={`p-3 bg-orange-500 h-full fixed top-0 left-0 w-1/2 z-3 ease-in-out duration-500 md:w-1/3 md:p-5 ${
        isNavOpen ? '-translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-end">
        <button
          onClick={toggleNav}
          type="button"
          className="w-8 h-8 text-white rounded hover:bg-orange-200"
        >
          <XIcon />
        </button>
      </div>
      <h1 className="text-white">Friday</h1>
      <div className="flex flex-col gap-3 my-8">
        <NavLink
          to="/home"
          className="flex items-center gap-3 py-2 text-xl font-semibold text-white rounded-md"
        >
          <HomeIcon className="w-8 h-8 text-white" />
          Home
        </NavLink>
        <NavLink
          to="/tasks"
          className="flex items-center gap-3 py-2 text-xl font-semibold text-white rounded-md"
        >
          <ClipboardListIcon className="w-8 h-8 text-white" />
          Tasks
        </NavLink>
      </div>
      <div className="absolute bottom-0 right-0 p-3">
        <button
          className="font-bold text-white"
          onClick={handleLogOut}
          type="button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isNavOpen: Proptypes.bool.isRequired,
  toggleNav: Proptypes.func.isRequired,
  logout: Proptypes.func.isRequired,
};

export default Navbar;
