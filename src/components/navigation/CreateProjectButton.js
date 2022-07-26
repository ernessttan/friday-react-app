import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";

function CreateProjectButton() {
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
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
    </>

  );
}

export default CreateProjectButton;
