import Proptypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal';
import Input from '../forms/Input';
import SubmitButton from '../buttons/SubmitButton';

function CreateProject({
  isModalOpen,
  toggleModal,
  userId,
  token,
  fetchProjects,
}) {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    userId,
  });

  const handleChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://friday-productivity.herokuapp.com/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      }).then(() => {
        fetchProjects();
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
          className="w-full text-3xl font-semibold placeholder:text-grey-500 text-black-500 focus:outline-orange-200"
          type="text"
          name="title"
          onChange={handleChange}
          value={newProject.title}
          placeholder="Untitled"
          errorMessage="Please enter a title"
          required
        />
        <textarea
          className="w-full py-3 my-5 text-xl font-normal placeholder:text-grey-500 text-black-500 h-60 focus:outline-orange-200"
          placeholder="Description"
          name="description"
          value={newProject.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <SubmitButton>Create Project</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}

CreateProject.propTypes = {
  isModalOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
  userId: Proptypes.string.isRequired,
  token: Proptypes.string.isRequired,
  fetchProjects: Proptypes.func.isRequired,
};

export default CreateProject;
