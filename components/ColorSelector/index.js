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

const ColorSelector = ({ onChange }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (key) => {
    setSelected(key);
    onChange(ALLOWED_COLORS[key]);
  };

  return (
    <Wrapper>
      {Object.keys(ALLOWED_COLORS).map((key) => (
        <Circle key={key} color={ALLOWED_COLORS[key]} selected={selected === key} onClick={() => handleSelect(key)} />
      ))}
    </Wrapper>
  );
};

export default ColorSelector;
