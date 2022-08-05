import { useContext, useState } from 'react';
import Proptypes from 'prop-types';
import AuthContext from '../../context/AuthContext';
import Modal from '../Modal';
import Input from '../forms/Input';
import SubmitButton from '../buttons/SubmitButton';

function EditProject({ project, toggleModal, isModalOpen }) {
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
      await fetch(
        `https://friday-productivity.herokuapp.com/projects/${project.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedProject),
        }
      )
        .then((res) => res.json())
        .then(() => {
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
          className="w-full text-3xl font-semibold placeholder:text-grey-500 text-black-500"
          type="text"
          name="title"
          value={editedProject.title}
          onChange={handleChange}
          placeholder="Untitled"
          errorMessage="Please enter a title"
          required
        />
        <textarea
          className="w-full py-3 my-5 text-xl font-normal placeholder:text-grey-500 text-black-500 h-60"
          placeholder="Description"
          name="description"
          value={editedProject.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <SubmitButton name="Submit Edit" />
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
};

export default EditProject;
