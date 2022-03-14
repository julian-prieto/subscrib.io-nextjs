import { forwardRef } from "react";
import { Field, StyledInput, StyledLabel, ErrorMessage } from "./styled";

const Input = ({ hasValue, value, onChange, name, label, placeholder, type, error, ...props }, ref) => (
  <Field>
    <StyledInput
      ref={ref}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      {...props}
    />
    {!!label && (
      <StyledLabel hasValue={hasValue} htmlFor={name}>
        {label}
      </StyledLabel>
    )}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Field>
);

export default forwardRef(Input);
