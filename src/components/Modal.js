import ReactModal from 'react-modal';
import Proptypes from 'prop-types';
import { XIcon, DotsHorizontalIcon } from '@heroicons/react/solid';

function Modal({ children, isOpen, toggleModal, options }) {
  return (
    // Reusable Modal component
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick
      className="z-10 max-w-2xl p-4 mx-5 mt-16 bg-white border rounded-lg shadow-xl md:mx-auto border-grey-300 md:p-8"
    >
      <div className="flex justify-end gap-3 mb-5">
        {options && (
          <button type="button" className="w-5 h-5 text-orange-400">
            <DotsHorizontalIcon />
          </button>
        )}
        <button
          className="w-5 h-5 text-orange-400"
          type="button"
          onClick={toggleModal}
        >
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
