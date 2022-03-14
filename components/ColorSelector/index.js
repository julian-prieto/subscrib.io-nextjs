import { useEffect, useState } from "react";
import { Wrapper, Circle } from "./styled";

const ALLOWED_COLORS = {
  Gray: "#6b7280",
  Red: "#ef4444",
  Orange: "#f97316",
  Yellow: "#eab308",
  Green: "#22c55e",
  Blue: "#3b82f6",
  Purple: "#a855f7",
};

const ColorSelector = ({ defaultColor, onChange, small }) => {
  const [selected, setSelected] = useState(defaultColor);

  const handleSelect = (key) => {
    setSelected(ALLOWED_COLORS[key]);
    onChange(ALLOWED_COLORS[key]);
  };

  return (
    <Wrapper>
      {Object.keys(ALLOWED_COLORS).map((key) => (
        <Circle
          key={key}
          color={ALLOWED_COLORS[key]}
          selected={selected === ALLOWED_COLORS[key]}
          onClick={() => handleSelect(key)}
          small={small}
        />
      ))}
    </Wrapper>
  );
};

export default ColorSelector;
