import { useContext, useState } from 'react';
import Proptypes from 'prop-types';
import AuthContext from '../../context/AuthContext';
import Modal from '../Modal';
import AddProject from './AddProject';
import AddDate from './AddDate';
import AddStatus from './AddStatus';
import SubmitButton from '../buttons/SubmitButton';

function CreateTask({ isModalOpen, toggleModal, status }) {
  const auth = useContext(AuthContext);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    projectId: '',
    dueDate: '',
    completed: false,
    status: `${status}`,
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
      await fetch('https://friday-productivity.herokuapp.com/tasks', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      }).then((res) => res.json())
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
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
          <AddProject setNewTask={setNewTask} userId={auth.userId} />
          <AddDate setNewTask={setNewTask} dueDate="mm/dd/yyyy" />
          <AddStatus newTask={newTask} handleChange={handleChange} />
        </div>
        <textarea
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 py-3 px-2 rounded-md hover:bg-grey-200"
          placeholder="Description"
          name="description"
          value={newTask.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <SubmitButton>Create Task</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}

CreateTask.defaultProps = {
  status: 'To Do',
};

CreateTask.propTypes = {
  isModalOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
  status: Proptypes.string,
};

export default CreateTask;
