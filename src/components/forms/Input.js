import { useState } from 'react';
import Proptypes from 'prop-types';

function Input({
  type,
  name,
  value,
  className,
  onChange,
  placeholder,
  errorMessage,
  ...inputProps
}) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused((prev) => !prev);
  };

  return (
    <div className="">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleFocus}
        onChange={onChange}
        className={className}
        {...inputProps}
      />
      {focused && <span className="error-msg">{errorMessage}</span>}
    </div>
  );
}

Input.defaultProps = {
  required: false,
  type: 'text',
  name: '',
  onChange: () => {},
  errorMessage: '',
  className: '',
  placeholder: '',
  value: '',
};

Input.propTypes = {
  type: Proptypes.string,
  name: Proptypes.string,
  value: Proptypes.string,
  className: Proptypes.string,
  onChange: Proptypes.func,
  placeholder: Proptypes.string,
  errorMessage: Proptypes.string,
  required: Proptypes.bool,
};

export default Input;
