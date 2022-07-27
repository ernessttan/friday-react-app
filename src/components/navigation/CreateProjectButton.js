import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Proptypes from "prop-types";
import CreateProjectModal from "./CreateProjectModal";

function CreateProjectButton({ setProjects }) {
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
      <CreateProjectModal
        setProjects={setProjects}
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
    </>

  );
}

CreateProjectButton.propTypes = {
  setProjects: Proptypes.func.isRequired,
};

export default CreateProjectButton;
