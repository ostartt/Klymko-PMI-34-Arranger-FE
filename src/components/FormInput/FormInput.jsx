import "./form-input.styles.scss";
import {forwardRef} from "react";

const FormInput = forwardRef(({ label, error, labelText, ...otherProps }, ref) => {
  return (
    <div className="form-input-container">
      {labelText && <p>{labelText}</p>}
      <input
        className={`form-input ${error ? "has-error" : ""}`}
        {...otherProps}
        autoComplete="on"
        placeholder={label}
        ref={ref}
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  );
});

export default FormInput;
