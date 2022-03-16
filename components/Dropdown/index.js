import { useComponentVisible } from "hooks";
import { Wrapper, StyledLabel } from "./styled";

const Dropdown = ({ label, options, value, onChange, labelSize = "auto" }) => {
  const { ref, isComponentVisible: isOpen, setIsComponentVisible: setIsOpen } = useComponentVisible(false);

  return (
    <Wrapper>
      {!!label && <StyledLabel labelSize={labelSize}>{label}</StyledLabel>}
      <div style={{ width: "100%" }} onClick={() => setIsOpen(true)}>
        <div>{options?.find((opt) => opt.id === value)?.type}</div>
      </div>
      {isOpen && (
        <div ref={ref} style={{ width: "100%" }}>
          ESTA ABIERTO
        </div>
      )}
    </Wrapper>
  );
};

export default Dropdown;
