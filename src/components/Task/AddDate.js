/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { CalendarIcon } from "@heroicons/react/outline";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import Proptypes from "prop-types";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function AddDate({ setNewTask, dueDate }) {
  const [startDate, setStartDate] = useState();

  const handleDateChange = (date) => {
    setStartDate(date);
    setNewTask((prevTask) => ({
      ...prevTask,
      dueDate: format(date, "MM/dd/yyyy"),
    }));
  };

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-2 w-1/3">
        <CalendarIcon className="h-5 w-5 text-grey-500" />
        <p className="text-grey-500 text-sm">Due</p>
      </div>
      <div className="w-2/3">
        <DatePicker
          wrapperClassName="w-full"
          className="px-4 w-full text-grey-500"
          calendarClassName="w-full"
          onChange={handleDateChange}
          selected={startDate}
          placeholderText={dueDate}
        />
      </div>

    </div>
  );
}

AddDate.defaultProps = {
  dueDate: "",
};

AddDate.propTypes = {
  setNewTask: Proptypes.func.isRequired,
  dueDate: Proptypes.string,
};

export default AddDate;
