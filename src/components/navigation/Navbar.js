import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";
import { HomeIcon, ClipboardListIcon } from "@heroicons/react/outline";
import ProjectsMenu from "./ProjectsMenu";

function Navbar({ isOpen, toggleNav }) {
  return (
    <nav
      className={`p-3 bg-orange-500 h-full fixed top-0 left-0 w-1/2 z-3 ease-in-out duration-500 ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end">
        <button onClick={toggleNav} type="button" className="w-8 h-8 text-white rounded hover:bg-orange-200">
          <XIcon />
        </button>
      </div>
      <h1 className="text-white">Friday</h1>
      <ul className="my-8 flex flex-col gap-3">
        <li className="nav-link">
          <HomeIcon className="nav-icon" />
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <ClipboardListIcon className="nav-icon" />
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
      <ProjectsMenu />
    </nav>
  );
}

Navbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default Navbar;
