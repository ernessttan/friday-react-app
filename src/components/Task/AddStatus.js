/* eslint-disable object-shorthand */
/* eslint-disable react/no-array-index-key */
import { StatusOnlineIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Proptypes from "prop-types";

function AddStatus({ setNewTask, newTask }) {
  const STATUS = ["To Do", "In Progress", "Completed"];
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleStatusChange = (e) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      status: e.target.value,
    }));
  };

  const toggleStatus = () => setIsStatusOpen(!isStatusOpen);

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-2 w-1/3">
        <StatusOnlineIcon className="h-5 w-5 text-grey-500" />
        <p className="text-grey-500">Status</p>
      </div>
      <div className="relative inline-block text-left w-2/3 px-4">
        <div>
          <button onClick={toggleStatus} type="button" className="inline-flex w-full rounded-md py-2 bg-white text-grey-500 hover:bg-grey-200">
            {newTask.status || "Select Status"}
          </button>
        </div>
        <div
          id="statusMenu"
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-grey-300 bg-white z-40 ${
            isStatusOpen ? "" : "hidden"
          }`}
        >
          <div className="p-5 flex flex-col gap-2">
            { STATUS && (
              STATUS.map((status, index) => (
                <button
                  key={index}
                  className="flex justify-start"
                  type="button"
                  name="status"
                  value={status}
                  onClick={handleStatusChange}
                >
                  {status}
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
  setNewTask: Proptypes.func.isRequired,
  newTask: Proptypes.shape({
    status: Proptypes.string,
  }).isRequired,
};

export default AddStatus;
