import Proptypes from 'prop-types';

function SubmitButton({ className, children }) {
  return (
    <button
      type="submit"
      className={`flex items-center justify-center rounded-full border border-orange-300 text-orange-300 px-4 py-2
      hover:bg-orange-500 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

SubmitButton.defaultProps = {
  className: '',
  children: 'Submit',
};

SubmitButton.propTypes = {
  className: Proptypes.string,
  children: Proptypes.node,
};

export default SubmitButton;
