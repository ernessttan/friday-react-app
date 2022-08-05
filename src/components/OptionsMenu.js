/* eslint-disable implicit-arrow-linebreak */
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import Proptypes from 'prop-types';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function OptionsMenu({
  isOptionsOpen,
  item,
  itemId,
  toggleModal,
  fetchProjects,
  toggleOptions,
}) {
  const auth = useContext(AuthContext);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://friday-productivity.herokuapp.com/${item}s/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      ).then(() => {
        fetchProjects();
        toggleOptions();
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`origin-top-right absolute right-4 bg-white shadow-lg rounded w-40 mt-36 p-3 z-40 flex flex-col gap-1 ${
        isOptionsOpen ? '' : 'hidden'
      }`}
    >
      <button
        onClick={toggleModal}
        type="button"
        className="flex items-center w-full gap-2 py-2 text-black hover:bg-orange-100"
      >
        <PencilIcon className="w-5 h-5" />
        <p>
          Edit
          {` ${item}`}
        </p>
      </button>
      <button
        onClick={handleDelete}
        type="button"
        className="flex items-center w-full gap-2 py-2 text-black hover:bg-orange-100"
      >
        <TrashIcon className="w-5 h-5 fill-red-500" />
        <p>
          Delete
          {` ${item}`}
        </p>
      </button>
    </div>
  );
}

OptionsMenu.defaultProps = {
  fetchProjects: () => {},
};

OptionsMenu.propTypes = {
  isOptionsOpen: Proptypes.bool.isRequired,
  item: Proptypes.string.isRequired,
  itemId: Proptypes.string.isRequired,
  toggleModal: Proptypes.func.isRequired,
  fetchProjects: Proptypes.func,
  toggleOptions: Proptypes.func.isRequired,
};

export default OptionsMenu;
