import ReactModal from "react-modal";
import Proptypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";

function Modal({
  children, isOpen, toggleModal,
}) {
  return (
    // Reusable Modal component
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          position: "absolute",
          borderRadius: "20px",
          paddingLeft: "15px",
          paddingRight: "15px",
          zIndex: "5",
        },
      }}
    >
      <div className="flex justify-end mb-5">
        <button className="h-5 w-5 text-orange-400" type="button" onClick={toggleModal}>
          <XIcon />
        </button>
      </div>
      {children}
    </ReactModal>
  );
}

Modal.propTypes = {
  children: Proptypes.node.isRequired,
  isOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
};

export default Modal;