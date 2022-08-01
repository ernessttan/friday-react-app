import Proptypes from "prop-types";

function SubmitButton({ name, extend, children }) {
  return (
    <button
      type="submit"
      className={`flex items-center justify-center gap-2 rounded-full border border-orange-300 px-4 py-2 text-orange-300 hover:bg-orange-300 hover:text-white ${
        extend ? "px-8 py-3" : ""}
        hover: "bg-orange-300 text-white"
      `}
    >
      {children}
      {name}
    </button>
  );
}

SubmitButton.defaultProps = {
  extend: false,
  children: null,
};

SubmitButton.propTypes = {
  name: Proptypes.string.isRequired,
  extend: Proptypes.bool,
  children: Proptypes.node,
};

export default SubmitButton;
