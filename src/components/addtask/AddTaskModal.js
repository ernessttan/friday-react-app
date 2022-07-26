/* eslint-disable no-unused-vars */
import Modal from "react-modal";
import proptypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import AddProject from "./AddProject";
import AddDate from "./AddDate";

function AddTaskModal({ modalIsOpen, setModalIsOpen, toggleModal }) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    project: "",
    dueDate: "",
  });

  const handleChange = (event) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalIsOpen(false);

    try {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }).then(() => {
        toggleModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      style={{
        content: {
          borderRadius: "20px",
          paddingLeft: "25px",
          paddingRight: "25px",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-end mb-5">
          <button
            onClick={toggleModal}
            type="button"
            className="h-5 w-5 text-orange-400"
          >
            <XIcon />
          </button>
        </div>
        <input
          className="placeholder:text-grey-400 text-black-500 font-semibold text-3xl"
          type="text"
          name="title"
          onChange={handleChange}
          value={newTask.title}
          placeholder="Untitled"
        />
        <div className="my-5">
          <AddProject setNewTask={setNewTask} />
          <AddDate setNewTask={setNewTask} />
        </div>
        <textarea
          className="placeholder:text-grey-400 text-black-500 w-full h-60 my-5 text-2xl"
          placeholder="Description"
          name="description"
          value={newTask.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <button type="submit" className="add-btn extend">
            Add Task
          </button>
        </div>
      </form>
    </Modal>
  );
}

AddTaskModal.propTypes = {
  modalIsOpen: proptypes.bool.isRequired,
  setModalIsOpen: proptypes.func.isRequired,
  toggleModal: proptypes.func.isRequired,
};

export default AddTaskModal;
