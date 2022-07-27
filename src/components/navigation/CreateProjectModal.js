import Modal from "react-modal";
import Proptypes from "prop-types";
import { useContext, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import AuthContext from "../../context/AuthContext";

function CreateProjectModal({ modalIsOpen, toggleModal }) {
  const auth = useContext(AuthContext);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    userId: auth.userId,
  });

  const handleChange = (event) => {
    setNewProject({
      ...newProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("http://localhost:4000/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
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
          value={newProject.title}
          placeholder="Untitled"
        />
        <textarea
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 my-5 py-3"
          placeholder="Description"
          name="description"
          value={newProject.description}
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

CreateProjectModal.propTypes = {
  modalIsOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
};

export default CreateProjectModal;
