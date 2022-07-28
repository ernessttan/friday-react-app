/* eslint-disable no-unused-vars */
import proptypes from "prop-types";
import { useState, useContext } from "react";
import AddProject from "./AddProject";
import AddDate from "./AddDate";
import AuthContext from "../../context/AuthContext";
import Modal from "../common/Modal";

function AddTask({ modalIsOpen, toggleModal }) {
  const auth = useContext(AuthContext);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    projectId: "",
    dueDate: "",
    completed: false,
    userId: auth.userId,
  });

  const handleChange = (event) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      }).then((res) => res.json())
        .then((taskData) => {
          toggleModal();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full placeholder:text-grey-500 text-black-500 font-semibold text-3xl"
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
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 py-3"
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

AddTask.propTypes = {
  modalIsOpen: proptypes.bool.isRequired,
  toggleModal: proptypes.func.isRequired,
};

export default AddTask;