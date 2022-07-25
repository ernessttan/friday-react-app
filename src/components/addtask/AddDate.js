import { CalendarIcon } from "@heroicons/react/outline";
import DatePicker from "react-date-picker";
import format from "date-fns/format";
import proptypes from "prop-types";

import { useState } from "react";

function AddDate({ setNewTask }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewTask((prevTask) => ({
      ...prevTask,
      dueDate: format(date, "yyyy-MM-dd"),
    }));
  };

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex items-center gap-1 w-1/3">
        <CalendarIcon className="h-5 w-5 text-grey-500" />
        <p className="text-grey-500">Due Date</p>
      </div>
      <DatePicker
        className="grow"
        onChange={handleDateChange}
        value={selectedDate}
        calendarIcon={null}
        clearIcon={null}
      />

    </div>
  );
}

AddDate.propTypes = {
  setNewTask: proptypes.func.isRequired,
};

export default AddDate;
