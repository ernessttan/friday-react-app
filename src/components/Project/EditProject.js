import { useContext, useState } from "react";
import Proptypes from "prop-types";
import AuthContext from "../../context/AuthContext";
import Input from "../Forms/Input";
import Modal from "../Modal";
import SubmitButton from "../Buttons/SubmitButton";

function EditProject({
  project, toggleModal, isModalOpen, setProject,
}) {
  const auth = useContext(AuthContext);
  const [editedProject, setEditedProject] = useState({
    title: project.title,
    description: project.description,
    userId: auth.userId,
  });

  const handleChange = (event) => {
    setEditedProject({
      ...editedProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`https://friday-productivity.herokuapp.com/projects/${project.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProject),
      }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProject(data.project);
          toggleModal();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
      <form onSubmit={handleSubmit}>
        <Input
          className="w-full placeholder:text-grey-500 text-black-500 font-semibold text-3xl"
          type="text"
          name="title"
          onChange={handleChange}
          value={editedProject.title}
          placeholder="Untitled"
          errorMessage="Please enter a title"
          required
        />
        <textarea
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 my-5 py-3"
          placeholder="Description"
          name="description"
          value={editedProject.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <SubmitButton
            name="Submit Project"
          />
        </div>
      </form>
    </Modal>
  );
}

EditProject.propTypes = {
  project: Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    userId: Proptypes.string.isRequired,
  }).isRequired,
  toggleModal: Proptypes.func.isRequired,
  isModalOpen: Proptypes.bool.isRequired,
  setProject: Proptypes.func.isRequired,
};

export default EditProject;
