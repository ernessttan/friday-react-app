import { useState, useContext } from "react";
import Proptypes from "prop-types";
import AuthContext from "../../context/AuthContext";
import Modal from "../Modal";
import SubmitButton from "../Buttons/SubmitButton";
import AddProject from "./AddProject";
import AddDate from "./AddDate";
import AddStatus from "./AddStatus";

function EditTask({
  task, modalIsOpen, toggleModal, setTask,
}) {
  const auth = useContext(AuthContext);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (event) => {
    setEditedTask({
      ...editedTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      }).then((res) => res.json())
        .then(() => {
          setTask(editedTask);
          toggleModal();
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(editedTask);

  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full placeholder:text-grey-500 text-black-500 font-semibold text-3xl"
          type="text"
          name="title"
          onChange={handleChange}
          value={editedTask.title}
          placeholder="Untitled"
        />
        <div className="my-5">
          <AddProject title={task.projectTitle} setNewTask={setEditedTask} />
          <AddDate dueDate={task.dueDate} setNewTask={setEditedTask} handleChange={handleChange} />
          <AddStatus newTask={task} setNewTask={setEditedTask} />
        </div>
        <textarea
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 py-3"
          placeholder="Description"
          name="description"
          value={editedTask.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <SubmitButton
            name="Submit Task"
          />
        </div>
      </form>
    </Modal>
  );
}

EditTask.propTypes = {
  task: Proptypes.shape({
    id: Proptypes.string,
    title: Proptypes.string,
    description: Proptypes.string,
    projectId: Proptypes.string,
    projectTitle: Proptypes.string,
    status: Proptypes.string,
    dueDate: Proptypes.string,
    date: Proptypes.string,
    userId: Proptypes.string,
  }).isRequired,
  modalIsOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
  setTask: Proptypes.func.isRequired,
};

export default EditTask;
