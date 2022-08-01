/* eslint-disable max-len */
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
      className="mx-5 max-w-2xl md:mx-auto mt-16 p-4 rounded-lg shadow-xl z-10 bg-white border border-grey-300 md:p-8"
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
