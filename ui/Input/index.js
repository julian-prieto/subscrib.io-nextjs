import { forwardRef } from "react";
import { Field, StyledInput, StyledLabel, ErrorMessage } from "./styled";

const Input = ({ label, error, labelSize = "auto", ...props }, ref) => (
  <>
    <Field>
      {!!label && (
        <StyledLabel labelSize={labelSize} htmlFor={props.name}>
          {label}
        </StyledLabel>
      )}
      <StyledInput ref={ref} {...props} />
    </Field>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </>
);

export default forwardRef(Input);
