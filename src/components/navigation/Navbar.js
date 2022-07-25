import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";
import { HomeIcon, ClipboardListIcon } from "@heroicons/react/outline";

function Navbar({ isOpen, toggleNav }) {
  return (
    <nav
      className={`p-3 bg-orange-400 h-full fixed top-0 left-0 w-1/2 z-50 ease-in-out duration-500 ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end">
        <button onClick={toggleNav} type="button" className="w-8 h-8 text-white rounded hover:bg-orange-200">
          <XIcon />
        </button>
      </div>
      <ul className="mt-8 flex flex-col gap-3">
        <li className="nav-link">
          <HomeIcon className="nav-icon" />
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <ClipboardListIcon className="nav-icon" />
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default Navbar;
