import { forwardRef } from "react";
import { Field, StyledInput, StyledLabel } from "./styled";

const Input = ({ hasValue, value, onChange, name, label, placeholder, type, ...props }, ref) => (
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
  </Field>
);

export default forwardRef(Input);
