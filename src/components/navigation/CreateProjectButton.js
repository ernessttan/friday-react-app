import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Proptypes from "prop-types";
import CreateProject from "../Project/CreateProject";

function CreateProjectButton({ fetchProjects }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        type="button"
        className="w-full bg-orange-200 text-white text-sm rounded flex items-center justify-center gap-2 py-1"
      >
        <PlusIcon className="h-5 w-5" />
        New Project
      </button>
      <CreateProject
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
        fetchProjects={fetchProjects}
      />
    </>

  );
}

CreateProjectButton.propTypes = {
  fetchProjects: Proptypes.func.isRequired,
};

export default CreateProjectButton;
