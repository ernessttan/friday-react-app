/* eslint-disable no-unused-vars */
import Modal from "react-modal";
import proptypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";
import { useState, useContext } from "react";
import AddProject from "./AddProject";
import AddDate from "./AddDate";
import AuthContext from "../../context/AuthContext";

function AddTaskModal({ modalIsOpen, setModalIsOpen, toggleModal }) {
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
          alert(taskData.message);
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
          position: "absolute",
          borderRadius: "20px",
          paddingLeft: "25px",
          paddingRight: "25px",
          zIndex: "5",
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
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 my-5 py-3"
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
