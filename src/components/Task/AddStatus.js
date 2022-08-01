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
      <div className="flex items-center gap-2 w-1/3 text-black">
        <StatusOnlineIcon className="h-5 w-5" />
        <p>Status</p>
      </div>
      <div className="relative inline-block text-left w-2/3 px-4">
        <div>
          <button onClick={toggleStatus} type="button" className="inline-flex w-full rounded-md py-2 bg-white text-black hover:bg-grey-200">
            {newTask.status || "Select Status"}
          </button>
        </div>
        <div
          id="statusMenu"
          className={`absolute mt-2 w-full rounded-md shadow-lg border border-grey-300 bg-white z-40 ${
            isStatusOpen ? "" : "hidden"
          }`}
        >
          <div className="p-3 flex flex-col gap-2">
            { STATUS && (
              STATUS.map((status, index) => (
                <button
                  key={index}
                  className="py-2 px-1 flex justify-start rounded-md font-semibold hover:bg-grey-200"
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
