import ReactModal from "react-modal";
import Proptypes from "prop-types";
import { XIcon, DotsHorizontalIcon } from "@heroicons/react/solid";

function Modal({
  children, isOpen, toggleModal, options,
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
          paddingLeft: "20px",
          paddingRight: "20px",
          zIndex: "5",
        },
      }}
    >
      <div className="flex gap-3 justify-end mb-5">
        {
          options && (
            <button type="button" className="h-5 w-5 text-orange-400">
              <DotsHorizontalIcon />
            </button>
          )
        }
        <button className="h-5 w-5 text-orange-400" type="button" onClick={toggleModal}>
          <XIcon />
        </button>
      </div>
      {children}
    </ReactModal>
  );
}

Modal.defaultProps = {
  options: false,
};

Modal.propTypes = {
  children: Proptypes.node.isRequired,
  isOpen: Proptypes.bool.isRequired,
  toggleModal: Proptypes.func.isRequired,
  options: Proptypes.bool,
};

export default Modal;
