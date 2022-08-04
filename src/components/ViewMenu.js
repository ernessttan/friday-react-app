import Proptypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/solid';

function ViewMenu({
  isViewMenuOpen,
  toggleViewMenu,
  selectedView,
  handleViewSelect,
}) {
  return (
    <div className="relative">
      <button
        onClick={toggleViewMenu}
        type="button"
        className="flex items-center gap-2 text-black"
      >
        {`${selectedView} View`}
        <ChevronDownIcon className="w-5 h-5" />
      </button>
      <div
        className={`absolute right-0 z-10 flex-col w-40 gap-1 p-3 origin-top-right bg-white border rounded-md shadow-lg border-grey-300 ${
          isViewMenuOpen ? 'flex' : 'hidden'
        }`}
      >
        <button
          onClick={handleViewSelect}
          type="button"
          value="Board"
          className="py-2 text-left text-black rounded-md hover:bg-grey-100"
        >
          Board View
        </button>
        <button
          onClick={handleViewSelect}
          type="button"
          value="List"
          className="py-2 text-left text-black hover:bg-grey-100"
        >
          List View
        </button>
      </div>
    </div>
  );
}

ViewMenu.propTypes = {
  isViewMenuOpen: Proptypes.bool.isRequired,
  toggleViewMenu: Proptypes.func.isRequired,
  selectedView: Proptypes.string.isRequired,
  handleViewSelect: Proptypes.func.isRequired,
};

export default ViewMenu;
