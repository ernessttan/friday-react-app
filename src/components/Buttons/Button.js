import Proptypes from "prop-types";

function Button({
  name, handleClick, children, fullWidth,
}) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`flex items-center justify-center gap-2 rounded-full border border-orange-300 px-4 py-2 text-orange-300 hover:"bg-orange-300 text-white" ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
      {name}
    </button>
  );
}

Button.defaultProps = {
  handleClick: () => {},
  children: null,
  fullWidth: false,
};

Button.propTypes = {
  name: Proptypes.string.isRequired,
  handleClick: Proptypes.func,
  children: Proptypes.node,
  fullWidth: Proptypes.bool,

};

export default Button;
