import { IoIosArrowDown } from "react-icons/io";
import { useComponentVisible } from "hooks";
import {
  Wrapper,
  StyledLabel,
  Select,
  SelectItem,
  SelectIcon,
  SelectMenu,
  Backdrop,
  ErrorMessage,
  Placeholder,
} from "./styled";
import { EMPTY_FIELD } from "utils";

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  renderOption,
  allowEmptyValue,
  reverse,
  labelSize = "auto",
  loading,
  error,
  placeholder,
}) => {
  const { ref, isComponentVisible: isOpen, setIsComponentVisible: setIsOpen } = useComponentVisible(false);

  const handleChange = (option) => (event) => {
    event.stopPropagation();
    if (onChange) {
      onChange(option?.id ? option.id : option);
    }
  };

  if (!renderOption || !onChange) {
    return null;
  }

  return (
    <>
      <Wrapper isOpen={isOpen} reverse={reverse}>
        {!!label && <StyledLabel labelSize={labelSize}>{label}</StyledLabel>}
        <Select onClick={() => setIsOpen(true)} reverse={reverse}>
          {!loading
            ? options && (
                <>
                  <SelectItem selected>
                    {value && value !== EMPTY_FIELD ? (
                      renderOption(options?.find((opt) => (opt?.id ? opt.id : opt) === value))
                    ) : placeholder ? (
                      <Placeholder>{!error && placeholder}</Placeholder>
                    ) : (
                      EMPTY_FIELD
                    )}
                  </SelectItem>
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  <SelectIcon isOpen={isOpen} reverse={reverse}>
                    <IoIosArrowDown />
                  </SelectIcon>
                  <SelectMenu isOpen={isOpen} ref={ref} reverse={reverse}>
                    {allowEmptyValue && (
                      <SelectItem onClick={handleChange(EMPTY_FIELD)}>
                        {placeholder ? <Placeholder>{placeholder}</Placeholder> : EMPTY_FIELD}
                      </SelectItem>
                    )}
                    {options?.map((opt) => (
                      <SelectItem key={opt?.id ? opt.id : opt} onClick={handleChange(opt)}>
                        {renderOption(opt)}
                      </SelectItem>
                    ))}
                  </SelectMenu>
                </>
              )
            : null}
        </Select>
        {isOpen && <Backdrop />}
      </Wrapper>
    </>
  );
};

export default Dropdown;
