import Proptypes from "prop-types";
import { CalendarIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import EditTask from "../Task/EditTask";

function TaskListItem({ taskData }) {
  const auth = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [task, setTask] = useState(taskData);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const updateStatus = async () => {
    try {
      await fetch(`https://friday-productivity.herokuapp.com/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, status: "Done" }),
      }).then((res) => res.json())
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return task && (
    <>
      <div
        onClick={toggleModal}
        className="task-card flex items-center justify-between"
      >
        <div>
          <h3 className="py-2">{task.title}</h3>
          <p className="text-grey-500 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {task.dueDate}
          </p>
        </div>
        {
        task.status === "To Do" ? (
          <input
            onChange={updateStatus}
            className="h-5 w-5"
            type="checkbox"
          />
        ) : (
          null
        )
      }
      </div>
      <EditTask
        task={task}
        setTask={setTask}
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
    </>

  );
}

TaskListItem.propTypes = {
  taskData: Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    dueDate: Proptypes.string.isRequired,
    status: Proptypes.string.isRequired,
  }).isRequired,
};

export default TaskListItem;
