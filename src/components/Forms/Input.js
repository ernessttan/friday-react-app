/* eslint-disable react/no-unused-prop-types */
import Proptypes from "prop-types";
import { useState } from "react";

function Input({
  type, name, handleChange, value, placeholder, className, label, errorMessage, ...inputProps
}) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused((prev) => !prev);
  };

  return (
    <div className="formInput">
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleFocus}
        value={value}
        className={className}
        autoComplete="on"
        {...inputProps}
      />
      <span className={`${focused ? "block" : "hidden"} error-msg`}>{errorMessage}</span>
    </div>
  );
}

// Default props for required
Input.defaultProps = {
  required: false,
};

Input.propTypes = {
  type: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  handleChange: Proptypes.func.isRequired,
  value: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  className: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  errorMessage: Proptypes.string.isRequired,
  required: Proptypes.bool,
};

export default Input;
