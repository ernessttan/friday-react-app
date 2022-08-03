/* General Button Component */
import Proptypes from 'prop-types';

function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center justify-center rounded-full border border-orange-300 text-orange-300 px-4 py-2
      hover:bg-orange-500 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

Button.propTypes = {
  children: Proptypes.node.isRequired,
  className: Proptypes.string,
  onClick: Proptypes.func,
};

export default Button;
