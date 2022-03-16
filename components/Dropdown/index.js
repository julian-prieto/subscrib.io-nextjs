import { IoIosArrowDown } from "react-icons/io";
import { useComponentVisible } from "hooks";
import { Wrapper, StyledLabel, Select, SelectItem, SelectIcon, SelectMenu, Backdrop } from "./styled";
import { EMPTY_FIELD } from "utils";

const Dropdown = ({ label, options, value, onChange, renderOption, allowEmptyValue, labelSize = "auto" }) => {
  const { ref, isComponentVisible: isOpen, setIsComponentVisible: setIsOpen } = useComponentVisible(false);

  const handleChange = (option) => (event) => {
    event.stopPropagation();
    if (onChange) {
      onChange(option?.id ? option.id : option);
    }
  };

  if (!renderOption || !onChange || !options) {
    return null;
  }

  return (
    <Wrapper isOpen={isOpen}>
      {!!label && <StyledLabel labelSize={labelSize}>{label}</StyledLabel>}
      <Select onClick={() => setIsOpen(true)}>
        <SelectItem>
          {value
            ? value === EMPTY_FIELD
              ? EMPTY_FIELD
              : renderOption(options?.find((opt) => (opt?.id ? opt.id : opt) === value))
            : EMPTY_FIELD}
        </SelectItem>
        <SelectIcon isOpen={isOpen}>
          <IoIosArrowDown />
        </SelectIcon>
        <SelectMenu isOpen={isOpen} ref={ref}>
          {allowEmptyValue && <SelectItem onClick={handleChange(EMPTY_FIELD)}>{EMPTY_FIELD}</SelectItem>}
          {options?.map((opt) => (
            <SelectItem key={opt?.id ? opt.id : opt} onClick={handleChange(opt)}>
              {renderOption(opt)}
            </SelectItem>
          ))}
        </SelectMenu>
      </Select>
      {isOpen && <Backdrop />}
    </Wrapper>
  );
};

export default Dropdown;
