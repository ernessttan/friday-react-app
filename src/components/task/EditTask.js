import Proptypes from 'prop-types';
import { useState, useContext } from 'react';
import AddProject from './AddProject';
import AddStatus from './AddStatus';
import AddDate from './AddDate';
import Modal from '../Modal';
import SubmitButton from '../buttons/SubmitButton';
import AuthContext from '../../context/AuthContext';

function EditTask({ task, isModalOpen, toggleModal, setTask, setTasks, tasks }) {
  const auth = useContext(AuthContext);
  const [editedTask, setEditedTask] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    projectId: task.projectId,
    dueDate: task.dueDate,
    completed: task.completed,
    status: task.status,
    userId: task.userId,
  });

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`https://friday-productivity.herokuapp.com/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      }).then((res) => res.json())
        .then(() => {
          setTasks(tasks.map((t) => (t.id === task.id ? editedTask : t)));
          setTask(editedTask);
          toggleModal();
        });
    } catch (error) {
      console.log(error.message);
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
          value={editedTask.title}
          placeholder="Untitled"
        />
        <div className="my-5">
          <AddProject
            userId={auth.userId}
            title={editedTask.projectTitle}
            setNewTask={setEditedTask}
          />
          <AddDate dueDate={task.dueDate} setNewTask={setEditedTask} handleChange={handleChange} />
          <AddStatus newTask={editedTask} setNewTask={setEditedTask} handleChange={handleChange} />
        </div>
        <textarea
          className="placeholder:text-grey-500 text-black-500 font-normal text-xl w-full h-60 py-3"
          placeholder="Description"
          name="description"
          value={editedTask.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <SubmitButton>Update Task</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}

EditTask.defaultProps = {
  task: {},
  isModalOpen: false,
  toggleModal: () => {},
  setTask: () => {},
  setTasks: () => {},
  tasks: [],
};

EditTask.propTypes = {
  task: Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    projectId: Proptypes.string,
    projectTitle: Proptypes.string,
    dueDate: Proptypes.string.isRequired,
    completed: Proptypes.bool.isRequired,
    status: Proptypes.string.isRequired,
    userId: Proptypes.string.isRequired,
  }),
  isModalOpen: Proptypes.bool,
  toggleModal: Proptypes.func,
  setTask: Proptypes.func,
  setTasks: Proptypes.func,
  tasks: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    projectId: Proptypes.string,
    projectTitle: Proptypes.string,
    dueDate: Proptypes.string.isRequired,
    completed: Proptypes.bool.isRequired,
    status: Proptypes.string.isRequired,
    userId: Proptypes.string.isRequired,
  })),
};

export default EditTask;
