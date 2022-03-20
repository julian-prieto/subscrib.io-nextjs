import { forwardRef } from "react";
import { Field, StyledInput, StyledLabel, ErrorMessage } from "./styled";

const Input = ({ label, error, size, labelSize = "auto", ...props }, ref) => (
  <>
    <Field>
      {!!label && (
        <StyledLabel labelSize={labelSize} htmlFor={props.name}>
          {label}
        </StyledLabel>
      )}
      <StyledInput ref={ref} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Field>
  </>
);

export default forwardRef(Input);
