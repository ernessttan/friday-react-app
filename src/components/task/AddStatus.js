import { StatusOnlineIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Proptypes from 'prop-types';

function AddStatus({ newTask, handleChange }) {
  const STATUSES = [
    { id: 0, title: 'To Do', color: 'bg-red-100' },
    { id: 1, title: 'In Progress', color: 'bg-yellow-100' },
    { id: 2, title: 'Done', color: 'bg-green-100' },
  ];
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const toggleStatus = () => setIsStatusOpen(!isStatusOpen);

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-2 w-1/3 text-black">
        <StatusOnlineIcon className="h-5 w-5" />
        <p>Status</p>
      </div>
      <div className="relative inline-block text-left w-2/3 px-4">
        <div>
          <button onClick={toggleStatus} type="button" className="inline-flex w-full rounded-md py-2 bg-white text-black hover:bg-grey-200">
            {newTask.status || 'Select Status'}
          </button>
        </div>
        <div
          id="statusMenu"
          className={`absolute mt-2 w-full rounded-md shadow-lg border border-grey-300 bg-white z-40 ${
            isStatusOpen ? '' : 'hidden'
          }`}
        >
          <div className="p-3 flex flex-col gap-2">
            { STATUSES && (
              STATUSES.map((status) => (
                <button
                  key={status.id}
                  className="py-2 px-1 flex justify-start rounded-md font-semibold hover:bg-grey-200"
                  type="button"
                  name="status"
                  value={status.title}
                  onClick={handleChange}
                >
                  {status.title}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

AddStatus.propTypes = {
  newTask: Proptypes.shape({
    status: Proptypes.string,
  }).isRequired,
  handleChange: Proptypes.func.isRequired,
};

export default AddStatus;
