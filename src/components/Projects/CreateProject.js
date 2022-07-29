import { useContext, useState } from "react";
import Proptypes from "prop-types";
import AuthContext from "../../context/AuthContext";
import Modal from "../Modal";
import Input from "../Forms/Input";
import AddButton from "../Buttons/SubmitButton";

function CreateProject({ toggleModal, modalIsOpen, setProjects }) {
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
        setProjects((prevProjects) => [...prevProjects, newProject]);
        toggleModal();
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        <Input
          className="w-full placeholder:text-grey-500 text-black-500 font-semibold text-3xl"
          type="text"
          name="title"
          onChange={handleChange}
          value={newProject.title}
          placeholder="Untitled"
          errorMessage="Please enter a title"
          required
        />
        <textarea
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 my-5 py-3"
          placeholder="Description"
          name="description"
          value={newProject.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <AddButton
            name="Add Project"
            extend
          />
        </div>
      </form>
    </Modal>
  );
}

CreateProject.propTypes = {
  modalIsOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
  setProjects: Proptypes.func.isRequired,
};

export default CreateProject;
